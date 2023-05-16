import { create } from "zustand";
import { Contract, Event } from "ethers";

import { Transaction as TransactionConst } from "@/constants";

export interface Transaction {
  transactionType: TransactionConst.NewOrder;
  isPending: boolean;
  isSuccessful: boolean;
  isError: boolean;
}

interface ExchangeStore {
  loaded: boolean;
  contract: Contract | {};
  balances: string[];
  transaction: Transaction | {};
  orderInProgress: boolean;
  events: Event[];
  setLoaded: (loaded: boolean) => void;
  setContract: (contract: Contract) => void;
  setTokenOneBalance: (balance: string) => void;
  setTokenTwoBalance: (balance: string) => void;
  setOrder: (transaction: Transaction, orderInProgress: boolean) => void;
  setEvent: (event: Event) => void;
}

const useExhangeStore = create<ExchangeStore>((set) => ({
  loaded: false,
  contract: {},
  balances: [],
  transaction: {},
  orderInProgress: false,
  events: [],
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContract: (contract) => set(() => ({ contract })),
  setTokenOneBalance: (balance) => set(() => ({ balances: [balance] })),
  setTokenTwoBalance: (balance) =>
    set((store) => ({ balances: [...store.balances, balance] })),
  setOrder: (transaction, orderInProgress) =>
    set(() => ({
      transaction,
      orderInProgress,
    })),
  setEvent: (event) => set((store) => ({ events: [...store.events, event] })),
}));

export default useExhangeStore;
