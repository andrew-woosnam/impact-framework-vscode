import * as vscode from "vscode";

export async function createManifestYamlAsync() {
  const selectedFolders = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    openLabel: "Select Folder for manifest.yml",
  });

  if (!selectedFolders || selectedFolders.length === 0) {
    vscode.window.showErrorMessage(
      "No folder selected. Cannot create manifest.yml."
    );
    return;
  }

  const selectedFolder = selectedFolders[0];
  const filePath = vscode.Uri.joinPath(selectedFolder, "manifest.yml");
  try {
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(""));
    vscode.window.showInformationMessage("Created manifest.yml successfully.");
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
