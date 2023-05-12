"use client";

import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { Tab } from "@headlessui/react";
import {
  loadBalances,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "@/store";

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

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg">Balance</h2>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-light dark:bg-dark p-1 font-bold">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-xl py-2.5 font-bold leading-5 text-dark",

                selected
                  ? "bg-primary text-light hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300"
                  : "dark:text-light border-[3px] border-transparent hover:border-primary dark:hover:border-primaryDark dark:hover:border-[3px] transition duration-300"
              )
            }
          >
            Deposit
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-xl py-2.5 font-bold leading-5 text-dark",
                selected
                  ? "bg-primary text-light hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300"
                  : "dark:text-light border-[3px] border-transparent hover:border-primary dark:hover:border-primaryDark dark:hover:border-[3px] transition duration-300"
              )
            }
          >
            Withdraw
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>Deposit</Tab.Panel>
          <Tab.Panel>Withdraw</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Balance;
