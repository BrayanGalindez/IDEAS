import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Balance from "./pages/Balance";
import History from "./pages/History";
import History2 from "./pages/History2";
import Transfer from "./pages/Transfer";
import UserProfile from "./components/UserProfile";
import ConfirmTransfer from "./pages/ConfirmTransfer";
import Footer from "./components/Footer";
import Table from "./components/Table";
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
            <Route path="/historial" element={<History />} />
            <Route path="/historial2" element={<History2 />} />
            {/* <Route path="/tabla" element={<Table />} /> */}
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/usuario" element={<UserProfile />} />
            <Route path="/confirmacion" element={<ConfirmTransfer/>} />
            <Route path="/cerrar" element={<ClosedSession/>} />
            <Route path="/finalizada" element={<CompletedTransaction/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
