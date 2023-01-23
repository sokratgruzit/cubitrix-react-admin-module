import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import axios from "./api/axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function fetchData() {
      await axios.post("/accounts/filter", {
        address: "0xC5594070o0o68d9c6597A0160c72CD6ceC2EDd5a",
        account_type: "user_current",
        fuck: "bla"
      });
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
      <Link to="/">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
    </div>
  );
}

export default App;
