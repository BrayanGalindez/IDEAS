import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Balance from "./pages/Balance";
//import History2 from "./pages/History2";
import History from "./pages/History";
import Transfer from "./pages/Transfer";
import ConfirmTransfer from "./pages/ConfirmTransfer";
import Footer from "./components/Footer";
import ClosedSession from "./pages/ClosedSession";
import CompletedTransaction from "./pages/CompletedTransaction";
import { AutoLogout } from '../src/components/AutoLogout.jsx'
function App() {
  return (
    <div className="app">
        <Router>
          {/* Autologut: la variable sessionTimeout es la cantidad de segundo para el auto logut */}
          <AutoLogout sessionTimeout={20000}/>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/history" element={<History />} />
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
