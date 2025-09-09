import React, { useContext, useState, useEffect } from "react";
import {
  createWalletClient,
  custom,
  getContract,
  publicActions,
  formatEther,
  createPublicClient,
} from "viem";
import { sepolia } from "viem/chains";
import stellaAbi from "./contracts/stellaAbi.json";
import tonitrusAbi from "./contracts/tonitrusAbi.json";
import {
  STELLA_CONTRACT_ADDRESS,
  TONITRUS_CONTRACT_ADDRESS,
} from "./constants";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [walletClient, setWalletClient] = useState(null);
  const [publicClient, setPublicClient]= useState(null);
  const [address, setAddress] = useState("");
  const [stellaContract, setStellaContract] = useState(null);
  const [tonitrusContract, setTonitrusContract] = useState(null);
  const [stellaBalance, setStellaBalance] = useState(0);
  const [tonitrusBalance, setTonitrusBalance] = useState(0);

  useEffect(() => {
    if (!window.ethereum) {
      alert("No wallet detected!");
      return;
    }
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    });
    setPublicClient(publicClient);
  },[]);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("No wallet detected!");
      return;
    }
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const client = createWalletClient({
      account,
      chain: sepolia,
      transport: custom(window.ethereum),
    }).extend(publicActions);

    setWalletClient(client);
    const [userAddress] = await client.getAddresses();
    setAddress(userAddress);
  }

  useEffect(() => {
    if (!walletClient) return;
    const stella = getContract({
      address: STELLA_CONTRACT_ADDRESS,
      abi: stellaAbi.abi,
      client: walletClient,
    });

    const tonitrus = getContract({
      address: TONITRUS_CONTRACT_ADDRESS,
      abi: tonitrusAbi.abi,
      client: walletClient,
    });

    setStellaContract(stella);
    setTonitrusContract(tonitrus);
  }, [walletClient]);

  useEffect(() => {
    if (!walletClient || !address) return;
    async function getBalances() {
      const sBalance = await walletClient.readContract({
        address: STELLA_CONTRACT_ADDRESS,
        abi: stellaAbi.abi,
        functionName: "balanceOf",
        args: [address],
      });
      const tBalance = await walletClient.readContract({
        address: TONITRUS_CONTRACT_ADDRESS,
        abi: tonitrusAbi.abi,
        functionName: "balanceOf",
        args: [address],
      });
      setStellaBalance(formatEther(sBalance));
      setTonitrusBalance(formatEther(tBalance));
    }
    getBalances();
  }, [walletClient, address]);

  const refreshBalances = async () => {
    if (!walletClient || !address) return;
    const sBalance = await walletClient.readContract({
      address: STELLA_CONTRACT_ADDRESS,
      abi: stellaAbi.abi,
      functionName: "balanceOf",
      args: [address],
    });
    const tBalance = await walletClient.readContract({
      address: TONITRUS_CONTRACT_ADDRESS,
      abi: tonitrusAbi.abi,
      functionName: "balanceOf",
      args: [address],
    });
    setStellaBalance(formatEther(sBalance));
    setTonitrusBalance(formatEther(tBalance));
  };

  return (
    <AppContext.Provider
      value={{
        connectWallet,
        address,
        walletClient,
        stellaContract,
        tonitrusContract,
        stellaBalance,
        tonitrusBalance,
        refreshBalances,
        publicClient
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
