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

  // Register a hover provider for YAML
  vscode.languages.registerHoverProvider("yaml", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      if (word === "initialize") {
        return new vscode.Hover({
          language: "YAML",
          value:
            "The initialize section is where you define which plugins will be used in your manifest file and provide the global configuration for them.",
        });
      }
    },
  });
}
