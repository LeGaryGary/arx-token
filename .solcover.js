module.exports = {
  testCommand: 'truffle test --network coverage lib/**/*.spec.js',
  skipFiles: [
    "test/"
  ],
  copyPackages: ['openzeppelin-solidity', 'zos-lib']
};
