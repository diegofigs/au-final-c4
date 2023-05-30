import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";

let accounts = {
  mnemonic: process.env.MNEMONIC,
};

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  //2) select the default network "gnosis" or "chiado"
  networks: {
    hardhat: {},
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: accounts,
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: accounts,
    },
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL,
      accounts,
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      //4) Insert your Gnosisscan API key
      //blockscout explorer verification does not require keys
      chiado: "your key",
      gnosis: process.env.GNOSISSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
};

export default config;
