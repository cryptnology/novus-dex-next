'use client';

import { Container, ToggleThemeButton } from '@/components';
import { Wallet } from '@/icons';
import { useBlockchainStore } from '@/store';
import { ethers } from 'ethers';
import { useEffect } from 'react';

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
    const connection = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(connection);
    const { chainId } = await connection.getNetwork();
    setChainId(chainId);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    const balance = await connection.getBalance(account);
    const formattedBalance = ethers.utils.formatEther(balance);
    setBalance(formattedBalance);

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    loadBlockchainData();
    window.ethereum.on('accountsChanged', () => {
      loadBlockchainData();
    });
  }, []);

  return (
    <Container className="w-full py-5 flex items-center justify-between bg-light dark:bg-dark z-10 text-dark dark:text-light fixed top-0 left-0">
      <div className="bg-primary h-16 w-16 flex items-center justify-center rounded-full dark:bg-primaryDark cursor-default">
        <div className="bg-light h-[3.7rem] w-[3.7rem] rounded-full flex items-center justify-center text-sm font-semibold text-primary dark:text-primaryDark dark:bg-dark transition">
          Novus
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-primary/40 dark:bg-primaryDark/40 flex items-center rounded-xl transition">
          <div className="px-6 text-dark dark:text-light flex items-center">
            <Wallet className="w-6" />
            <span className="ml-3 text-sm">
              {balance ? Number(balance).toFixed(4) : '0'}
              <span className="ml-1 text-base">ETH</span>
            </span>
          </div>
          <button className="px-6 py-2 text-light font-bold bg-primary rounded-xl hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark transition duration-300">
            Connect
          </button>
        </div>
        <ToggleThemeButton className="ml-6 flex items-center justify-center rounded-full p-1 bg-primary dark:bg-primaryDark text-light dark:text-dark w-[1.65rem] h-[1.65rem] transition" />
      </div>
    </Container>
  );
};

export default NavBar;
