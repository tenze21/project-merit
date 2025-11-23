import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

function Navbar(){
    const {activeNav}= useGlobalContext();  
    return(
      <nav>
        <ul>
            <li><Link to="/" className={activeNav === 'ranking'? "active":""}>Ranking</Link></li>
            <li><Link to="/award" className={activeNav === 'award'? "active":""}>Award</Link></li>
            <li><Link to="/mint-burn" className={activeNav === 'mint-burn'? "active":""}>Mint/Burn</Link></li>
        </ul>
      </nav>
    );
}

export default Navbar;