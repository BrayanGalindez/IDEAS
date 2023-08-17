export const formatCardNumber = (value) => {
  const formattedCardValue = value
    .replace(/\D/g, "") // Eliminar caracteres no numéricos
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1-"); // Agregar guiones después de cada grupo de 4 dígitos

  return formattedCardValue;
};

export const formatPinNumber = (value) => {
  const formattedPinValue = value
  .replace(/\D/g, "")
  .replace(/^\s+|\s+$/g, "") // Eliminar espacios
  .slice(0, 4);

  return formattedPinValue
}