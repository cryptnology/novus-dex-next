import { ethers, providers } from 'ethers';

export const loadProvider = (
  setProvider: (provider: providers.Web3Provider) => void,
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(provider);

  return provider;
};

export const loadNetwork = async (
  provider: providers.Web3Provider,
  setChainId: (chainId: number) => void,
) => {
  const { chainId } = await provider.getNetwork();
  setChainId(chainId);

  return chainId;
};

export const loadAccount = async (
  provider: providers.Web3Provider,
  setAccount: (account: string) => void,
  setBalance: (balance: string) => void,
) => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const account = ethers.utils.getAddress(accounts[0]);
  setAccount(account);

  const balance = await provider.getBalance(account);
  const formattedBalance = ethers.utils.formatEther(balance);
  setBalance(formattedBalance);

  return { account, balance };
};
