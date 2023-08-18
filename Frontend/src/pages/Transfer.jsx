import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import UseTransferForm from "../components/UseTransferForm";
function Transfer() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [numerosDeTarjetas, setNumerosDeTarjetas] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
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

  const handleTransfer = () => {
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
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mt-[4.6rem] mb-4">Nueva transacción</h1>
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {numerosDeTarjetas.map((tarjeta) => (
          <div
            key={tarjeta.cardNumber}
            className={`p-4 rounded border ${
              selectedCard === tarjeta.cardNumber
                ? "border-indigo-500"
                : "border-gray-400"
            }`}
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
          <label className="text-xl font-[Open Sans] mb-2">Monto:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={formattedAmount}
            onChange={handleAmountChange}
            onKeyDown={handleAmountKeyDown}
            placeholder="0" // Mostrar un cero en el campo si está vacío
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-xl font-[Open Sans] mb-2">Destinatario:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={formattedRecipient}
            onChange={handleRecipientChange}
            onKeyDown={handleRecipientKeyDown}
            maxLength="19" // Limitar la longitud máxima del input
            onPaste={(e) => {
              e.preventDefault(); // Evitar la acción de pegar predeterminada
              const text = e.clipboardData.getData("text/plain");
              // Filtrar y mantener solo los números y guiones
              const filteredText = text.replace(/[^0-9-]/g, "");
              document.execCommand("insertText", false, filteredText);
            }}
          />
        </div>
        <button
          type="button"
          className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 mb-5 rounded"
          onClick={handleTransfer}
        >
          Transferir
        </button>
      </form>
    </div>
  );
}

export default Transfer;
