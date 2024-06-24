/** commandExecutor.ts */
import * as vscode from 'vscode';
import { exec } from 'child_process';

export class CommandExecutor {
  private _outputChannel: vscode.OutputChannel;

  constructor(channelName: string) {
    this._outputChannel = vscode.window.createOutputChannel(channelName);
  }

  public executeNpmInstall(packageName: string) {
    if (!this._validatePackageName(packageName)) return;

    const workspaceFolder = this._getWorkspaceFolder();
    if (!workspaceFolder) return;

    const cmd = `npm install ${packageName}`;
    this._executeCommand(cmd, workspaceFolder);
  }

  private _validatePackageName(packageName: string): boolean {
    if (!packageName) {
      vscode.window.showErrorMessage('Package name unknown.');
      return false;
    }
    return true;
  }

  private _getWorkspaceFolder(): string | undefined {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage('No workspace folder open.');
      return undefined;
    }
    return workspaceFolders[0].uri.fsPath;
  }

  private _executeCommand(cmd: string, cwd: string) {
    this._outputChannel.show(true);
    this._outputChannel.appendLine(`Executing command: ${cmd}`);
    exec(cmd, { cwd }, (error, stdout, stderr) => {
      if (error) {
        this._logError(error);
        return;
      }
      this._logOutput(cmd, stdout, stderr);
    });
  }

  private _logError(error: Error) {
    this._outputChannel.appendLine(`exec error: ${error}`);
    vscode.window.showErrorMessage(
      `Command execution failed: ${error.message}`,
    );
  }

  private _logOutput(cmd: string, stdout: string, stderr: string) {
    if (stdout) {
      this._outputChannel.appendLine(`[${cmd}] stdout:\n${stdout}`);
    }
    if (stderr) {
      this._outputChannel.appendLine(`[${cmd}] stderr:\n${stderr}`);
    }
  }
}
