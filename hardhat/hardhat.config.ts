import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";

let accounts = {
  mnemonic: process.env.MNEMONIC,
};

const GASPRICE_API = {
  polygon: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",
  zkEvm: `https://api-zkevm.polygonscan.com/api?module=proxy&action=eth_gasPrice&apiKey=${process.env.ZKEVMSCAN_API_KEY}`,
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: process.env.NODE_ENV === "production" ? true : false,
      },
    },
  },
  gasReporter: {
    token: "MATIC",
    gasPriceApi: GASPRICE_API.polygon,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      // blockscout explorer verification does not require keys
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      zkEvm: process.env.ZKEVMSCAN_API_KEY || "",
    },
  },
};

export default config;
