import * as vscode from 'vscode';
import { exec } from 'child_process';

export function listNpmPackages() {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage('No workspace folder is open.');
    return;
  }

  const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

  exec('npm list --depth=0 --json', { cwd: workspaceRoot }, (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      vscode.window.showErrorMessage(`stderr: ${stderr}`);
      return;
    }

    try {
      const packages = JSON.parse(stdout);
      const packageNames = Object.keys(packages.dependencies).join('\n');
      vscode.window.showInformationMessage(`Installed npm packages:\n${packageNames}`);
    } catch (e) {
      if (e instanceof Error) {
        vscode.window.showErrorMessage(`Error parsing npm list output: ${e.message}`);
      } else {
        vscode.window.showErrorMessage('An unknown error occurred while parsing npm list output.');
      }
    }
  });
}
