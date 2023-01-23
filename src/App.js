import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import { useSelector } from "react-redux";

function App() {
  const trxs = useSelector(state => state.transactions.transactions);
  console.log(trxs);
  
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
