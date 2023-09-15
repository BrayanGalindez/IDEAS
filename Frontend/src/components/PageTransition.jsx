import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Balance from "../pages/Balance";
import History from "../pages/History";
import Transfer from "../pages/Transfer";
import ConfirmTransfer from "../pages/ConfirmTransfer";
import CompletedTransaction from "../pages/CompletedTransaction";
import ClosedSession from "../pages/ClosedSession";
import AutoClosedSession from "../pages/AutoClosedSession";
import { SesionContext } from "../context/SesionContext";
function PageTransition() {
  const { sesionData } = useContext(SesionContext);

  const sesion = Boolean(sesionData?.token);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/closed" element={<ClosedSession />} />
        <Route path="/autoclosed" element={<AutoClosedSession />} />
        <Route element={<ProtectedRoute isAllowed={sesion} redirectTo="/" />}>
          <Route path="/balance" element={<Balance />} />
          <Route path="/history" element={<History />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/confirm" element={<ConfirmTransfer />} />
          <Route path="/completed" element={<CompletedTransaction />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default PageTransition;
