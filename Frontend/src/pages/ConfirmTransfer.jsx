import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";

const ConfirmTransfer = ({ selectedCard, amount, recipient, onConfirm }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Confirmar transacción</h1>

      {/* Mostrar la tarjeta seleccionada */}
      <div className="p-4 rounded border border-indigo-500 mb-6">
        {selectedCard === 1 ? (
          <UserProfile
            cardNumber="**** **** **** 1234"
            cardHolder="John Doe"
            expirationDate="12/23"
          />
        ) : (
          <UserProfile
            cardNumber="**** **** **** 5678"
            cardHolder="Jane Smith"
            expirationDate="09/24"
          />
        )}
      </div>

      {/* Mostrar los detalles de la transacción */}
      <form className="flex flex-col w-full max-w-sm">
        <div className="mb-4 flex flex-col">
          <label className="text-xl font-[Open Sans] mb-2">Monto:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={amount}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-xl font-[Open Sans] mb-2">Destinatario:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={recipient}
            maxLength="19" // Limitar la longitud máxima del input
          />
        </div>
        <Link to="/finalizada">
          <button className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded">
            Confirmar Transacción
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ConfirmTransfer;
