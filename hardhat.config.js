require('@nomiclabs/hardhat-waffle');
const fs = require('fs');

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      blockGasLimit: 12000000, // set a higher block gas limit
      autoMine: false,
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/w3C7zPFLwVtL7jB5h157nSHEUEy1okB6',
      accounts: ['223daaade006a38deba5441ac4d168cfac02e69987216f1cf9a6a08c0fcc42bd'],
    },
  },
  solidity: '0.8.4',
};
