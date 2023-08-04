import { Link } from "react-router-dom";
// import userData from "./dataBalance/databalance.json";
import { useState, useEffect } from "react";
import axios from "axios";

function Balance() {
  const [saldo, setSaldo] = useState("Cargando...");
  const [nombre, setNombre] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    axios
      .get("https://ideas-backend.vercel.app/api/users/balance", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          console.log("Datos de balance:", data);

          if (data) {
            setSaldo(data); // Establecemos solo el saldo en el estado
          } else {
            console.error(
              "Error: Datos de saldo no encontrados en la respuesta"
            );
            setSaldo("Error");
          }
        } else {
          console.error("Error al obtener los datos de balance");
          setSaldo("Error"); // Manejamos el error estableciendo el estado a "Error"
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
        setSaldo("Error"); // Manejamos el error estableciendo el estado a "Error"
      });
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setNombre(userData.nombre);
      setPicture(userData.picture);
    }

    setLoading(false); // Indicamos que ya hemos terminado de cargar los datos
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
        <div className="mb-4 flex items-center">
          <img
            className="h-32 w-32 rounded-full object-cover mr-4 border-4 border-solid border-color-button"
            src={picture}
            alt="Avatar"
          />
          <h1 className="text-2xl font-[Open Sans]">Bienvenido {nombre}</h1>
        </div>
        <div className="mb-2">
          <h1 className="text-xl font-[Open Sans]">Usuario</h1>
          <input
            className="text-center w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
            type="text"
            value={"$" + saldo} // Asigna el valor del estado al campo de entrada
            readOnly
          />
        </div>
        <div className="mt-4">
          <Link to="/history">
            <button className="bg-color-button hover:bg-color-button-hover text-white font-[Open Sans] px-4 py-2 rounded w-full">
              Historial de transacciones
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Balance;
