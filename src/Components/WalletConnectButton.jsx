import { useGlobalContext } from "../context"

function WalletConnectButton(){
    const {connectWallet, address}= useGlobalContext();
    
    return(
        <div className="wallet-connect">
            {address? (<button disabled>{address}</button>) : (<button onClick={()=>connectWallet()}>Connect Wallet</button>)}
        </div>
    )
}

export default WalletConnectButton;