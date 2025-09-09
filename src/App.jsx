import WalletConnectButton from "./Components/WalletConnectButton";
import TransferToken from "./Components/TransferToken";
import StudentRanking from "./Components/StudentRanking";
import { useGlobalContext } from "./context";
import "./App.css";

function App() {
  const { stellaBalance, tonitrusBalance, walletClient } = useGlobalContext();
  return (
    <div>
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
      <TransferToken />
      <StudentRanking/>
    </div>
  );
}

export default App;
