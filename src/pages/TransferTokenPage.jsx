import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { useGlobalContext } from "../context";
import { students } from "../data";
import stellaAbi from "../contracts/stellaAbi.json";
import tonitrusAbi from "../contracts/tonitrusAbi.json";
import WalletConnectButton from "../Components/WalletConnectButton";
import {
  STELLA_CONTRACT_ADDRESS,
  TONITRUS_CONTRACT_ADDRESS,
} from "../constants";

function TransferTokenPage() {
  const { address, walletClient, refreshBalances, setActiveNav, stellaBalance, tonitrusBalance } =
    useGlobalContext();
  const [sStudentId, setSStudentId] = useState("");
  const [stellaAmount, setStellaAmount] = useState("");
  const [tStudentId, settTStudentId] = useState("");
  const [tonitrusAmount, setTonitrusAmount] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [isLoading, setIsLoading]= useState(false);

  useEffect(() => {
    setActiveNav("award");
  }, []);

  async function awardStella(e) {
    e.preventDefault();
    let selectedStudent;
    students.forEach((student) => {
      if (student.id === Number(sStudentId)) {
        selectedStudent = student.address;
        return;
      }
    });

    if (!selectedStudent) {
      setError("Please enter a valid student ID");
    }
    /*call the transfer function of the Stella contract*/
    const { request } = await walletClient.simulateContract({
      address: STELLA_CONTRACT_ADDRESS,
      abi: stellaAbi.abi,
      functionName: "transfer",
      args: [selectedStudent, parseEther(stellaAmount)],
    });
    const hash = await walletClient.writeContract(request);
    setIsLoading(true);
    await walletClient.waitForTransactionReceipt({
      hash,
    }); /*wait for the transaction to get mined*/
    setIsLoading(false);
    await refreshBalances();
    /*reset form */
    setStellaAmount("");
    setSStudentId("");
    alert(`Transaction ${hash} successful`);
  }

  async function awardTonitrus(e) {
    e.preventDefault();
    let selectedStudent;
    students.forEach((student) => {
      if (student.id === Number(tStudentId)) {
        selectedStudent = student.address;
        return;
      }
    });
    if (!selectedStudent) {
      setError1("Please enter a valid student ID");
    }
    /*call the transfer function of the tonitrus contract*/
    const { request } = await walletClient.simulateContract({
      address: TONITRUS_CONTRACT_ADDRESS,
      abi: tonitrusAbi.abi,
      functionName: "transfer",
      args: [selectedStudent, parseEther(tonitrusAmount)],
    });
    const hash = await walletClient.writeContract(request);
    setIsLoading(true);
    await walletClient.waitForTransactionReceipt({
      hash,
    }); /*wait for the transaction to get mined */
    setIsLoading(false);
    await refreshBalances();
    /*reset form*/
    setTonitrusAmount("");
    settTStudentId("");
    alert(`Transaction ${hash} successful`);
  }

  return (
    <article className="token-transfer">
      <WalletConnectButton />
      {walletClient && (
        <article className="balance-display">
          <div>
            <p>Stella Earned: {stellaBalance}</p>
            <img src="/star.svg" alt="" />
          </div>
          <div>
            <p>Tonitrus Earned: {tonitrusBalance} </p>
            <img src="/thunder_bolt.svg" alt="" />
          </div>
        </article>
      )}
      <div className="award-form">
        <form onSubmit={awardStella}>
          <h1>
            <img src="/star.svg" alt="" aria-hidden={true} /> Award Stella
          </h1>
          {error && (
            <small style={{ color: "red", position: "absolute", top: "6rem" }}>
              {error}
            </small>
          )}
          <input
            type="number"
            id="Student_id"
            name="student_id"
            placeholder="Student ID"
            value={sStudentId}
            onChange={(e) => setSStudentId(e.target.value)}
          />
          <input
            type="number"
            id="number"
            name="number"
            placeholder="Number of Stella"
            value={stellaAmount}
            onChange={(e) => setStellaAmount(e.target.value)}
          />
          <button
            type="submit"
            disabled={!address || !sStudentId || !stellaAmount || isLoading}
          >
            Award
          </button>
        </form>
        <form onSubmit={awardTonitrus}>
          <h1>
            <img src="/thunder_bolt.svg" alt="" aria-hidden={true} /> Award
            Tonitrus
          </h1>
          {error1 && (
            <small style={{ color: "red", position: "absolute", top: "6rem" }}>
              {error1}
            </small>
          )}
          <input
            type="number"
            id="Student_id"
            name="student_id"
            placeholder="Student ID"
            value={tStudentId}
            onChange={(e) => settTStudentId(e.target.value)}
          />
          <input
            type="number"
            id="number"
            name="number"
            placeholder="Number of Tonitrus"
            value={tonitrusAmount}
            onChange={(e) => setTonitrusAmount(e.target.value)}
          />
          <button
            type="submit"
            disabled={!address || !tStudentId || !tonitrusAmount || isLoading}
          >
            Award
          </button>
        </form>
      </div>
    </article>
  );
}

export default TransferTokenPage;
