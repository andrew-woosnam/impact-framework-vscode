/** pluginExplorer.ts */
import * as vscode from 'vscode';
import axios from 'axios';
import { Plugin } from './types';
import { generatePluginsListHtml } from './pluginsList';
import { CommandExecutor } from './commandExecutor';

let globalPlugins: Plugin[] = [];

export class PluginExplorer implements vscode.WebviewViewProvider {
  public static readonly viewType = "impact-framework-vscode.pluginsView";

  private _view?: vscode.WebviewView;
  private _commandExecutor: CommandExecutor;

  constructor(private readonly _extensionUri: vscode.Uri) {
    this._commandExecutor = new CommandExecutor();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;
    this._configureWebview(webviewView.webview);
    this._updateHtmlForWebview(webviewView.webview);
  }

  private _configureWebview(webview: vscode.Webview) {
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'static')],
    };
  }

  private async _updateHtmlForWebview(webview: vscode.Webview) {
    try {
      const styleUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "static", "styles.css")
      );

      const response = await this._fetchPlugins();
      if (response.status !== 200) {
        this._handleFetchError(webview, response.status);
        return;
      }

      globalPlugins = response.data.results[0].hits;
      webview.html = generatePluginsListHtml(globalPlugins, styleUri);
      this._setupMessageListener(webview);

    } catch (error) {
      console.error("Failed to fetch plugins:", error);
      webview.html = "<p>Failed to load plugins. Please try again later.</p>";
    }
  }

  private async _fetchPlugins() {
    return axios.post('https://swcmjqwwc9-dsn.algolia.net/1/indexes/*/queries', {
      requests: [
        {
          indexName: 'Plugins',
          params: 'facets=["tags"]&query=&hitsPerPage=100'
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-algolia-agent': 'Algolia for JavaScript (4.23.3); Browser (lite); instantsearch.js (4.68.1); react (18.3.1); react-instantsearch (7.8.1); react-instantsearch-core (7.8.1); JS Helper (3.19.0)',
        'x-algolia-api-key': process.env.ALGOLIA_API_KEY,
        'x-algolia-application-id': process.env.ALGOLIA_APP_ID,
      }
    });
  }

  private _handleFetchError(webview: vscode.Webview, status: number) {
    console.error(`Failed to fetch plugins. Status: ${status}`);
    webview.html = "<p>Failed to load plugins. Please try again later.</p>";
  }

  private _setupMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      async message => {
        console.log('Received message:', message);
        if (message.command === 'impact-framework-vscode.showPluginDetails') {
          const plugin = globalPlugins.find(p => p.objectID === message.pluginId);
          if (plugin) {
            vscode.commands.executeCommand(message.command, plugin);
          }
        }
        else if (message.command === 'execNpmInstall') {
          try {
            const packageName = message.args;
            if (!packageName) {
              console.error('No package name specified');
              return;
            }
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders || workspaceFolders.length === 0) {
              console.error('No workspace folder open');
              return;
            }
            const workspaceFolder = workspaceFolders[0].uri.fsPath;
            this._commandExecutor.executeNpmInstall(packageName, workspaceFolder);
          } catch (error) {
            console.error('npm install execution failed:', error);
          }
        }
      }
    );
  }
}