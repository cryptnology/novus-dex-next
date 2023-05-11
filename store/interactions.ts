import { Contract, ethers, providers } from "ethers";

import TOKEN from "@/blockchain/artifacts/contracts/Token.sol/Token.json";
import EXCHANGE from "@/blockchain/artifacts/contracts/Exchange.sol/Exchange.json";

export const loadProvider = (
  setProvider: (provider: providers.Web3Provider) => void
) => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(provider);

  return provider;
};

export const loadNetwork = async (
  provider: providers.Web3Provider,
  setChainId: (chainId: number) => void
) => {
  const { chainId } = await provider.getNetwork();
  setChainId(chainId);

  return chainId;
};

export const loadAccount = async (
  provider: providers.Web3Provider,
  setAccount: (account: string) => void,
  setBalance: (balance: string) => void
) => {
  // @ts-ignore
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  setAccount(account);

  const balance = await provider.getBalance(account);
  const formattedBalance = ethers.utils.formatEther(balance);
  setBalance(formattedBalance);

  return { account, balance };
};

export const loadTokens = async (
  provider: providers.Web3Provider,
  addresses: string[],
  setContracts: (contracts: { token: Contract; symbol: string }[]) => void,
  setLoaded: (loaded: boolean) => void
) => {
  let tokens = [];

  if (addresses.length) {
    for (let i = 0; i < addresses.length; i++) {
      const token = new ethers.Contract(addresses[i], TOKEN.abi, provider);
      const symbol: string = await token.symbol();

      tokens.push({ token, symbol });
    }
  }
  setContracts(tokens);
  setLoaded(true);

  return tokens;
};