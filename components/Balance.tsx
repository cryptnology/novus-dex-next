"use client";

import { loadBalances, useTokensStore, useUserStore } from "@/store";
import { useEffect } from "react";

const Balance = () => {
  const { account } = useUserStore();
  const {
    contracts: tokens,
    balances,
    setTokenOneBalance,
    setTokenTwoBalance,
    setLoaded,
  } = useTokensStore();

  useEffect(() => {
    if (tokens[0] && tokens[1] && account)
      loadBalances(
        tokens,
        account,
        setTokenOneBalance,
        setTokenTwoBalance,
        setLoaded
      );
  }, [account]);

  return <div>Balance</div>;
};

export default Balance;
