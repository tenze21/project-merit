import { useState } from "react";
import { useGlobalContext } from "../context"

function TransferToken(){
    const {address}= useGlobalContext();
    const [sStudentId, setSStudentId]= useState();
    const [stellaAmount, setStellaAmount]= useState();
    const [tStudentId, settTStudentId]= useState();
    const [tonitrusAmount, setTonitrusAmount]= useState();

    return(
        <div>
            <form>
                <h1><img src="/star.svg" alt="" aria-hidden={true}/> Award Stella</h1>
                <input type="number" id="Student_id" name="student_id" placeholder="Student ID" onChange={(e)=>setSStudentId(e.target.value)}/>
                <input type="number" id="number" name="number" placeholder="Number of Stella" onChange={(e)=>setStellaAmount(e.target.value)}/>
                <button type="submit" disabled={!address || !sStudentId || !stellaAmount}>Award</button>
            </form>
            <form>
                <h1><img src="/thunder_bolt.svg" alt="" aria-hidden={true}/> Award Tonitrus</h1>
                <input type="number" id="Student_id" name="student_id" placeholder="Student ID" onChange={(e)=>settTStudentId(e.target.value)}/>
                <input type="number" id="number" name="number" placeholder="Number of Tonitrus" onChange={(e)=>setTonitrusAmount(e.target.value)}/>
                <button type="submit" disabled={!address || !tStudentId || !tonitrusAmount}>Award</button>
            </form>
        </div>
    )
}

export default TransferToken;