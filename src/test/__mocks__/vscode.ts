/** src/test/__mocks__/vscode.ts */
const vscode = {
  Uri: {
    parse: jest.fn().mockImplementation((value) => ({
      path: value,
      toString: () => value,
    })),
  },
  window: {
    createOutputChannel: jest.fn().mockReturnValue({
      show: jest.fn() as jest.Mock<unknown, unknown[]>,
      appendLine: jest.fn() as jest.Mock<unknown, unknown[]>,
      logLevel: jest.fn() as jest.Mock<unknown, unknown[]>,
      onDidChangeLogLevel: jest.fn() as jest.Mock<unknown, unknown[]>,
      trace: jest.fn() as jest.Mock<unknown, unknown[]>,
      debug: jest.fn() as jest.Mock<unknown, unknown[]>,
      info: jest.fn() as jest.Mock<unknown, unknown[]>,
      warn: jest.fn() as jest.Mock<unknown, unknown[]>,
      error: jest.fn() as jest.Mock<unknown, unknown[]>,
      dispose: jest.fn() as jest.Mock<unknown, unknown[]>,
    }),
    showErrorMessage: jest.fn().mockResolvedValue(undefined),
  },
  LogLevel: {
    Trace: 0,
    Debug: 1,
    Info: 2,
    Warning: 3,
    Error: 4,
    Critical: 5,
    Off: 6,
  },
  workspace: {
    get workspaceFolders() {
      return [
        {
          uri: {
            fsPath: '/path/to/workspace',
            scheme: '',
            authority: '',
            path: '',
            query: '',
            fragment: '',
            toJSON: function () {
              throw new Error('Function not implemented.');
            },
          },
          name: '',
          index: 0,
        },
      ];
    },
  },
};

module.exports = vscode;
