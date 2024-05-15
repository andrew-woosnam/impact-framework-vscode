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
      return tryGetInfoFromWord(word);
    },
  });

  function tryGetInfoFromWord(word: string) {
    try {
      const extensionPath = context.extensionPath;
      const markdownFilePath = path.join(
        extensionPath,
        `static/descriptions/${word}.md`
      );
      const markdownContent = fs.readFileSync(markdownFilePath, "utf8");
      const markdown = new vscode.MarkdownString(markdownContent);
      markdown.isTrusted = true;

      return new vscode.Hover(markdown);
    } catch (_) {}
  }
}

export function deactivate() {}
