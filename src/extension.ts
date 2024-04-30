import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let createManifestCmd = vscode.commands.registerCommand(
    "impact-framework-vscode.createManifest",
    () => {
      createManifestYaml();
    }
  );

  context.subscriptions.push(createManifestCmd);

  async function createManifestYaml() {
    // Get the first workspace folder (if available)
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      vscode.window.showErrorMessage("No workspace folder found.");
      return;
    }

    // Create the "manifest.yml" file
    const filePath = vscode.Uri.joinPath(workspaceFolder.uri, "manifest.yml");
    try {
      await vscode.workspace.fs.writeFile(filePath, Buffer.from(""));
      vscode.window.showInformationMessage(
        "Created manifest.yml successfully!"
      );
    } catch (error) {
      if (error instanceof Error) {
        vscode.window.showErrorMessage(
          `Error creating manifest.yml: ${error.message}`
        );
      } else {
        vscode.window.showErrorMessage(
          "An unknown error occurred while creating manifest.yml."
        );
      }
    }
  }
}

export function deactivate() {}
