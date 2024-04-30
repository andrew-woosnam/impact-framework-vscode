import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "impact-framework-vscode.helloWorld",
    () => {}
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
