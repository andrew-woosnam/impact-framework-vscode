/** commandExecutor.ts */
import * as vscode from 'vscode';
import { exec } from 'child_process';

export class CommandExecutor {
    private _outputChannel: vscode.OutputChannel;

    constructor(channelName: string) {
        this._outputChannel = vscode.window.createOutputChannel(channelName);
    }

    public executeNpmInstall(packageName: string, cwd: string) {
        const cmd = `npm install ${packageName}`;
        this._executeCommand(cmd, cwd);
    }

    private _executeCommand(cmd: string, cwd: string) {
        this._outputChannel.show(true);
        this._outputChannel.appendLine(`Executing command: ${cmd}`);
        exec(cmd, { cwd }, (error, stdout, stderr) => {
            if (error) {
                this._outputChannel.appendLine(`exec error: ${error}`);
                return;
            }
            if (stdout) { this._outputChannel.appendLine(`[${cmd}] stdout:\n${stdout}`); }
            if (stderr) { this._outputChannel.appendLine(`[${cmd}] stderr:\n${stderr}`); }
        });
    }
}