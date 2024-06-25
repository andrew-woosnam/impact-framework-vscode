/** src/test/__mocks__/vscode.ts */
interface MockUri {
  fsPath: string;
  scheme: string;
  authority: string;
  path: string;
  query: string;
  fragment: string;
  with: () => MockUri;
  toJSON: () => MockUri;
  toString: () => string;
}

const createMockUri = (path: string): MockUri => ({
  fsPath: path,
  scheme: '',
  authority: '',
  path: '',
  query: '',
  fragment: '',
  with: function () {
    return this;
  },
  toJSON: function () {
    return this;
  },
  toString: function () {
    return this.fsPath;
  },
});

const createMockWorkspaceFolder = (
  path: string,
  name: string,
  index: number,
) => ({
  uri: createMockUri(path),
  name: name,
  index: index,
});

const vscode = {
  Uri: {
    parse: jest.fn().mockImplementation((value) => createMockUri(value)),
  },
  window: {
    createOutputChannel: jest.fn().mockReturnValue({
      show: jest.fn(),
      appendLine: jest.fn(),
      logLevel: jest.fn(),
      onDidChangeLogLevel: jest.fn(),
      trace: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      dispose: jest.fn(),
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
    workspaceFolders: jest
      .fn()
      .mockReturnValue([
        createMockWorkspaceFolder('/fake/path', 'my-workspace-folder', 0),
      ]),
  },
  createMockWorkspaceFolder,
};

module.exports = vscode;
