import logo from "../assets/logo.png";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
        <img className="h-20 mx-auto" src={logo} alt="Logo" />
        <h1 className="text-3xl font-bold text-center mt-4">
          Saint Patrick
        </h1>
        <form className="mt-6">
          <h1 className="text-xl font-[Open Sans] mb-2">Usuario</h1>
          <input
            className="w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
            type="text"
          />
          <h1 className="text-xl font-[Open Sans] mt-4 mb-2">Pin</h1>
          <div className="relative">
            <input
              className="w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
              type={showPassword ? "text" : "password"}
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
          <button className=" font-[Open Sans] text-black bg-color-button hover:bg-color-button-hover rounded-full px-6 py-2 mt-6 w-full">
            Continuar
          </button>
          <p className="text-gray-600 font-[Open Sans] text-sm mt-4">
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
