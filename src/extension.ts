import * as vscode from "vscode";
import { createManifestYamlAsync } from "./createManifestCmd";
import fs from "fs";
import path from "path";

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
        try {
          // Get the extension's directory path
          const extensionPath = context.extensionPath;

          // Read the content from initialize.md (use the correct path)
          const markdownFilePath = path.join(
            extensionPath,
            "static/descriptions/initialize.md"
          );
          const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

          // Construct a custom hover message
          const markdown = new vscode.MarkdownString(markdownContent);
          markdown.isTrusted = true;

          return new vscode.Hover(markdown);
        } catch (error) {
          console.error("Error reading or processing initialize.md:", error);
        }
      }
    },
  });
}

export function deactivate() {}
