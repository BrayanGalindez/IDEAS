import React from "react";
import UserProfile from "../components/UserProfile";

const ConfirmTransfer = ({
  selectedCard,
  amount,
  recipient,
  onConfirm,
}) => {
  return (
    <div className="flex flex-col items-center mt-10 mb-40">
      <h1 className="text-3xl font-[Open Sans] mb-4">Confirmar transacción</h1>

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
      <div className="mb-4 flex flex-col">
        <p className="text-xl font-[Open Sans] mb-2">Monto: ${amount}</p>
      </div>
      <div className="mb-4 flex flex-col">
        <p className="text-xl font-[Open Sans] mb-2">
          Destinatario: {recipient}
        </p>
      </div>

      {/* Botón para confirmar */}
      <button
        className="bg-color-theme-hover hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded"
        onClick={onConfirm}
      >
        Confirmar Transacción
      </button>
    </div>
  );
};

export default ConfirmTransfer;