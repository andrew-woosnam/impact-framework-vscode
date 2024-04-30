import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

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
  const newManifestPath = vscode.Uri.joinPath(selectedFolder, "manifest.yml");
  const templatePath = path.join(
    __dirname,
    "..",
    "static",
    "manifest-template.yml"
  );

  try {
    const templateContent = fs.readFileSync(templatePath, "utf8");
    await vscode.workspace.fs.writeFile(
      newManifestPath,
      Buffer.from(templateContent)
    );
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
