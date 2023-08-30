import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import UserProfile from "../components/UserProfile";

function Balance() {
  const navigate = useNavigate();
  const [saldos, setSaldos] = useState([]);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [numerosDeTarjetas, setNumerosDeTarjetas] = useState([]);
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setName(userData.nombre);
      setLastname(userData.apellido);
      const numerosTarjetas = userData.cards.map((tarjeta) => ({
        cardNumber: tarjeta.numero_tarjeta,
      }));
      setNumerosDeTarjetas(numerosTarjetas);
      setPicture(userData.picture);
    }

    axios
      .get("https://ideas-backend.vercel.app/api/users/cardsbalance", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;

          if (data) {
            setSaldos(data); // Establecemos solo el saldo en el estado
          } else {
            // console.error(
            //   "Error: Datos de saldo no encontrados en la respuesta"
            // );
            setSaldos("Error");
          }
        }
      })
      .catch((error) => {
        // console.error("Error de red:", error);
        setSaldos("Error"); // Manejamos el error estableciendo el estado a "Error"
      });

    setLoading(false); // Indicamos que ya hemos terminado de cargar los datos
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="my-40">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4">
            <img
              className="h-32 w-32 rounded-full object-cover border-4 border-solid border-color-button"
              src={picture}
              alt="Avatar"
            />
            <div>
              <h1 className="text-2xl font-normal font-[Open Sans] text-center">
                Bienvenido{" "}
                <span className="block text-2xl">
                  {name} {lastname}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:space-x-4 m-5">
            {numerosDeTarjetas.map((tarjeta) => (
              <div key={tarjeta.cardNumber} className="bg-white rounded-xl p-4">
                <UserProfile
                  card={tarjeta.cardNumber}
                  nombre={name}
                  numerosDeTarjetas={numerosDeTarjetas}
                  apellido={lastname}
                />
                {saldos.map(
                  (saldo, index) =>
                    saldo.numero_tarjeta === tarjeta.cardNumber && (
                      <div key={index} className="text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-11/12">
                            <p className="text-black font-[Open Sans] mb-1 text-left">
                              Saldo
                            </p>
                            <input
                              className="mt-2 px-2 py-1 border border-gray-300 rounded w-full text-right"
                              placeholder={`Saldo de ${tarjeta.cardNumber}`}
                              value={`$${saldo.saldo}`}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              className="bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-4 py-2 rounded w-full"
              onClick={() => {
                navigate("/history");
              }}
            >
              Historial de transacciones
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Balance;
