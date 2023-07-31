import creditcard from "./creditcardpremium.svg"; // Importa el
const CreditCardPremium = ({ cardNumber, cardHolder, expirationDate }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="200"
      viewBox="0 0 300 200"
      style={{ borderRadius: "15px" }}
    >
      {/* Rectángulo que representa la tarjeta */}
      {/* <rect width="100%" height="100%" fill="#1E1E1E" rx="15" /> */}
      <image href={creditcard} width="100%" height="100%" rx="15" />
      {/* Logo de la marca de la tarjeta */}
      <text x="20" y="40" fill="white" fontSize="16">
        VISA
      </text>

      {/* Número de tarjeta */}
      <text x="30" y="120" fill="white" fontFamily="Gemunu Libre" fontSize="16">
        {cardNumber}
      </text>

      {/* Titular de la tarjeta */}
      <text x="20" y="170" fill="white" fontFamily="Gemunu Libre" fontSize="16">
        {cardHolder}
      </text>

      {/* Fecha de expiración */}
      <text x="220" y="142" fill="white" fontFamily="Gemunu Libre" fontSize="16">
        {expirationDate}
      </text>
    </svg>
  );
};

export default CreditCardPremium;