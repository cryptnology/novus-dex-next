"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Contract } from "ethers";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { FaEthereum } from "react-icons/fa";
import {
  loadBalances,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "@/store";
import { Button, Input } from ".";

const Balance = () => {
  const [token1TransferAmount, setToken1TransferAmount] = useState("");
  const [token2TransferAmount, setToken2TransferAmount] = useState("");

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
  }, [account, exchange, tokens]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const amountHandler = (e: ChangeEvent<HTMLInputElement>, token: Contract) => {
    const amount = e.target.value;

    if (token.address === tokens[0].token.address)
      setToken1TransferAmount(amount);
    if (token.address === tokens[1].token.address)
      setToken2TransferAmount(amount);
  };

  const depositHandler = (e: FormEvent<HTMLFormElement>, token: Contract) => {
    e.preventDefault();

    // if (token.address === tokens[0].address) {
    //   transferTokens(
    //     provider,
    //     exchange,
    //     "Deposit",
    //     token,
    //     token1TransferAmount,
    //     dispatch
    //   );
    //   setToken1TransferAmount('');
    // }
  };

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg transition">Balance</h2>
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
        <Tab.Panels className="mt-6 bg-light dark:bg-dark rounded-xl p-4 transition">
          <Tab.Panel>
            <div className="flex justify-between">
              <div>
                <span className="text-sm font-semibold">Token</span>
                <br />
                <div className="flex items-center">
                  <Image
                    className="object-contain mr-1"
                    src="/nov.png"
                    alt="NOV Logo"
                    width={16}
                    height={16}
                    priority
                  />
                  {tokens && tokens[0]?.symbol}
                </div>
              </div>
              <p>
                <span className="text-sm font-semibold">Wallet</span>
                <br />
                {tokenBalances && tokenBalances[0]}
              </p>
              <p>
                <span className="text-sm font-semibold">Exchange</span>
                <br />
                {exchangeTokenBalances && exchangeTokenBalances[0]}
              </p>
            </div>
            <form
              className="mt-4"
              onSubmit={(e) => depositHandler(e, tokens[0].token)}
            >
              <Input
                label={`${tokens && tokens[0]?.symbol} Amount`}
                type="text"
                id="token0"
                placeholder="0.0000"
                value={token1TransferAmount}
                onChange={(e) => amountHandler(e, tokens[0].token)}
              />
              <Button className="w-full mt-4" label="Deposit" type="submit" />
            </form>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex justify-between">
              <div>
                <span className="text-sm font-semibold">Token</span>
                <br />
                <div className="flex items-center">
                  <FaEthereum className="mr-1" size={14} />
                  {tokens && tokens[1]?.symbol}
                </div>
              </div>
              <p>
                <span className="text-sm font-semibold">Wallet</span>
                <br />
                {tokenBalances && tokenBalances[1]}
              </p>
              <p>
                <span className="text-sm font-semibold">Exchange</span>
                <br />
                {exchangeTokenBalances && exchangeTokenBalances[1]}
              </p>
            </div>
            <form
              className="mt-4"
              onSubmit={(e) => depositHandler(e, tokens[1].token)}
            >
              <Input
                label={`${tokens && tokens[1]?.symbol} Amount`}
                type="text"
                id="token1"
                placeholder="0.0000"
                value={token2TransferAmount}
                onChange={(e) => amountHandler(e, tokens[1].token)}
              />
              <Button className="w-full mt-4" label="Withdraw" type="submit" />
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Balance;
