/** commandExecutor.ts */
import * as vscode from 'vscode';
import { exec } from 'child_process';

export class CommandExecutor {
    private _outputChannel: vscode.OutputChannel;

    constructor(channelName: string) {
        this._outputChannel = vscode.window.createOutputChannel(channelName);
    }

    public executeNpmInstall(packageName: string) {
        if (!packageName) {
            vscode.window.showErrorMessage('Package name unknown.');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        const workspaceFolder = workspaceFolders[0].uri.fsPath;
        const cmd = `npm install ${packageName}`;
        this._executeCommand(cmd, workspaceFolder);
    }

    private _executeCommand(cmd: string, cwd: string) {
        this._outputChannel.show(true);
        this._outputChannel.appendLine(`Executing command: ${cmd}`);
        exec(cmd, { cwd }, (error, stdout, stderr) => {
            if (error) {
                this._outputChannel.appendLine(`exec error: ${error}`);
                vscode.window.showErrorMessage(`Command execution failed: ${error.message}`);
                return;
            }
            if (stdout) { this._outputChannel.appendLine(`[${cmd}] stdout:\n${stdout}`); }
            if (stderr) { this._outputChannel.appendLine(`[${cmd}] stderr:\n${stderr}`); }
        });
    }
}