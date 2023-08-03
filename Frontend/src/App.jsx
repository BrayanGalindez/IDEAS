import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Balance from "./pages/Balance";
import History2 from "./pages/History2";
import Transfer from "./pages/Transfer";
import ConfirmTransfer from "./pages/ConfirmTransfer";
import Footer from "./components/Footer";
import ClosedSession from "./pages/ClosedSession";
import CompletedTransaction from "./pages/CompletedTransaction";
function App() {
  return (
    <div className="app">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/history" element={<History2 />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/confirm" element={<ConfirmTransfer/>} />
            <Route path="/closed" element={<ClosedSession/>} />
            <Route path="/completed" element={<CompletedTransaction/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
