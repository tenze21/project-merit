import { useGlobalContext } from "../context"

function WalletConnectButton(){
    const {connectWallet, address}= useGlobalContext();
    
    return(
        <>
            {address? (<button disabled>{address}</button>) : (<button onClick={()=>connectWallet()}>Connect Wallet</button>)}
        </>
    )
}

export default WalletConnectButton;