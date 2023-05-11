import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    localhost: {},
  },
  paths: {
    artifacts: "./blockchain/artifacts",
    sources: "./blockchain/contracts",
    cache: "./blockchain/cache",
    tests: "./blockchain/test",
  },
};

export default config;
