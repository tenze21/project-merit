import React, { useContext, useState, useEffect } from "react";
import { createWalletClient, custom, getContract, publicActions } from "viem";
import { sepolia } from "viem/chains";
// import stellaAbi from "./contracts/stellaAbi.json";
// import tonitrusAbi from "./contracts/tonitrusAbi.json";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [walletClient, setWalletClient] = useState(null);
  const [address, setAddress] = useState("");
  const [stellaContract, setStellaContract]= useState(null);
  const [tonitrusContract, setTonitrusContract]= useState(null);

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

  // const stella= getContract({
  //   address:'',
  //   abi: abi.abi,
  //   client: walletClient
  // });

  // const tonitrus= getContract({
  //   address: '',
  //   abi: abi.abi,
  //   client: walletClient
  // })

  // setStellaContract(stella);
  // setTonitrusContract(tonitrus);
  return (
    <AppContext.Provider value={{ connectWallet, address, walletClient, stellaContract, tonitrusContract }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
