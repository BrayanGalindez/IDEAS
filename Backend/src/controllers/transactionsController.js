const { TransactionsObject } = require('../dao/transactionsDao')
const { UsersObject } = require('../dao/usersDao')
const { CardsObject } = require('../dao/cardsDao')
const { checkUserTransactionHelper } = require('../helpers/usersHelper')

exports.getUserTransactions = async (req, res) => {
  try {
    if ('id' in req.query) {
      if (Number(req.query.id) !== req.user) {
        return res.status(400).json({
          message: 'Usuario no autorizado.'
        })
      }
      const response = await TransactionsObject.getUserTransactionsSummary(req.query.id)
      if (response.length > 0) {   
        for (let i = 0; i < response.length; i++) {
          if (response[i].origen_usuario_id === req.user) {
            response[i].descripcion = 'Realizada'
            response[i].datos_usuario = `${response[i].destino_nombre} ${response[i].destino_apellido}`
            response[i].tarjeta_origen = `${response[i].destino_nombre} ${response[i].destino_apellido}` // se borra una vez que front tome los datos correctos de la respuesta .datos_usuario
          } else {
            response[i].descripcion = 'Recibida'
            response[i].datos_usuario = `${response[i].origen_nombre} ${response[i].origen_apellido}`
            response[i].tarjeta_origen = `${response[i].origen_nombre} ${response[i].origen_apellido}` // se borra una vez que front tome los datos correctos de la respuesta .datos_usuario
          }
          response[i].fecha = `${response[i].fecha.getUTCDate().toString().padStart(2, '0')}-${(response[i].fecha.getUTCMonth() + 1 ).toString().padStart(2, '0')}-${response[i].fecha.getUTCFullYear()}`
          
          delete response[i].origen_usuario_id
          delete response[i].destino_nombre
          delete response[i].destino_apellido
          delete response[i].origen_nombre
          delete response[i].origen_apellido
        }
        res.status(200).json(response)

      } else {
        res.status(400).json({
          message: 'No se encontraron transacciones para el usuario especificado.'
        })
      }

    } else {
      res.status(400).json({
        message: 'Debe incluir id en la peticion'
      })
    }

  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.postUserTransaction = async (req, res) => {
  try {

    const checkResponse = await checkUserTransactionHelper(req)
    if (!checkResponse.valid) {
      return res.status(400).json({
        message: checkResponse.message,
        valid: false
      })
    }
  
    // La transaccion espera el id de tarjeta y no sus numeros.
    req.body.tarjeta_origen = await CardsObject.getCardIdByCardNumber(req.body.tarjeta_origen)
    req.body.tarjeta_destino = await CardsObject.getCardIdByCardNumber(req.body.tarjeta_destino)
    
    // Hacer la transaccion
    // Primero intento registrar la transaccion
    const transactionResponse = await TransactionsObject.postUserTransaction({
      ...req.body,
      origen_usuario_id: checkResponse.userData.id,
      origen_nombre: checkResponse.userData.nombre,
      origen_apellido: checkResponse.userData.apellido,
      destino_usuario_id: checkResponse.userRecipientData.id,
      destino_nombre: checkResponse.userRecipientData.nombre,
      destino_apellido: checkResponse.userRecipientData.apellido
     })

    if (transactionResponse !== 1) {
      return res.status(400).json({
        message: 'Error al realizar la transaccion. Comuniquese con el banco.'
      })
    }

    // Si la transaccion fue exitosa, actualizo el saldo de los usuarios.
    const userBalanceResponse = await UsersObject.changeUserBalance(checkResponse.userData.id, -req.body.monto)
    const userRecipientBalanceResponse = await UsersObject.changeUserBalance(checkResponse.userRecipientData.id, req.body.monto)
    if (userBalanceResponse === 1 && userRecipientBalanceResponse === 1) {
      const saldo = checkResponse.userData.saldo - req.body.monto

      ///nueva feature
      const saldo2 = await CardsObject.getCardsNumberByUserId(checkResponse.userData.id) 

      res.status(200).json({
        message: 'Transaccion realizada con exito.',
        saldo,
        saldo2,
        valid: true
      })
    } else {

      // La transaccion se realizo pero alguno de los saldos de los usuarios no pudo ser actualizado.
      res.status(400).json({
        message: 'Error al realizar la transaccion. Comuniquese con el banco.',
        valid: false
      })
    }

  } catch (error) {
    res.status(500).json({ error: error, valid: false })
  }
}

exports.checkUserTransaction = async (req, res) => {
  try {
    const checkResponse = await checkUserTransactionHelper(req)
    if (!checkResponse.valid) {
      return res.status(400).json({
        message: checkResponse.message,
        valid: false,
        recipient_user_name: '',
        recipient_user_last_name: ''
      })
    }
    return res.status(200).json({
      message: 'Transaccion valida.',
      valid: true,
      recipient_user_name: checkResponse.userRecipientData.nombre,
      recipient_user_last_name: checkResponse.userRecipientData.apellido
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}