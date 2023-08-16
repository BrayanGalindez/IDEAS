import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Balance from "./pages/Balance";
//import History2 from "./pages/History2";
import History from "./pages/History";
import Transfer from "./pages/Transfer";
import ConfirmTransfer from "./pages/ConfirmTransfer";
import Footer from "./components/Footer";
import ClosedSession from "./pages/ClosedSession";
import AutoClosedSession from "./pages/AutoClosedSession";
import CompletedTransaction from "./pages/CompletedTransaction";
import { AutoLogout } from "../src/components/AutoLogout.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { SesionContext } from "./context/SesionContext";

function App() {
  const { sesionData } = useContext(SesionContext);

  const sesion = Boolean(sesionData?.token);

  return (
    <div className="app">
      {/* Autologut: la variable sessionTimeout es la cantidad de segundo para el auto logut */}

      {/* <AutoLogout sessionTimeout={20000} /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute isAllowed={sesion} redirectTo="/" />}>
          <Route path="/balance" element={<Balance />} />
          <Route path="/history" element={<History />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/confirm" element={<ConfirmTransfer />} />
          <Route path="/completed" element={<CompletedTransaction />} />
          <Route path="/closed" element={<ClosedSession />} />
          <Route path="/autoclosed" element={<AutoClosedSession />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
