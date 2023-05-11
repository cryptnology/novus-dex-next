"use client";

import {
  loadBalances,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "@/store";
import { Contract } from "ethers";
import { useEffect } from "react";

const Balance = () => {
  const { account } = useUserStore();
  const {
    contracts: tokens,
    balances: tokenBalances,
    setTokenOneBalance,
    setTokenTwoBalance,
    setLoaded,
  } = useTokensStore();
  const {
    contract: exchange,
    balances: exchangeTokenBalances,
    setTokenOneBalance: setExchangeTokenOneBalance,
    setTokenTwoBalance: setExchangeTokenTwoBalance,
    setLoaded: setExchangeLoaded,
  } = useExchangeStore();

  useEffect(() => {
    if (exchange && tokens[0] && tokens[1] && account)
      loadBalances(
        exchange as Contract,
        tokens,
        account,
        setTokenOneBalance,
        setTokenTwoBalance,
        setLoaded,
        setExchangeTokenOneBalance,
        setExchangeTokenTwoBalance,
        setExchangeLoaded
      );
  }, [account]);

  return <div>Balance</div>;
};

export default Balance;
