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
      
      {/* Número de tarjeta */}
      <text x="28" y="120" fill="white" letterSpacing="4.51px"  fontFamily="Gemunu Libre, sans-serif" fontSize="20.97">
        {cardNumber.toUpperCase()}
      </text>

      {/* Titular de la tarjeta */}
      {/* <text x="20" y="170" fill="white" fontFamily="Inter" fontSize="16"> */}
      <text x="28" y="170" fill="white" letterSpacing="1.88px" fontFamily="Gemunu Libre, sans-serif" fontSize="16">
        {cardHolder.toUpperCase()}
      </text>

      {/* Fecha de expiración */}
      <text x="220" y="142" fill="white" letterSpacing="1.23px"  fontFamily="Gemunu Libre, sans-serif" fontSize="17.56">
        {expirationDate}
      </text>
    </svg>
  );
};

export default CreditCardPremium;