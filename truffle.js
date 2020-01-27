var HDWalletProvider = require('truffle-hdwallet-provider');
var war_Mnemonic = require('./config/secrets').war_Mnemonic;
var war_RPC_URL = require('./config/secrets').war_RPC_URL;

module.exports = {
  compilers: {
    solc: {
      version: '0.5.8',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  networks: {
    local: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 5500000,
      from: '0x95915d3457da59f25cfc6f53b7f2056b376943e4'
    },
    rinkeby: {
      provider: new HDWalletProvider(war_Mnemonic, war_RPC_URL),
      network_id: 4,
      gas: 5500000,
      gasPrice: 1000000000, // 1GWEI
      from: '0x00C15B2c45B1Ab907A1213B697341D2fF24Fe181'
    }
  }
};
