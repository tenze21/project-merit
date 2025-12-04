import { useState } from "react";
import { parseEther } from "viem";
import stellaAbi from "../contracts/stellaAbi.json";
import tonitrusAbi from "../contracts/tonitrusAbi.json";
import { useGlobalContext } from "../context";
import {
  STELLA_CONTRACT_ADDRESS,
  TONITRUS_CONTRACT_ADDRESS,
  ADMIN_ADDRESS,
} from "../constants";
import WalletConnectButton from "../Components/WalletConnectButton";
import { useEffect } from "react";

function MintBurnPage() {
  const { address, walletClient, setActiveNav } = useGlobalContext();
  const [stellaMintAmount, setStellaMintAmount] = useState("");
  const [stellaBurnAmount, setStellaBurnAmount] = useState("");
  const [tonitrusMintAmount, setTonitrusMintAmount] = useState("");
  const [tonitrusBurnAmount, setTonitrusBurnAmount] = useState("");
  const [isLoading, setIsLoading]= useState(false);

  useEffect(()=>{
    setActiveNav("mint-burn");
  }, []);
  
  async function mintStella(e) {
    e.preventDefault();
    /*call the mint function of the Stella contract */
    const { request } = await walletClient.simulateContract({
      address: STELLA_CONTRACT_ADDRESS,
      abi: stellaAbi.abi,
      functionName: "mint",
      args: [parseEther(stellaMintAmount)],
    });
    const hash = await walletClient.writeContract(request);
    setIsLoading(true);
    await walletClient.waitForTransactionReceipt({
      hash,
    }); /*wait for the transaction to get mined */
    setIsLoading(false);
    await refreshBalances();
    /*reset form*/
    setStellaMintAmount("");
    alert(`${stellaMintAmount} Stella has been minted.(txn: ${hash})`);
  }
  async function burnStella(e) {
    e.preventDefault();
    /*call the burn function of the Stella contract */
    const { request } = await walletClient.simulateContract({
      address: STELLA_CONTRACT_ADDRESS,
      abi: stellaAbi.abi,
      functionName: "burn",
      args: [parseEther(stellaBurnAmount)],
    });
    const hash = await walletClient.writeContract(request);
    setIsLoading(true);
    await walletClient.waitForTransactionReceipt({
      hash,
    }); /*wait for the transaction to get mined */
    setIsLoading(false);
    await refreshBalances();
    /*reset form*/
    setStellaBurnAmount("");
    alert(`${stellaBurnAmount} Stella has been burnt.(txn: ${hash})`);
  }

  async function mintTonitrus(e) {
    e.preventDefault();
    /*call the mint function of the Tonitrus contract */
    const { request } = await walletClient.simulateContract({
      address: TONITRUS_CONTRACT_ADDRESS,
      abi: tonitrusAbi.abi,
      functionName: "mint",
      args: [parseEther(tonitrusMintAmount)],
    });
    const hash = await walletClient.writeContract(request);
    setIsLoading(true);
    await walletClient.waitForTransactionReceipt({
      hash,
    }); /*wait for the transaction to get mined */
    setIsLoading(false);
    await refreshBalances();
    /*reset form*/
    setTonitrusMintAmount("");
    alert(`${tonitrusMintAmount} Tonitrus has been minted.(txn: ${hash})`);
  }

  async function burnTonitrus(e) {
    e.preventDefault();
    /*call the burn function of the Tonitrus contract */
    const { request } = await walletClient.simulateContract({
      address: TONITRUS_CONTRACT_ADDRESS,
      abi: tonitrusAbi.abi,
      functionName: "burn",
      args: [parseEther(tonitrusBurnAmount)],
    });
    const hash = await walletClient.writeContract(request);
    setIsLoading(true);
    await walletClient.waitForTransactionReceipt({
      hash,
    }); /*wait for the transaction to get mined */
    setIsLoading(false);
    await refreshBalances();
    /*reset form*/
    setTonitrusBurnAmount("");
    alert(`${tonitrusBurnAmount} Tonitrus has been minted.(txn: ${hash})`);
  }

  return (
    <main className="mint-burn-wrapper">
      <WalletConnectButton />
      <div>
        <form onSubmit={mintStella}>
            <h1 style={{ marginBottom: "0" }}>
            {" "}
            <img src="/hammer.svg" alt="" /> Mint Stella
            </h1>
            <input
            type="number"
            id="stella-amount"
            name="stella-amount"
            placeholder="Amount of Stella to mint"
            value={stellaMintAmount}
            onChange={(e) => setStellaMintAmount(e.target.value)}
            />
            <button
            type="submit"
            disabled={!address || !stellaMintAmount || address != ADMIN_ADDRESS || isLoading}
            >
            Mint
            </button>
        </form>
        <form onSubmit={burnStella}>
            <h1 style={{ marginBottom: "0" }}>
            {" "}
            <img src="/fire.svg" alt="" /> Burn Stella
            </h1>
            <input
            type="number"
            id="stella-amount"
            name="stella-amount"
            placeholder="Amount of Stella to burn"
            value={stellaBurnAmount}
            onChange={(e) => setStellaBurnAmount(e.target.value)}
            />
            <button
            type="submit"
            disabled={!address || !stellaBurnAmount || address != ADMIN_ADDRESS || isLoading}
            >
            Burn
            </button>
        </form>
        <form onSubmit={mintTonitrus}>
            <h1 style={{ marginBottom: "0" }}>
            {" "}
            <img src="/hammer.svg" alt="" /> Mint Tonitrus
            </h1>
            <input
            type="number"
            id="stella-amount"
            name="stella-amount"
            placeholder="Amount of Stella to mint"
            value={tonitrusMintAmount}
            onChange={(e) => setTonitrusMintAmount(e.target.value)}
            />
            <button
            type="submit"
            disabled={!address || !tonitrusMintAmount || address != ADMIN_ADDRESS || isLoading}
            >
            Mint
            </button>
        </form>
        <form onSubmit={burnTonitrus}>
            <h1 style={{ marginBottom: "0" }}>
            {" "}
            <img src="/fire.svg" alt="" /> Burn Tonitrus
            </h1>
            <input
            type="number"
            id="stella-amount"
            name="stella-amount"
            placeholder="Amount of Stella to burn"
            value={tonitrusBurnAmount}
            onChange={(e) => setTonitrusBurnAmount(e.target.value)}
            />
            <button
            type="submit"
            disabled={!address || !tonitrusBurnAmount || address != ADMIN_ADDRESS || isLoading}
            >
            Burn
            </button>
        </form>
      </div>
    </main>
  );
}

export default MintBurnPage;
