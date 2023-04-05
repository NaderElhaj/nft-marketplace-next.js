require('@nomiclabs/hardhat-waffle');
const fs = require('fs');

const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      blockGasLimit: 12000000, // set a higher block gas limit
      autoMine: false,
    },
  },
  solidity: '0.8.4',
};
