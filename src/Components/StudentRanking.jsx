import { useState, useEffect } from "react";
import { formatEther } from "viem";
import { useGlobalContext } from "../context.jsx";
import { students as studentsData } from "../data.js";
import {
  STELLA_CONTRACT_ADDRESS,
  TONITRUS_CONTRACT_ADDRESS,
} from "../constants.js";
import stellaAbi from "../contracts/stellaAbi.json";
import tonitrusAbi from "../contracts/tonitrusAbi.json";
function StudentRanking() {
  const { publicClient } = useGlobalContext();
  const [students, setStudents] = useState(studentsData);

  useEffect(() => {
    if (!publicClient) return;

    async function fetchBalances() {
      const updated = await Promise.all(
        studentsData.map(async (std) => {
          const stella = await publicClient.readContract({
            address: STELLA_CONTRACT_ADDRESS,
            abi: stellaAbi.abi,
            functionName: "balanceOf",
            args: [std.address],
          });
          const tonitrus = await publicClient.readContract({
            address: TONITRUS_CONTRACT_ADDRESS,
            abi: tonitrusAbi.abi,
            functionName: "balanceOf",
            args: [std.address],
          });
          const stellaVal = Number(formatEther(stella));
          const tonitrusVal = Number(formatEther(tonitrus));
          return {
            ...std,
            stella: stellaVal,
            tonitrus: tonitrusVal,
            effectiveStella: stellaVal - tonitrusVal,
          };
        })
      );
      updated.sort((a, b) => b.effectiveStella - a.effectiveStella);
      setStudents(updated);
    }
    fetchBalances();
  }, [publicClient]);

  return (
    <>
    <h1 style={{textAlign: "center", marginTop: "2rem"}}>Students Ranking</h1>
      <table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>Stella</th>
            <th>Tonitrus</th>
            <th>Effective Stella</th>
          </tr>
        </thead>
        <tbody>
          {students.map((std, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{std.id}</td>
              <td>{std.name}</td>
              <td>{std.stella}</td>
              <td>{std.tonitrus}</td>
              <td>{std.effectiveStella}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StudentRanking;
