import CreditCard from "./CreditCard/CreditCard";
import CreditCardPremium from "./CreditCard/CreditCardPremium";
import datatransfer from "../pages/dataTransfer/datatransfer.json";

const UserProfile = ({ card }) => {
  const cardData = datatransfer[card];

  if (!cardData) {
    return <div>Error: Tarjeta no encontrada</div>;
  }

  // Comprobamos si el usuario tiene la tarjeta normal y/o premium
  const hasNormalCard = card === "card1"; // Cambiar "card1" por el nombre de clave correspondiente en tu JSON
  const hasPremiumCard = card === "card2"; // Cambiar "card2" por el nombre de clave correspondiente en tu JSON

  return (
    <div>
      {/* Renderizamos la tarjeta de crédito normal si el usuario tiene la tarjeta normal */}
      {hasNormalCard && (
        <CreditCard
          cardNumber={cardData.cardNumber}
          cardHolder={cardData.cardHolder}
          expirationDate={cardData.expirationDate}
        />
      )}

      {/* Renderizamos la tarjeta de crédito premium si el usuario tiene la tarjeta premium */}
      {hasPremiumCard && (
        <CreditCardPremium
          cardNumber={cardData.cardNumber}
          cardHolder={cardData.cardHolder}
          expirationDate={cardData.expirationDate}
        />
      )}
    </div>
  );
};

export default UserProfile;