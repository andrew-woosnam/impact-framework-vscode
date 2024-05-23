import * as vscode from 'vscode';
import * as fs from 'fs';

export class IFPluginsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "impact-framework-vscode.pluginsView";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

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

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "static",
        "styles.css"
      )
    );
    const htmlUri = vscode.Uri.joinPath(
      this._extensionUri,
      "static",
      "plugins.html"
    );

    let htmlContent = fs.readFileSync(htmlUri.fsPath, "utf8");
    htmlContent = htmlContent.replace(/{{styleUri}}/g, styleUri.toString());

    return htmlContent;
  }
}
