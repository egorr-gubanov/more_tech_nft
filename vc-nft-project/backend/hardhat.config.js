require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: process.env.INFURA_API_KEY,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
