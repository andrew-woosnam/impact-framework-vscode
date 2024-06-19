/** IFPluginsViewProvider.ts */
import * as vscode from 'vscode';
import axios from 'axios';
import { Plugin } from './types';
import { buildPluginsHtml } from './helpers';

export class IFPluginsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "impact-framework-vscode.pluginsView";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'static')],
    };

    this._updateHtmlForWebview(webviewView.webview);
  }

  private async _updateHtmlForWebview(webview: vscode.Webview) {
    try {
      const styleUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "static", "styles.css")
      );

      const response = await axios.post('https://swcmjqwwc9-dsn.algolia.net/1/indexes/*/queries', {
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

      if (response.status !== 200) {
        console.error(`Failed to fetch plugins. Status: ${response.status}`);
        webview.html = "<p>Failed to load plugins. Please try again later.</p>";
        return;
      }

      let plugins: Plugin[] = response.data.results[0].hits;
      webview.html = buildPluginsHtml(plugins, styleUri);
    } catch (error) {
      console.error("Failed to fetch plugins:", error);
      webview.html = "<p>Failed to load plugins. Please try again later.</p>";
    }
  }
}