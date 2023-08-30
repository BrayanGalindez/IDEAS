import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Spin } from "../components/Spin";
import { SesionContext } from "../context/SesionContext";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate(); // Obtiene la función navigate
  const { login, error, load, setError } = useContext(SesionContext);
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cardNumber, setCardNumber] = useState(""); // Estado para almacenar el número de tarjeta
  const [pin, setPin] = useState(""); // Estado para almacenar el pin

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el envío automático del formulario
    await login(cardNumber, pin);
    navigate("/balance");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
    >
      <div className="my-40">
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-[24.5rem] rounded overflow-hidden shadow-lg p-6 bg-white">
          <img className="h-20 mx-auto" src={logo} alt="Logo" />
          <h1 className="text-3xl font-bold text-center mt-4">Saint Patrick</h1>
          <form className="mt-6">
            <h1 className="text-xl font-[Open Sans] mb-2">Usuario</h1>
            <input
              onClick={() => {
                setError("");
                setLocalError(""); // Limpiar localError al hacer clic en el input
              }}
              className={
                !error && !localError // Agregar una condición para localError
                  ? "w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
                  : "w-full px-4 py-2 rounded border border-red-700"
              }
              type="text"
              value={cardNumber}
              onChange={(e) => {
                setError("");
                setLocalError(""); // Limpiar localError al cambiar el valor del input
                setCardNumber(e.target.value);
              }}
            />
            <h1 className="text-xl font-[Open Sans] mt-4 mb-2">Pin</h1>
            <div className="relative">
              <input
                onClick={() => {
                  setError("");
                  setLocalError(""); // Limpiar localError al hacer clic en el input
                }}
                className={
                  !error && !localError
                    ? "w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
                    : "w-full px-4 py-2 rounded border border-red-700"
                }
                type={showPassword ? "text" : "password"}
                value={pin} // Asigna el valor del estado al campo de entrada
                onChange={(e) => {
                  setError("");
                  setLocalError(""); // Limpiar localError al cambiar el valor del input
                  setPin(e.target.value);
                }}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-10"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <AiFillEye className="h-5 w-5 text-gray-400" />
                ) : (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            <p className="text-red-600 font-[Open Sans] text-sm mt-4 flex justify-center">
              {error}
            </p>
            {load === true ? <Spin /> : null}

            {pin !== "" && cardNumber !== "" ? (
              <button
                onClick={handleLogin}
                className="font-[Open Sans] text-black bg-color-button hover:bg-color-button-hover rounded-md px-6 py-2 mt-6 w-full"
                type="submit"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={() => {
                  if (pin === "" || cardNumber === "") {
                    setLocalError("No se puede dejar campos vacíos");
                  }
                }}
                className="font-[Open Sans] text-black bg-color-button-hover rounded-md px-6 py-2 mt-6 w-full"
                type="button"
              >
                Continuar
              </button>
            )}

            {localError && (
              <p className="text-red-600 font-[Open Sans] text-sm mt-2 text-center">
                {localError}
              </p>
            )}
            <p className="text-gray-600 font-[Open Sans] text-sm mt-6">
              Al continuar, confirmo que he leído y acepto los{" "}
              <span className="text-color-terms font-[Open Sans] cursor-pointer">
                Términos y condiciones
              </span>{" "}
              y{" "}
              <span className="text-color-terms font-[Open Sans] cursor-pointer">
                Políticas de privacidad
              </span>
            </p>
          </form>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Login;
