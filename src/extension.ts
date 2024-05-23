import * as vscode from "vscode";
import { createManifestYamlAsync } from "./createManifestCmd";
import { createManifestHoverProvider } from "./hoverProviderFactory";
import fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  let createManifestCmd = vscode.commands.registerCommand(
    "impact-framework-vscode.createManifest",
    () => {
      createManifestYamlAsync();
    }
  );

  context.subscriptions.push(createManifestCmd);

  vscode.languages.registerHoverProvider(
    "yaml",
    createManifestHoverProvider(context)
  );

  vscode.window.registerWebviewViewProvider(
    "ifPluginsView",
    new IFPluginsViewProvider(context.extensionUri)
  );
}

export function deactivate() {}

class IFPluginsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "ifPluginsView";

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
      localResourceRoots: [this._extensionUri],
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

    console.log(htmlContent);

    return htmlContent;
  }
}
