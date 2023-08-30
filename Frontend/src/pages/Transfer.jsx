import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from "../components/Spin";
import UserProfile from "../components/UserProfile";
import UseTransferForm from "../components/UseTransferForm";
import axios from "axios";
import { motion } from "framer-motion";

function Transfer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [numerosDeTarjetas, setNumerosDeTarjetas] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false); // Estado para el loading
  const [saldos, setSaldos] = useState([]);
  const [localError, setLocalError] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setName(userData.nombre);
      setLastname(userData.apellido);
      const numerosTarjetas = userData.cards.map((tarjeta) => ({
        cardNumber: tarjeta.numero_tarjeta,
      }));
      setNumerosDeTarjetas(numerosTarjetas);
    }
    const jwtToken = localStorage.getItem("jwtToken");
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
  }, [location.state]);

  const {
    amount,
    recipient,
    formattedRecipient,
    formattedAmount,
    handleAmountChange,
    handleAmountKeyDown,
    handleRecipientChange,
    handleRecipientKeyDown,
  } = UseTransferForm();

  const handleCardSelect = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  const handleTransfer = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    try {
      // Realizar la solicitud POST al backend con los datos necesarios
      const response = await axios.post(
        "https://ideas-backend.vercel.app/api/transactions/verify",
        {
          monto: amount,
          tarjeta_origen: selectedCard,
          tarjeta_destino: recipient,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        // console.log(response);
        const { recipient_user_name, recipient_user_last_name } = response.data;
        // Navegar a la página de confirmación con los datos necesarios
        navigate("/confirm", {
          state: {
            saldos,
            recipient,
            selectedCard,
            amount,
            formattedRecipient,
            formattedAmount,
            numerosDeTarjetas,
            name,
            lastname,
            nameReceiver: recipient_user_name,
            lastNameReceiver: recipient_user_last_name,
          },
        });
      }
    } catch (error) {
      // console.error("Error en la solicitud de transacción:", error);
      if (error.response) {
        // console.log("Detalles del error:", error.response.data);
        setError(error.response.data.message); // Actualiza el mensaje de error
      } else {
        setError("Error en la solicitud de transacción"); // Otro tipo de error
      }
    }
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="my-40">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-normal font-[Open Sans] text-center">
            Nueva transacción
          </h1>
          {!selectedCard && <p>Selecciona la tarjeta</p>}
          <div className="flex flex-wrap justify-center md:space-x-4 m-5">
            {numerosDeTarjetas.map((tarjeta) => (
              <div
                key={tarjeta.cardNumber}
                className={`cursor-pointer rounded-xl p-4 border-2 ${
                  (error || localError) && selectedCard === tarjeta.cardNumber
                    ? "border-red-700"
                    : selectedCard === tarjeta.cardNumber
                    ? "border-blue-500"
                    : "border-gray-300"
                } ${
                  selectedCard === tarjeta.cardNumber
                    ? "cursor-pointer border-2 border-blue-500 rounded-xl p-4"
                    : "cursor-pointer grayscale-[100%] hover:grayscale-[0%] ease-in duration-200 justify-center"
                }`}
                onClick={() => {
                    handleCardSelect(tarjeta.cardNumber);
                    setError("");
                    setLocalError(""); // Limpiar el error al seleccionar una tarjeta
                  
                }}
              >
                <UserProfile
                  card={tarjeta.cardNumber}
                  selectedCard={selectedCard}
                  nombre={name}
                  numerosDeTarjetas={numerosDeTarjetas}
                  apellido={lastname}
                  handleCardSelect={handleCardSelect}
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

          {/* Formulario de transferencia */}
          <form className="flex flex-col w-full max-w-sm">
            <div className="mb-4 flex flex-col">
              {load === true ? <Spin /> : ""}
              <label className="text-xl font-[Open Sans] mb-2">Monto:</label>
              <input
                className={
                  !error && !localError
                    ? "w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
                    : "w-full px-4 py-2 rounded border border-red-700"
                }
                //   className="w-full px-4 py-2 border-2 rounded focus:outline-none focus:border-indigo-500"
                type="text"
                value={formattedAmount}
                onChange={handleAmountChange}
                onKeyDown={handleAmountKeyDown}
                onClick={() => {
                  setError("");
                  setLocalError(""); // Limpiar localError al hacer clic en el input
                }}
                placeholder="0" // Mostrar un cero en el campo si está vacío
              />
            </div>

            <label className="text-xl font-[Open Sans] mb-2">
              Destinatario:
            </label>
            <input
              className={
                !error && !localError
                  ? "w-full px-4 py-2 rounded border border-gray-400 focus:border-indigo-500 outline-none focus:ring focus:ring-indigo-500"
                  : "w-full px-4 py-2 rounded border border-red-700"
              }
              // className="w-full px-4 py-2 border-2 rounded focus:outline-none focus:border-indigo-500"
              type="text"
              value={formattedRecipient}
              onChange={handleRecipientChange}
              onKeyDown={handleRecipientKeyDown}
              onClick={() => {
                setError("");
                setLocalError(""); // Limpiar localError al hacer clic en el input
              }}
              maxLength="19" // Limitar la longitud máxima del input
              onPaste={(e) => {
                e.preventDefault(); // Evitar la acción de pegar predeterminada
                const text = e.clipboardData.getData("text/plain");
                // Filtrar y mantener solo los números y guiones
                const filteredText = text.replace(/[^0-9-]/g, "");
                document.execCommand("insertText", false, filteredText);
              }}
            />
            <p className="text-red-600 font-[Open Sans] text-sm mt-4 flex justify-center">
              {error}
            </p>

            {formattedAmount !== "" && formattedRecipient !== "" ? (
              selectedCard !== null ? (
                <button
                  type="button"
                  className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 my-2 rounded-md"
                  onClick={handleTransfer}
                >
                  Transferir
                </button>
              ) : (
                <button
                  onClick={() => {
                    setLocalError("Selecciona una tarjeta");
                  }}
                  className="font-[Open Sans] text-black bg-color-button-hover rounded-md px-6 py-2 mt-6 w-full"
                  type="button"
                >
                  Continuar
                </button>
              )
            ) : (
              <button
                onClick={() => {
                  setLocalError("No se puede dejar campos vacíos");
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
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Transfer;
