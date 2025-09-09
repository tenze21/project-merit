import { useGlobalContext } from "../context"

function WalletConnectButton(){
    const {connectWallet, address}= useGlobalContext();
    
    return(
        <div className="wallet-connect">
            {address? (<p className="wallet-address">{address}</p>) : (<button onClick={()=>connectWallet()}>Connect Wallet</button>)}
        </div>
    )
}

export default WalletConnectButton;