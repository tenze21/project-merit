import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransferTokenPage from "./pages/TransferTokenPage";
import MintBurnPage from "./pages/MintBurnPage";
import RankingPage from "./pages/RankingPage";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" index="true" element={<RankingPage/>}/>
          <Route path="/mint-burn" element={<MintBurnPage/>}/>
          <Route path="/award" element={<TransferTokenPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
