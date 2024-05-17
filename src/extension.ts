import * as vscode from "vscode";
import { createManifestYamlAsync } from "./createManifestCmd";
import { createManifestHoverProvider } from "./hoverProviderFactory";
import fs from "fs";
import path from "path";

export function activate(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "ifPluginsWindow", // Unique ID
    "Impact Framework Plugins", // Title
    vscode.ViewColumn.Beside, // Window location
    {
      enableScripts: true,
    }
  );

  const extensionPath = context.extensionPath;
  const htmlFilePath = path.join(extensionPath, `static/plugins.html`);
  const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  panel.webview.html = htmlContent;

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
}

export function deactivate() {}
