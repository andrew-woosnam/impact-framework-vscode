import * as vscode from "vscode";
import { createManifestYamlAsync } from "./createManifestCmd";

export function activate(context: vscode.ExtensionContext) {
  let createManifestCmd = vscode.commands.registerCommand(
    "impact-framework-vscode.createManifest",
    () => {
      createManifestYamlAsync();
    }
  );

  context.subscriptions.push(createManifestCmd);
}

export function deactivate() {}
