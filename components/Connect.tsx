'use client';

import Blockies from 'react-blockies';
import { useBlockchainStore, loadAccount } from '@/store';
import { Wallet } from '@/icons';

import config from '../store/config.json';

interface Props {
  className?: string;
}

const Connect = ({ className }: Props) => {
  const { provider, account, balance, chainId, setAccount, setBalance } =
    useBlockchainStore();

  return (
    <div
      className={`bg-primary/40 dark:bg-secondaryDark h-[46px] ${
        account ? 'px-6' : 'pl-6'
      } flex items-center rounded-xl transition ${className}`}
    >
      <div className="pr-4 text-dark dark:text-light flex items-center">
        <Wallet className="w-6" />
        <span className="ml-3 text-sm">
          {balance ? Number(balance).toFixed(4) : '0'}
          <span className="ml-1 font-bold">ETH</span>
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
  );
};

export default Connect;
