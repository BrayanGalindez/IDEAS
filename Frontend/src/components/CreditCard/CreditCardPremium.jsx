// import creditcard from "./creditcardpremium.svg";
import creditcard from "./CardPremium.png";
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
      <text x="28" y="120" fill="white" letterSpacing="1.88px" fontSize="20.97">
        <tspan fontFamily="Gemunu Libre, sans-serif">
          {cardNumber.toUpperCase().substr(0, 4)}
        </tspan>
        <tspan dx="0.5em" fontFamily="Gemunu Libre, sans-serif">
          {cardNumber.toUpperCase().substr(4, 4)}
        </tspan>
        <tspan dx="0.5em" fontFamily="Gemunu Libre, sans-serif">
          {cardNumber.toUpperCase().substr(8, 4)}
        </tspan>
        <tspan dx="0.5em" fontFamily="Gemunu Libre, sans-serif">
          {cardNumber.toUpperCase().substr(12, 4)}
        </tspan>
      </text>

      {/* Titular de la tarjeta */}
      {/* <text x="20" y="170" fill="white" fontFamily="Inter" fontSize="16"> */}
      <text x="28" y="170" fill="white" letterSpacing="1.88px" fontFamily="Gemunu Libre, sans-serif" fontSize="16">
        {cardHolder.toUpperCase()}
      </text>
    </svg>
  );
};

export default CreditCardPremium;