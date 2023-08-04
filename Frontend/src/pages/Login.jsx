import logo from "../assets/logo.png";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa la librería Axios

const Login = () => {
  const navigate = useNavigate(); // Obtiene la función navigate
  const [showPassword, setShowPassword] = useState(false);
  const [cardNumber, setCardNumber] = useState(""); // Estado para almacenar el número de tarjeta
  const [pin, setPin] = useState(""); // Estado para almacenar el pin

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el envío automático del formulario
  
    try {
      // Realizar una solicitud POST a la API de login con Axios
      const response = await axios.post(
        "https://ideas-backend.vercel.app/api/users/login",
        {
          cardNumber: cardNumber, // Usa el estado para enviar el número de tarjeta
          pin: pin, // Usa el estado para enviar el pin
        }
      );
  
      // Verificar la respuesta del servidor
      if (response.status === 200) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí
        const userData = response.data[0]; // Esto contiene los datos del usuario, como nombre, apellido, saldo, etc.
  
        // Guardar los datos en el LocalStorage
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("jwtToken", userData.jwtToken);
  
        console.log("Datos de usuario:", userData);
  
        // Redirigir al usuario a la ruta "/balance"
        navigate("/balance");
      } else {
        // La solicitud no fue exitosa, puedes manejar el error aquí
        console.error("Error al obtener los datos de usuarios");
      }
    } catch (error) {
      // Ocurrió un error al realizar la solicitud, puedes manejarlo aquí
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
        <img className="h-20 mx-auto" src={logo} alt="Logo" />
        <h1 className="text-3xl font-bold text-center mt-4">Saint Patrick</h1>
        <form className="mt-6">
          <h1 className="text-xl font-[Open Sans] mb-2">Usuario</h1>
          <input
            className="w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
            type="text"
            value={cardNumber} // Asigna el valor del estado al campo de entrada
            onChange={(e) => setCardNumber(e.target.value)} // Actualiza el estado cuando el campo cambia
          />
          <h1 className="text-xl font-[Open Sans] mt-4 mb-2">Pin</h1>
          <div className="relative">
            <input
              className="w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
              type={showPassword ? "text" : "password"}
              value={pin} // Asigna el valor del estado al campo de entrada
              onChange={(e) => setPin(e.target.value)} // Actualiza el estado cuando el campo cambia
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
          <button
            onClick={handleLogin}
            className="font-[Open Sans] text-black bg-color-button hover:bg-color-button-hover rounded-full px-6 py-2 mt-6 w-full"
            type="submit" // Agrega el tipo de botón "submit"
          >
            Iniciar sesión
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
