import CreditCard from "./CreditCard/CreditCard";
import CreditCardPremium from "./CreditCard/CreditCardPremium";
// import datatransfer from "../pages/dataTransfer/datatransfer.json";

const UserProfile = ({
  card,
  selectedCard, // Asegúrate de pasar selectedCard como una prop
  nombre,
  numerosDeTarjetas,
  apellido,
  handleCardSelect, // Asegúrate de pasar handleCardSelect como una prop
}) => {
  const cardData = numerosDeTarjetas.find(
    (tarjeta) => tarjeta.cardNumber === card
  );

  if (!cardData) {
    return <div>Error: Tarjeta no encontrada</div>;
  }

  return (
    <div>
      {card === numerosDeTarjetas[0].cardNumber && (
        <CreditCard
          cardNumber={card}
          cardHolder={nombre + " " + apellido}
          expirationDate="06/24"
          selected={selectedCard === card}
        />
      )}

      {numerosDeTarjetas.length === 2 &&
        card === numerosDeTarjetas[1].cardNumber && (
          <CreditCardPremium
            cardNumber={card}
            cardHolder={nombre + " " + apellido}
            expirationDate="06/24"
            selected={selectedCard === card}
          />
        )}
    </div>
  );
};

export default UserProfile;
