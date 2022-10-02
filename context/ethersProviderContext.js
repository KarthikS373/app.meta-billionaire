import React, { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useRouter } from "next/router";
import { providers } from "ethers";

const EthersContext = React.createContext(null);

export const EthersProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);

  const router = useRouter();

  let web3Modal;
  if (typeof window !== "undefined") {
    const providerOptions = {
      walletconnect: {
        display: {
          name: "Mobile",
        },
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
        },
      },
    };
    web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
      disableInjectedProvider: false,
    });
  }

  const connect = useCallback(async function () {
    try {
      const provider = await web3Modal.connect();
      const web3Result = new providers.Web3Provider(provider);
      const signer = web3Result.getSigner();
      const address = await signer.getAddress();
      const network = await web3Result.getNetwork();

      setProvider(provider);
      setWeb3Provider(web3Result);
      setAddress(address);
      setChainId(network.chainId);
    } catch {
      console.log("error");
    }
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      setAddress(null);
      setProvider(null);
      setWeb3Provider(null);
      setBalance(null);
      setChainId(null);
    },
    [provider]
  );

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        setAddress(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        router.reload();
      };

      const handleDisconnect = (error) => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  // useEffect(() => {
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     connect();
  //   }
  // }, [connect]);

  return (
    <EthersContext.Provider
      value={{
        address,
        provider: web3Provider,
        balance,
        disconnect,
        connect,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export default EthersContext;
