import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SesionContext } from "../context/SesionContext";
import validateLogin from "../utils/validateLogin";
import { formatCardNumber, formatPinNumber } from "../utils/formatLogin";

const Login = () => {
  const { login, sesionError } = useContext(SesionContext);
  const navigate = useNavigate(); // Obtiene la función navigate
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    cardNumber: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "cardNumber") {
      setFormData({
        ...formData,
        [name]: formatCardNumber(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: formatPinNumber(value),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Eliminar los guiones antes de enviar el cardNumber al backend
      const cardNumberWithoutHyphens = formData.cardNumber.replace(/-/g, "");

      await login(cardNumberWithoutHyphens, formData.pin);

      return navigate("/balance");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-28 mb-20">
      <div className="max-w-[24.5rem] rounded overflow-hidden shadow-lg p-6 bg-white">
        <img className="h-20 mx-auto" src={logo} alt="Logo" />
        <h1 className="text-3xl font-bold text-center mt-4">Saint Patrick</h1>
        <form onSubmit={handleLogin} className="mt-6">
          <h1 className="text-xl font-[Open Sans] mb-2">Usuario</h1>
          <input
            className={`w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500 ${errors.cardNumber && "border border-red-700"}`}
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
          <h1 className="text-xl font-[Open Sans] mt-4 mb-2">Pin</h1>
          <div className="relative">
            <input
              className={`w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500 ${errors.pin && "border border-red-700"}`}
              type={showPassword ? "text" : "password"}
              name="pin"
              value={formData.pin}
              onChange={handleInputChange}
            />
            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-10"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <AiFillEye className="h-5 w-5 text-gray-400" />
              ) : (
                <AiFillEyeInvisible className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
          <p className="text-red-700 text-[0.9rem] mt-3 text-center">
            {sesionError?.message || errors?.cardNumber || errors?.pin}
          </p>
          <button
            className="font-[Open Sans] text-black bg-color-button hover:bg-color-button-hover rounded-full px-6 py-2 mt-6 w-full"
            type="submit"
          >
            Iniciar sesión
          </button>
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
  );
};

export default Login;
