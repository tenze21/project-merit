import { useState } from "react";
import { parseEther } from "viem";
import { useGlobalContext } from "../context";
import { students } from "../data";
import stellaAbi from "../contracts/stellaAbi.json";
import tonitrusAbi from "../contracts/tonitrusAbi.json";
import { STELLA_CONTRACT_ADDRESS, TONITRUS_CONTRACT_ADDRESS, ADMIN_ADDRESS } from "../constants";

function TransferToken(){
    const {address, walletClient, refreshBalances}= useGlobalContext();
    const [sStudentId, setSStudentId]= useState("");
    const [stellaAmount, setStellaAmount]= useState("");
    const [tStudentId, settTStudentId]= useState("");
    const [tonitrusAmount, setTonitrusAmount]= useState("");
    const [error, setError]= useState("");
    const [error1, setError1]= useState("");
    const [stellaMintAmount, setStellaMintAmount]= useState("");
    const [stellaBurnAmount, setStellaBurnAmount]= useState("");
    const [tonitrusMintAmount, setTonitrusMintAmount]= useState("");
    const [tonitrusBurnAmount, setTonitrusBurnAmount]= useState("");


    async function awardStella(e){
        e.preventDefault();
        let selectedStudent;
        students.forEach((student)=>{
            if(student.id === Number(sStudentId)){
                selectedStudent= student.address;
                return;
            }
        })
        if(!selectedStudent){
            setError("Please enter a valid student ID");
        }
        const {request}= await walletClient.simulateContract({
            address: STELLA_CONTRACT_ADDRESS,
            abi: stellaAbi.abi,
            functionName: 'transfer',
            args: [selectedStudent, parseEther(stellaAmount)]
        });
        const hash= await walletClient.writeContract(request);
        await walletClient.waitForTransactionReceipt({ hash });
        await refreshBalances();
        setStellaAmount("");
        setSStudentId("");
        alert(`Transaction ${hash} successful`);
    }
    async function awardTonitrus(e){
        e.preventDefault();
        let selectedStudent;
        students.forEach((student)=>{
            if(student.id === Number(tStudentId)){
                selectedStudent= student.address;
                return;
            }
        })
        if(!selectedStudent){
            setError1("Please enter a valid student ID");
        }
        const {request}= await walletClient.simulateContract({
            address: TONITRUS_CONTRACT_ADDRESS,
            abi: tonitrusAbi.abi,
            functionName: 'transfer',
            args: [selectedStudent, parseEther(tonitrusAmount)]
        });
        const hash= await walletClient.writeContract(request);
        await walletClient.waitForTransactionReceipt({ hash });
        await refreshBalances();
        setTonitrusAmount("");
        settTStudentId("");
        alert(`Transaction ${hash} successful`);
    }

    async function mintStella(e){
        e.preventDefault();
        const {request}= await walletClient.simulateContract({
            address: STELLA_CONTRACT_ADDRESS,
            abi: stellaAbi.abi,
            functionName: "mint",
            args: [parseEther(stellaMintAmount)]
        });
        const hash= await walletClient.writeContract(request);
        await walletClient.waitForTransactionReceipt({ hash });
        await refreshBalances();
        setStellaMintAmount("");
        alert(`${stellaMintAmount} Stella has been minted.(txn: ${hash})`);
    }
    async function burnStella(e){
        e.preventDefault();
        const {request}= await walletClient.simulateContract({
            address: STELLA_CONTRACT_ADDRESS,
            abi: stellaAbi.abi,
            functionName: "burn",
            args: [parseEther(stellaBurnAmount)]
        });
        const hash= await walletClient.writeContract(request);
        await walletClient.waitForTransactionReceipt({ hash });
        await refreshBalances();
        setStellaBurnAmount("");
        alert(`${stellaBurnAmount} Stella has been burnt.(txn: ${hash})`);
    }
    async function mintTonitrus(e){
        e.preventDefault();
        const {request}= await walletClient.simulateContract({
            address: TONITRUS_CONTRACT_ADDRESS,
            abi: tonitrusAbi.abi,
            functionName: "mint",
            args: [parseEther(tonitrusMintAmount)]
        });
        const hash= await walletClient.writeContract(request);
        await walletClient.waitForTransactionReceipt({ hash });
        await refreshBalances();
        setTonitrusMintAmount("");
        alert(`${tonitrusMintAmount} Tonitrus has been minted.(txn: ${hash})`);
    }
    async function burnTonitrus(e){
        e.preventDefault();
        const {request}= await walletClient.simulateContract({
            address: TONITRUS_CONTRACT_ADDRESS,
            abi: tonitrusAbi.abi,
            functionName: "burn",
            args: [parseEther(tonitrusBurnAmount)]
        });
        const hash= await walletClient.writeContract(request);
        await walletClient.waitForTransactionReceipt({ hash });
        await refreshBalances();
        setTonitrusBurnAmount("");
        alert(`${tonitrusBurnAmount} Tonitrus has been minted.(txn: ${hash})`);
    }

    return(
        <article className="token-transfer">
            <div>
                <form onSubmit={awardStella}>
                    <h1><img src="/star.svg" alt="" aria-hidden={true}/> Award Stella</h1>
                    {error && (<small style={{color: "red", position: "absolute", top: "6rem"}}>{error}</small>)}
                    <input type="number" id="Student_id" name="student_id" placeholder="Student ID" value={sStudentId} onChange={(e)=>setSStudentId(e.target.value)}/>
                    <input type="number" id="number" name="number" placeholder="Number of Stella" value={stellaAmount} onChange={(e)=>setStellaAmount(e.target.value)}/>
                    <button type="submit" disabled={!address || !sStudentId || !stellaAmount}>Award</button>
                </form>
                <form onSubmit={awardTonitrus}>
                    <h1><img src="/thunder_bolt.svg" alt="" aria-hidden={true}/> Award Tonitrus</h1>
                    {error1 && (<small style={{color: "red", position: "absolute", top: "6rem"}}>{error1}</small>)}
                    <input type="number" id="Student_id" name="student_id" placeholder="Student ID" value={tStudentId} onChange={(e)=>settTStudentId(e.target.value)}/>
                    <input type="number" id="number" name="number" placeholder="Number of Tonitrus" value={tonitrusAmount} onChange={(e)=>setTonitrusAmount(e.target.value)}/>
                    <button type="submit" disabled={!address || !tStudentId || !tonitrusAmount}>Award</button>
                </form>
            </div>
            <div>
                <form onSubmit={mintStella}>
                    <h1 style={{marginBottom: "0"}}> <img src="/hammer.svg" alt="" /> Mint Stella</h1>
                    <input type="number" id="stella-amount" name="stella-amount" placeholder="Amount of Stella to mint" value={stellaMintAmount} onChange={(e)=>setStellaMintAmount(e.target.value)} style={{width: "300px"}}/>
                    <button type="submit" disabled={!address || !stellaMintAmount || address!=ADMIN_ADDRESS}>Mint</button>
                </form>
                <form onSubmit={burnStella}>
                    <h1 style={{marginBottom: "0"}}> <img src="/fire.svg" alt="" /> Burn Stella</h1>
                    <input type="number" id="stella-amount" name="stella-amount" placeholder="Amount of Stella to burn" value={stellaBurnAmount} onChange={(e)=>setStellaBurnAmount(e.target.value)} style={{width: "300px"}}/>
                    <button type="submit" disabled={!address || !stellaBurnAmount || address!=ADMIN_ADDRESS}>Burn</button>
                </form>
                <form onSubmit={mintTonitrus}>
                    <h1 style={{marginBottom: "0"}}> <img src="/hammer.svg" alt="" /> Mint Tonitrus</h1>
                    <input type="number" id="stella-amount" name="stella-amount" placeholder="Amount of Stella to mint" value={tonitrusMintAmount} onChange={(e)=>setTonitrusMintAmount(e.target.value)} style={{width: "300px"}}/>
                    <button type="submit" disabled={!address || !tonitrusMintAmount || address!=ADMIN_ADDRESS}>Mint</button>
                </form>
                <form onSubmit={burnTonitrus}>
                    <h1 style={{marginBottom: "0"}}> <img src="/fire.svg" alt="" /> Burn Tonitrus</h1>
                    <input type="number" id="stella-amount" name="stella-amount" placeholder="Amount of Stella to burn" value={tonitrusBurnAmount} onChange={(e)=>setTonitrusBurnAmount(e.target.value)} style={{width: "300px"}}/>
                    <button type="submit" disabled={!address || !tonitrusBurnAmount || address!=ADMIN_ADDRESS}>Burn</button>
                </form>
            </div>
        </article>
    )
}

export default TransferToken;