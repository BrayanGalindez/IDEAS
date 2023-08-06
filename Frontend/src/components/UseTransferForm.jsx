import { useState } from "react";

const UseTransferForm = () => {
  const [amount, setAmount] = useState("");
  const [formattedRecipient, setFormattedRecipient] = useState(""); // Estado para mostrar el valor formateado en el input
  const [recipient, setRecipient] = useState("");

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
        (e.key >= "0" && e.key <= "9") || // Números
        e.key === "Backspace" || // Retroceso
        e.key === "Delete" || // Suprimir
        e.key === "ArrowLeft" || // Flecha izquierda
        e.key === "ArrowRight" || // Flecha derecha
        e.key === "."
      ) // Punto
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

    // Actualizar el estado del destinatario sin guiones
    setRecipient(value);

    // Actualizar el estado de formattedRecipient para mostrar los guiones en el input
    setFormattedRecipient(formattedValue);
  };

  const handleRecipientKeyDown = (e) => {
    // Permitir solo ingresar números y guiones
    if (
      !(
        (e.key >= "0" && e.key <= "9") || // Números
        e.key === "Backspace" || // Retroceso
        e.key === "Delete" || // Suprimir
        e.key === "ArrowLeft" || // Flecha izquierda
        e.key === "ArrowRight" || // Flecha derecha
        e.key === "-" || // Guion
        e.key === "v" && (e.metaKey || e.ctrlKey) // Pegar (Ctrl + v o Command + v)
      ) // Guion
    ) {
      e.preventDefault();
    }
  };

  return {
    amount,
    recipient,
    formattedRecipient,
    handleAmountChange,
    handleAmountKeyDown,
    handleRecipientChange,
    handleRecipientKeyDown,
  };
};

export default UseTransferForm;
