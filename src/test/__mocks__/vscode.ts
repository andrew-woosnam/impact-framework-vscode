/** src/test/__mocks__/vscode.ts */
const vscode = {
  Uri: {
    parse: jest.fn().mockImplementation((value) => ({
      path: value,
      toString: () => value,
    })),
  },
  // Mock other vscode APIs as needed
};

module.exports = vscode;
