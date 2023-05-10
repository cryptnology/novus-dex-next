"use client";

import { useEffect, useState } from "react";

import {
  Connect,
  Container,
  Dropdown,
  Logo,
  MobileMenu,
  ToggleThemeButton,
} from "@/components";
import {
  useUserStore,
  loadAccount,
  loadNetwork,
  loadProvider,
  useTokensStore,
  loadTokens,
} from "@/store";

import config from "../store/config.json";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const { setProvider, setChainId, setAccount, setBalance } = useUserStore();
  const { setContracts, setLoaded } = useTokensStore();

  const loadBlockchainData = async () => {
    const provider = loadProvider(setProvider);
    const chainId = await loadNetwork(provider, setChainId);

    // Reload page when network changes
    // @ts-ignore
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    // @ts-ignore
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, setAccount, setBalance);
    });

    // Load token smart contracts
    // @ts-ignore
    const novus = config[chainId].novus;
    // @ts-ignore
    const mETH = config[chainId].mETH;
    await loadTokens(
      provider,
      [novus.address, mETH.address],
      setContracts,
      setLoaded
    );
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Container className="w-full py-5 flex items-center justify-between bg-light dark:bg-dark z-10 text-dark dark:text-light fixed top-0 left-0">
      <MobileMenu isOpen={isOpen} handleClick={handleClick} />
      <Logo className="hidden md:block" />
      <Dropdown className="hidden md:block" />
      <div className="flex items-center">
        <Connect />
        <ToggleThemeButton className="ml-6 hidden md:flex items-center justify-center rounded-full p-1 bg-primary dark:bg-primaryDark text-light dark:text-dark w-[1.65rem] h-[1.65rem] transition" />
      </div>
    </Container>
  );
};

export default NavBar;
