import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
function Transfer() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const navigate = useNavigate(); // Inicializa useHistory

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleTransfer = () => {
    // Aquí puedes realizar la lógica de la transferencia
    // Por ejemplo, enviar los datos al backend para procesar la transferencia
    console.log("Transferencia realizada:");
    console.log("Tarjeta seleccionada:", selectedCard);
    console.log("Monto:", amount);
    console.log("Destinatario:", recipient);
    // Navegar a la página de confirmación
    navigate("/confirmacion");
  };
  const handleAmountChange = (e) => {
    // Remover todos los caracteres no numéricos del valor ingresado
    const value = e.target.value.replace(/\D/g, "");

    // Aplicar el formato de dinero con puntos (separar cada tres dígitos con un punto)
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedValue = "." + formattedValue; // Agregar un punto cada tres dígitos
      }
      formattedValue = value[value.length - 1 - i] + formattedValue;
    }

    // Limitar el monto máximo a 5.000.000
    if (value > 5000000) {
      formattedValue = "5.000.000";
    }

    setAmount(formattedValue);
  };

  const handleAmountKeyDown = (e) => {
    // Permitir solo ingresar números y puntos
    if (
      !(
        (
          (e.key >= "0" && e.key <= "9") || // Números
          e.key === "Backspace" || // Retroceso
          e.key === "Delete" || // Suprimir
          e.key === "ArrowLeft" || // Flecha izquierda
          e.key === "ArrowRight" || // Flecha derecha
          e.key === "."
        ) // Guion
      )
    ) {
      e.preventDefault();
    }
  };
  const handleRecipientChange = (e) => {
    // Remover todos los caracteres no numéricos del valor ingresado
    const value = e.target.value.replace(/\D/g, "");

    // Aplicar el formato de tarjeta (16 números separados por guiones)
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += "-";
      }
      formattedValue += value[i];
    }

    setRecipient(formattedValue);
  };

  const handleRecipientKeyDown = (e) => {
    // Permitir solo ingresar números y guiones
    if (
      !(
        (
          (e.key >= "0" && e.key <= "9") || // Números
          e.key === "Backspace" || // Retroceso
          e.key === "Delete" || // Suprimir
          e.key === "ArrowLeft" || // Flecha izquierda
          e.key === "ArrowRight" || // Flecha derecha
          e.key === "-"
        ) // Guion
      )
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-40">
      <h1 className="text-3xl font-[Open Sans] mb-4">Nueva transacción</h1>
      <div className="flex justify-center space-x-6 mb-6">
        {/* Tarjeta 1 */}
        <div
          className={`p-4 rounded border ${
            selectedCard === 1 ? "border-indigo-500" : "border-gray-400"
          }`}
          onClick={() => handleCardSelect(1)}
        >
          <UserProfile card="card1" />
        </div>

        {/* Tarjeta 2 */}
        <div
          className={`p-4 rounded border ${
            selectedCard === 2 ? "border-indigo-500" : "border-gray-400"
          }`}
          onClick={() => handleCardSelect(2)}
        >
          <UserProfile card="card2" />
        </div>
      </div>

      {/* Formulario de transferencia */}
      <form className="flex flex-col ">
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
          className="w-full bg-color-theme-hover hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded"
          onClick={handleTransfer}
        >
          Transferir
        </button>
      </form>
    </div>
  );
}

export default Transfer;
