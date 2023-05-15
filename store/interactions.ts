import { Contract, Event, ethers, providers } from "ethers";

import TOKEN from "@/blockchain/artifacts/blockchain/contracts/Token.sol/Token.json";
import EXCHANGE from "@/blockchain/artifacts/blockchain/contracts/Exchange.sol/Exchange.json";
import { Transaction } from "@/store";

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

export const loadExchange = async (
  provider: providers.Web3Provider,
  address: string,
  setContract: (contract: Contract) => void,
  setLoaded: (loaded: boolean) => void
) => {
  const exchange = new ethers.Contract(address, EXCHANGE.abi, provider);

  setContract(exchange);
  setLoaded(true);

  return exchange;
};

export const subscribeToEvents = (
  exchange: Contract,
  setTransfer: (transaction: Transaction, transferInProgress: boolean) => void,
  setEvent: (event: Event) => void
) => {
  exchange.on("Deposit", (token, user, amount, balance, event) => {
    setTransfer(
      {
        transactionType: "Transfer",
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
    setEvent(event);
  });
};

// ---------------------------------------------------------------------
// LOAD USER BALANCES (WALLET & EXCHANGE BALANCES)

export const loadBalances = async (
  exchange: Contract,
  tokens: { token: Contract; symbol: string }[],
  account: string,
  setTokenOneBalance: (balance: string) => void,
  setTokenTwoBalance: (balance: string) => void,
  setLoaded: (loaded: boolean) => void,
  setExchangeTokenOneBalance: (balance: string) => void,
  setExchangeTokenTwoBalance: (balance: string) => void,
  setExchangeLoaded: (loaded: boolean) => void
) => {
  // Tokens
  let balance = ethers.utils.formatUnits(
    await tokens[0].token.balanceOf(account),
    18
  );

  setLoaded(false);
  setTokenOneBalance(balance);
  setLoaded(true);

  balance = ethers.utils.formatUnits(
    await tokens[1].token.balanceOf(account),
    18
  );
  setLoaded(false);
  setTokenTwoBalance(balance);
  setLoaded(true);

  // Exchange
  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[0].token.address, account),
    18
  );

  setExchangeLoaded(false);
  setExchangeTokenOneBalance(balance);
  setExchangeLoaded(true);

  balance = ethers.utils.formatUnits(
    await exchange.balanceOf(tokens[1].token.address, account),
    18
  );

  setExchangeLoaded(false);
  setExchangeTokenTwoBalance(balance);
  setExchangeLoaded(true);
};

// ---------------------------------------------------------------------
// TRANSFER TOKENS (DEPOSIT & WITHDRAWS)

export const transferTokens = async (
  provider: providers.Web3Provider,
  exchange: Contract,
  transactionType: "Transfer" | "Withdraw",
  token: Contract,
  amount: string,
  setTransfer: (transaction: Transaction, transferInProgress: boolean) => void
) => {
  let transaction;

  try {
    const signer = await provider.getSigner();
    const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

    setTransfer(
      {
        transactionType,
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      true
    );

    transaction = await token
      .connect(signer)
      .approve(exchange.address, amountToTransfer);

    await transaction.wait();
    transaction = await exchange
      .connect(signer)
      .depositToken(token.address, amountToTransfer);

    await transaction.wait();

    setTransfer(
      {
        transactionType,
        isPending: false,
        isSuccessful: true,
        isError: false,
      },
      false
    );
  } catch (error) {
    setTransfer(
      {
        transactionType,
        isPending: false,
        isSuccessful: false,
        isError: true,
      },
      false
    );
  }
};
