import { create } from "zustand";
import { Contract } from "ethers";

interface ExchangeStore {
  loaded: boolean;
  contract: Contract | {};
  balances: string[];
  setLoaded: (loaded: boolean) => void;
  setContract: (contract: Contract) => void;
  setTokenOneBalance: (balance: string) => void;
  setTokenTwoBalance: (balance: string) => void;
}

const useExhangeStore = create<ExchangeStore>((set) => ({
  loaded: false,
  contract: {},
  balances: [],
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContract: (contract) => set(() => ({ contract })),
  setTokenOneBalance: (balance) => set(() => ({ balances: [balance] })),
  setTokenTwoBalance: (balance) =>
    set((store) => ({ balances: [...store.balances, balance] })),
}));

export default useExhangeStore;
