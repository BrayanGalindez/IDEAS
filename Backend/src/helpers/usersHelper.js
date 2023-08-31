const { CardsObject } = require('../dao/cardsDao')
const { UsersObject } = require('../dao/usersDao')

exports.checkUserTransactionHelper = async (req) => {
  try {
    
    // No se permiten transacciones a la misma tarjeta
    if (req.body.tarjeta_origen === req.body.tarjeta_destino) {
      return {
        message: 'No se permiten transacciones a la misma tarjeta.',
        valid: false
      }
    }
  
    // Estan correctos los datos de origen y el usuario esta autorizado?
    const userData = await UsersObject.getUserByCardNumber(req.body.tarjeta_origen)
    if (!userData) {
      return {
        message: 'Numero de tarjeta o usuario no valido.',
        valid: false
      }
    }
    if (userData.id !== req.user) {
      return {
        message: 'Usuario no autorizado.',
        valid: false}
      }
    
    // Monto de la transaccion es positivo y tiene saldo?
    const cardBalance = await CardsObject.getCardBalance(req.body.tarjeta_origen)
    if ( !req.body.monto || req.body.monto < 1 || parseFloat(req.body.monto) > parseFloat(cardBalance)) {
      return {
        message: 'Monto no valido.',
        valid: false
      }
    }

    // Estan correctos los datos de destino?
    const userRecipientData = await UsersObject.getUserByCardNumber(req.body.tarjeta_destino)
    if (!userRecipientData) {
      return {
        message: 'Destinatario no valido.',
        valid: false
      }
    }
    
    return {
      message: 'Transacción valida.',
      valid: true,
      userData,
      cardBalance,
      userRecipientData
    }

  } catch (error) {
    throw error
  }
}