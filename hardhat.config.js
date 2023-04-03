require('@nomiclabs/hardhat-waffle');
const fs = require('fs');

const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/8678dc06641e2f6e552fe105e9201d7a',
      accounts: [privateKey],
      chainId: 1,
      gasPrice: 75000000000, // adjust to the current gas price
    },
  },
  solidity: '0.8.4',
};
