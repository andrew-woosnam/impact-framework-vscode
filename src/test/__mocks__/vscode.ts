/** src/test/__mocks__/vscode.ts */
const vscode = {
  Uri: {
    parse: jest.fn().mockImplementation((value: string) => ({
      path: value,
      toString: () => value,
    })),
  },
  // Mock other vscode APIs as needed
};

export default vscode;
