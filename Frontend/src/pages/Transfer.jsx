import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import UseTransferForm from "../components/UseTransferForm";
function Transfer() {
  const {
    amount,
    recipient,
    formattedRecipient,
    handleAmountChange,
    handleAmountKeyDown,
    handleRecipientChange,
    handleRecipientKeyDown,
  } = UseTransferForm();
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleTransfer = () => {
    console.log("Transferencia realizada:");
    console.log("Tarjeta seleccionada:", selectedCard);
    console.log("Monto:", amount);
    console.log("Destinatario:", formattedRecipient);
    navigate("/confirm", {
      state: {
        recipient,
        selectedCard,
        amount,
        formattedRecipient,
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Nueva transacción</h1>
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        {/* Tarjeta 1 */}
        <div
          className={`p-4 rounded border ${
            selectedCard === 1 ? "border-indigo-500" : "border-gray-400"
          }`}
          onClick={() => handleCardSelect(1)}
        >
          <UserProfile card="card1" selected={selectedCard === 1} />
        </div>

        {/* Tarjeta 2 */}
        <div
          className={`p-4 rounded border ${
            selectedCard === 2 ? "border-indigo-500" : "border-gray-400"
          }`}
          onClick={() => handleCardSelect(2)}
        >
          <UserProfile card="card2" selected={selectedCard === 2} />
        </div>
      </div>

      {/* Formulario de transferencia */}
      <form className="flex flex-col w-full max-w-sm">
        <div className="mb-4 flex flex-col">
          <label className="text-xl font-[Open Sans] mb-2">Monto:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={amount}
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
            value={recipient}
            onChange={handleRecipientChange}
            onKeyDown={handleRecipientKeyDown}
            maxLength="19" // Limitar la longitud máxima del input
          />
        </div>
        <button
          className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded"
          onClick={handleTransfer}
        >
          Transferir
        </button>
      </form>
    </div>
  );
}

export default Transfer;
