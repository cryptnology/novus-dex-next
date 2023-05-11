import { create } from "zustand";
import { Contract } from "ethers";

interface TokensStore {
  loaded: boolean;
  contracts: { token: Contract; symbol: string }[];
  balances: string[];
  setLoaded: (loaded: boolean) => void;
  setContracts: (contracts: { token: Contract; symbol: string }[]) => void;
  setTokenOneBalance: (balance: string) => void;
  setTokenTwoBalance: (balance: string) => void;
}

const useTokensStore = create<TokensStore>((set) => ({
  loaded: false,
  contracts: [],
  balances: [],
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContracts: (contracts) => set(() => ({ contracts })),
  setTokenOneBalance: (balance) => set(() => ({ balances: [balance] })),
  setTokenTwoBalance: (balance) =>
    set((store) => ({ balances: [...store.balances, balance] })),
}));

export default useTokensStore;
