import * as vscode from 'vscode';
import axios from 'axios';

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

      const plugins = response.data.results[0].hits;
      console.log('Fetched plugins:', plugins);

      let pluginsHtml = '';
      for (const plugin of plugins) {
        pluginsHtml += `<li>${plugin.name} - ${plugin.description}</li>`;
      }

      const styleUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "static", "styles.css")
      );

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" type="text/css" href="${styleUri}">
          <title>IF Plugins</title>
        </head>
        <body>
          <ul>
            ${pluginsHtml}
          </ul>
        </body>
        </html>
      `;

      webview.html = htmlContent;
    } catch (error) {
      console.error("Failed to fetch plugins:", error);
      webview.html = "<p>Failed to load plugins. Please try again later.</p>";
    }
  }
}