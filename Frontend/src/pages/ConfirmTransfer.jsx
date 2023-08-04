import UserProfile from "../components/UserProfile";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmTransfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCard, amount, formattedRecipient } = location.state;

  const handleTransfer = () => {
    // Aquí puedes realizar las validaciones adicionales antes de enviar los datos a ConfirmTransfer
    // Por ejemplo, asegúrate de que el destinatario no tenga guiones y otros formatos incorrectos
    // Luego, envía los datos de saldo y destinatario a ConfirmTransfer
    console.log("Transferencia realizada:");
    console.log("Tarjeta seleccionada:", selectedCard);
    console.log("Monto:", amount);
    console.log("Destinatario:", formattedRecipient);
    navigate("/completed", {
      state: {
        amount,
        formattedRecipient,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Confirmar transacción</h1>

      {/* Mostrar la tarjeta seleccionada */}
      <div className="p-4 rounded border border-indigo-500 mb-6">
        <UserProfile
          card={selectedCard === 1 ? "card1" : "card2"}
          selected={true}
        />
      </div>

      {/* Mostrar los detalles de la transacción */}
      <form className="flex flex-col w-full max-w-sm">
        <div className="mb-4 flex flex-col">
          <label className="text-xl font-[Open Sans] mb-2">Monto:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={amount}
            readOnly // Hacer el campo de destinatario de solo lectura
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-xl font-[Open Sans] mb-2">Destinatario:</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={formattedRecipient} // Usar "value" para mostrar el valor formateado
            readOnly // Hacer el campo de destinatario de solo lectura
          />
        </div>
        <Link to="/completed">
          <button
            className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded"
            onClick={handleTransfer}
          >
            Confirmar Transacción
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ConfirmTransfer;
