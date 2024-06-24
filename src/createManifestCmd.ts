/** createManifestCmd.ts */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export async function createManifestYamlAsync() {
  const selectedFolder = await _selectFolder();
  if (!selectedFolder) return;

  const newManifestPath = vscode.Uri.joinPath(selectedFolder, 'manifest.yml');
  const templatePath = _getTemplatePath();

  try {
    const templateContent = _readTemplate(templatePath);
    await _writeManifest(newManifestPath, templateContent);
    vscode.window.showInformationMessage('Created manifest.yml successfully.');
  } catch (error) {
    _handleError(error);
  }
}

async function _selectFolder(): Promise<vscode.Uri | undefined> {
  const selectedFolders = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    openLabel: 'Select Folder for manifest.yml',
  });

  if (!selectedFolders || selectedFolders.length === 0) {
    vscode.window.showErrorMessage(
      'No folder selected. Cannot create manifest.yml.',
    );
    return undefined;
  }

  return selectedFolders[0];
}

function _getTemplatePath(): string {
  return path.join(__dirname, '..', 'static', 'manifest-template.yml');
}

function _readTemplate(templatePath: string): string {
  return fs.readFileSync(templatePath, 'utf8');
}

async function _writeManifest(manifestPath: vscode.Uri, content: string) {
  await vscode.workspace.fs.writeFile(manifestPath, Buffer.from(content));
}

function _handleError(error: unknown) {
  if (error instanceof Error) {
    vscode.window.showErrorMessage(
      `Error creating manifest.yml: ${error.message}`,
    );
  } else {
    vscode.window.showErrorMessage(
      'An unknown error occurred while creating manifest.yml.',
    );
  }
}
