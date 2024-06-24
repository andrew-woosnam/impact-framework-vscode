/** commandExecutor.ts */
import { exec } from 'child_process';

export class CommandExecutor {
    public executeNpmInstall(packageName: string, cwd: string) {
        const cmd = `npm install ${packageName}`;
        this._executeCommand(cmd, cwd);
    }

    private _executeCommand(cmd: string, cwd: string) {
        exec(cmd, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            if (stdout) { console.log(`[${cmd}] stdout:\n${stdout}`); }
            if (stderr) { console.error(`[${cmd}] stderr:\n${stderr}`); }
        });
    }
}