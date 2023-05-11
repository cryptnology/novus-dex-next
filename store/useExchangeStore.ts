import { create } from "zustand";
import { Contract } from "ethers";

interface ExchangeStore {
  loaded: boolean;
  contract: Contract | {};
  setLoaded: (loaded: boolean) => void;
  setContract: (contract: Contract) => void;
}

const useExhangeStore = create<ExchangeStore>((set) => ({
  loaded: false,
  contract: {},
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContract: (contract) => set(() => ({ contract })),
}));

export default useExhangeStore;
