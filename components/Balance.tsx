"use client";

import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import { Contract } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { FaEthereum } from "react-icons/fa";
import {
  loadBalances,
  transferTokens,
  useExchangeStore,
  useTokensStore,
  useUserStore,
} from "@/store";
import { Button, Input } from ".";
import React from "react";

interface FormProps {
  token: Contract;
  tokenSymbol: string;
  icon: ReactNode;
  tokenBalance: string;
  exchangeTokenBalance: string;
  tokenTransferAmount: string;
  depositHandler: (e: FormEvent<HTMLFormElement>, token: Contract) => void;
  amountHandler: (e: ChangeEvent<HTMLInputElement>, token: Contract) => void;
}

const Form = ({
  token,
  tokenSymbol,
  icon,
  tokenBalance,
  exchangeTokenBalance,
  tokenTransferAmount,
  depositHandler,
  amountHandler,
}: FormProps) => (
  <>
    <div className="flex justify-between">
      <div>
        <span className="text-sm font-semibold">Token</span>
        <br />
        <div className="flex items-center">
          {icon}
          {tokenSymbol}
        </div>
      </div>
      <p>
        <span className="text-sm font-semibold">Wallet</span>
        <br />
        {tokenBalance}
      </p>
      <p>
        <span className="text-sm font-semibold">Exchange</span>
        <br />
        {exchangeTokenBalance}
      </p>
    </div>
    <form className="mt-4" onSubmit={(e) => depositHandler(e, token)}>
      <Input
        label={`${tokenSymbol} Amount`}
        type="text"
        id="token1"
        placeholder="0.0000"
        value={tokenTransferAmount}
        onChange={(e) => amountHandler(e, token)}
      />
      <Button className="w-full mt-4" label="Deposit" type="submit" />
    </form>
  </>
);

const Balance = () => {
  const [token1TransferAmount, setToken1TransferAmount] = useState("");
  const [token2TransferAmount, setToken2TransferAmount] = useState("");

  const { account, provider, setAccount, setBalance } = useUserStore();
  const {
    contracts: tokens,
    balances: tokenBalances,
    setTokenOneBalance,
    setTokenTwoBalance,
    setLoaded,
    transferInProgress,
    setTransfer,
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
  }, [account, exchange, tokens, transferInProgress]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const amountHandler = (e: ChangeEvent<HTMLInputElement>, token: Contract) => {
    const amount = e.target.value;

    if (token.address === tokens[0].token.address)
      setToken1TransferAmount(amount);
    else setToken2TransferAmount(amount);
  };

  const depositHandler = (e: FormEvent<HTMLFormElement>, token: Contract) => {
    e.preventDefault();

    if (token.address === tokens[0].token.address && provider) {
      transferTokens(
        provider as Web3Provider,
        exchange as Contract,
        "Transfer",
        token,
        token1TransferAmount,
        setTransfer,
        setAccount,
        setBalance
      );
      setToken1TransferAmount("");
    } else {
      transferTokens(
        provider as Web3Provider,
        exchange as Contract,
        "Transfer",
        token,
        token2TransferAmount,
        setTransfer,
        setAccount,
        setBalance
      );
      setToken2TransferAmount("");
    }
  };

  return (
    <div className="pb-6">
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
            <Form
              token={tokens[0]?.token}
              tokenSymbol={tokens[0]?.symbol}
              icon={
                <Image
                  className="object-contain mr-1"
                  src="/nov.png"
                  alt="NOV Logo"
                  width={16}
                  height={16}
                  priority
                />
              }
              tokenBalance={tokenBalances[0]}
              exchangeTokenBalance={exchangeTokenBalances[0]}
              tokenTransferAmount={token1TransferAmount}
              depositHandler={depositHandler}
              amountHandler={amountHandler}
            />
            <div className="border border-primary dark:border-primaryDark w-full rounded-xl my-10" />
            <Form
              token={tokens[1]?.token}
              tokenSymbol={tokens[1]?.symbol}
              icon={
                tokens[1]?.symbol === "mETH" ? (
                  <FaEthereum className="mr-1" size={14} />
                ) : (
                  <Image
                    className="object-contain mr-1"
                    src="/dai.png"
                    alt="DAI Logo"
                    width={14}
                    height={14}
                    priority
                  />
                )
              }
              tokenBalance={tokenBalances[1]}
              exchangeTokenBalance={exchangeTokenBalances[1]}
              tokenTransferAmount={token2TransferAmount}
              depositHandler={depositHandler}
              amountHandler={amountHandler}
            />
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
