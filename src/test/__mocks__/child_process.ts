// __mocks__/child_process.ts
const child_process = {
  exec: jest.fn((_cmd, _options, callback) => {
    callback(null, 'stdout output', 'stderr output');
  }),
};

module.exports = child_process;
