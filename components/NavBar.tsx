'use client';

import { useEffect } from 'react';
import Blockies from 'react-blockies';
import { Container, ToggleThemeButton } from '@/components';
import { Wallet } from '@/icons';
import {
  useBlockchainStore,
  loadAccount,
  loadNetwork,
  loadProvider,
} from '@/store';

import config from '@/store/config.json';

const NavBar = () => {
  const {
    provider,
    chainId,
    account,
    balance,
    setProvider,
    setChainId,
    setAccount,
    setBalance,
  } = useBlockchainStore();

  const loadBlockchainData = async () => {
    const provider = loadProvider(setProvider);
    const chainId = await loadNetwork(provider, setChainId);

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, setAccount, setBalance);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Container className="w-full py-5 flex items-center justify-between bg-light dark:bg-dark z-10 text-dark dark:text-light fixed top-0 left-0">
      <div className="bg-primary h-16 w-16 flex items-center justify-center rounded-full dark:bg-primaryDark cursor-default">
        <div className="bg-light h-[3.7rem] w-[3.7rem] rounded-full flex items-center justify-center text-sm font-semibold text-primary dark:text-primaryDark dark:bg-dark transition">
          Novus
        </div>
      </div>
      <div className="flex items-center">
        <div
          className={`bg-primary/40 dark:bg-primaryDark/40 h-[46px] ${
            account ? 'px-6' : 'pl-6'
          } flex items-center rounded-xl transition`}
        >
          <div className="pr-4 text-dark dark:text-light flex items-center">
            <Wallet className="w-6" />
            <span className="ml-3 text-sm">
              {balance ? Number(balance).toFixed(4) : '0'}
              <span className="ml-1 text-base">ETH</span>
            </span>
          </div>
          {account ? (
            <a
              className="flex items-center text-sm"
              href={
                // @ts-ignore
                config[chainId]
                  ? // @ts-ignore
                    `${config[chainId].explorerURL}/address/${account}`
                  : `#`
              }
              target="_blank"
            >
              {account.slice(0, 5) + '...' + account.slice(38, 42)}
              <Blockies
                seed={account}
                size={10}
                scale={2.5}
                color="#2187D0"
                bgColor="#F1F2F9"
                spotColor="#767F92"
                className="ml-4 rounded-full"
              />
            </a>
          ) : (
            <button
              className="px-6 py-2 text-light font-bold bg-primary rounded-xl hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300"
              // @ts-ignore
              onClick={() => loadAccount(provider, setAccount, setBalance)}
            >
              Connect
            </button>
          )}
        </div>
        <ToggleThemeButton className="ml-6 flex items-center justify-center rounded-full p-1 bg-primary dark:bg-primaryDark text-light dark:text-dark w-[1.65rem] h-[1.65rem] transition" />
      </div>
    </Container>
  );
};

export default NavBar;
