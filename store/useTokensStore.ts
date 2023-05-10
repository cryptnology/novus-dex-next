import { create } from "zustand";
import { Contract } from "ethers";

interface TokensStore {
  loaded: boolean;
  contracts: { token: Contract; symbol: string }[];
  setLoaded: (loaded: boolean) => void;
  setContracts: (contracts: { token: Contract; symbol: string }[]) => void;
}

const useTokensStore = create<TokensStore>((set) => ({
  loaded: false,
  contracts: [],
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContracts: (contracts) => set(() => ({ contracts })),
}));

export default useTokensStore;
