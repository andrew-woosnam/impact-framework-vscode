/** commandExecutor.test.ts */
import * as vscode from 'vscode';
import { exec, ExecOptions } from 'child_process';
import { CommandExecutor } from '../../commandExecutor';

jest.mock('child_process');

describe('CommandExecutor', () => {
  let commandExecutor: CommandExecutor;
  let mockOutputChannel: vscode.LogOutputChannel;
  const channelName = 'TestChannel';

  beforeEach(() => {
    mockOutputChannel = vscode.window.createOutputChannel(
      channelName,
      undefined,
    ) as vscode.LogOutputChannel;

    jest
      .spyOn(vscode.window, 'createOutputChannel')
      .mockReturnValue(mockOutputChannel);
    jest.spyOn(vscode.window, 'showErrorMessage').mockImplementation(() => {
      return Promise.resolve(undefined) as Thenable<
        vscode.MessageItem | undefined
      >;
    });

    commandExecutor = new CommandExecutor(channelName);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create output channel on instantiation', () => {
    expect(vscode.window.createOutputChannel).toHaveBeenCalledWith(channelName);
  });

  test('should not execute npm install if package name is invalid', () => {
    commandExecutor.executeNpmInstall('');
    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
      'Package name unknown.',
    );
    expect(exec).not.toHaveBeenCalled();
  });

  test('should not execute npm install if no workspace folder is open', () => {
    jest
      .spyOn(vscode.workspace, 'workspaceFolders', 'get')
      .mockReturnValueOnce(undefined);
    commandExecutor.executeNpmInstall('test-package');
    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
      'No workspace folder open.',
    );
    expect(exec).not.toHaveBeenCalled();
  });

  test('should execute npm install command if package name and workspace folder are valid', () => {
    commandExecutor.executeNpmInstall('test-package');
    expect(exec).toHaveBeenCalledWith(
      'npm install test-package',
      { cwd: '/path/to/workspace' },
      expect.any(Function),
    );
  });

  test('should log command execution to output channel', () => {
    commandExecutor.executeNpmInstall('test-package');
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      'Executing command: npm install test-package',
    );
  });

  test('should log stdout and stderr to output channel after command execution', () => {
    commandExecutor.executeNpmInstall('test-package');
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      '[npm install test-package] stdout:\nstdout output',
    );
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      '[npm install test-package] stderr:\nstderr output',
    );
  });

  test('should log error to output channel and show error message if command execution fails', () => {
    (exec as unknown as jest.Mock).mockImplementationOnce(
      (
        _cmd: string,
        _options: ExecOptions,
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        const error = new Error('exec error');
        callback(error, '', '');
      },
    );

    commandExecutor.executeNpmInstall('test-package');
    expect(mockOutputChannel.appendLine).toHaveBeenCalledWith(
      'exec error: Error: exec error',
    );
    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(
      'Command execution failed: exec error',
    );
  });
});
