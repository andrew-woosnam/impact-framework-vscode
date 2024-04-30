import * as vscode from "vscode";
import { tryCreateManifestYaml } from "./createManifestYaml";

export function activate(context: vscode.ExtensionContext) {
  let createManifestCmd = vscode.commands.registerCommand(
    "impact-framework-vscode.createManifest",
    () => {
      tryCreateManifestYaml();
    }
  );

  context.subscriptions.push(createManifestCmd);
}

export function deactivate() {}
