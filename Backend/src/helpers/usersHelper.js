const { UsersObject } = require('../dao/usersDao')

exports.checkUserTransactionHelper = async (req) => {
  try {

    // Obtengo datos de usuarios
    const userData = await UsersObject.getUserByCardNumber(req.body.tarjeta_origen)
    const userRecipientData = await UsersObject.getUserByCardNumber(req.body.tarjeta_destino)

    // Estan correctos los datos de origen y el usuario esta autorizado?
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
    if ( !req.body.monto || req.body.monto < 0 || req.body.monto > userData.saldo) {
      return {
        message: 'Monto no valido.',
        valid: false
      }
    }

    // Estan correctos los datos de destino?
    if (!userRecipientData || userRecipientData.id === req.user) {
      return {
        message: 'Destinatario no valido.',
        valid: false
      }
    }
    
    return {
      message: 'Transacción valida.',
      valid: true,
      userData,
      userRecipientData
    }

  } catch (error) {
    console.log(error)
    throw error
  }
}