import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "../components/Spin";
import UserProfile from "../components/UserProfile";
import UseTransferForm from "../components/UseTransferForm";
import axios from "axios";
function Transfer() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [numerosDeTarjetas, setNumerosDeTarjetas] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false); // Estado para el loading
  const navigate = useNavigate();

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
  }, []);

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mt-[4.6rem] mb-4">Nueva transacción</h1>
      {!selectedCard && <p>Selecciona la tarjeta</p>}
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {numerosDeTarjetas.map((tarjeta) => (
          <div
            key={tarjeta.cardNumber}
            className={
              selectedCard === tarjeta.cardNumber
                ? "cursor-pointer"
                : `cursor-pointer grayscale-[100%] hover:grayscale-[0%] ease-in duration-200`
            }
            onClick={() => handleCardSelect(tarjeta.cardNumber)}
          >
            <UserProfile
              card={tarjeta.cardNumber}
              selectedCard={selectedCard}
              nombre={name}
              numerosDeTarjetas={numerosDeTarjetas}
              apellido={lastname}
              handleCardSelect={handleCardSelect}
            />
          </div>
        ))}
      </div>

      {/* Formulario de transferencia */}
      <form className="flex flex-col w-full max-w-sm">
        <div className="mb-4 flex flex-col">
          {load === true ? <Spin /> : ""}
          <label className="text-xl font-[Open Sans] mb-2">Monto:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={formattedAmount}
            onChange={handleAmountChange}
            onKeyDown={handleAmountKeyDown}
            onClick={() => {
              setError("");
            }}
            placeholder="0" // Mostrar un cero en el campo si está vacío
          />
        </div>
        <div className={`mb-4 flex flex-col ${error ? 'border-red-500' : ''}`}>
          <label className="text-xl font-[Open Sans] mb-2">Destinatario:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={formattedRecipient}
            onChange={handleRecipientChange}
            onKeyDown={handleRecipientKeyDown}
            onClick={() => {
              setError("");
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
        </div>
        {formattedAmount !== "" &&
        formattedRecipient !== "" &&
        selectedCard !== null ? (
          <button
            type="button"
            className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded"
            onClick={handleTransfer}
          >
            Transferir
          </button>
        ) : (
          <button
            type="button"
            className="w-ful bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded"
            onClick={handleTransfer}
            disabled
          >
            Transferir
          </button>
        )}
      </form>
    </div>
  );
}

export default Transfer;
