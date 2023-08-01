const { TransactionsObject } = require('../dao/transactionsDao')
const { UsersObject } = require('../dao/usersDao')
const { CardsObject } = require('../dao/cardsDao')

exports.getUserTransactions = async (req, res) => {
  try {
    if ('id' in req.query) {
      if (Number(req.query.id) !== req.user) {
        return res.status(400).json({
          message: 'Usuario no autorizado.'
        })
      }
      const response = await TransactionsObject.getUserTransactions(req.query.id)
      if (response.length > 0) {
        // En lugar de devolver los id de la tarjeta, devuelvo el numero
        for (let i = 0; i < response.length; i++) {
          const item = response[i]
          item.tarjeta_origen = await CardsObject.getCardNumberByCardId(item.tarjeta_origen)
          item.tarjeta_destino = await CardsObject.getCardNumberByCardId(item.tarjeta_destino)
          if (Number(req.query.id) === item.origen_usuario_id) {
            item.descripcion = 'Realizada'
            item.datos_usuario = await UsersObject.getUserNameById(item.destino_usuario_id)
          } else {
            item.descripcion = 'Recibida'
            item.datos_usuario = await UsersObject.getUserNameById(item.origen_usuario_id)
          }
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
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.postUserTransaction = async (req, res) => {
  try {
    // Estan correctos los datos de origen y el usuario autorizado?
    const userId = await CardsObject.getUserIdByCardNumber(req.body.tarjeta_origen)
    if (!userId) {
      return res.status(400).json({
        message: 'Numero de tarjeta no valido.'
      })
    }
    if (userId !== req.user) {
      return res.status(400).json({
        message: 'Usuario no autorizado.'
      })
    }

    // Tiene saldo suficiente?
    const userBalance = await UsersObject.userBalance(userId)
    if (userBalance < req.body.monto) {
      return res.status(400).json({
        message: 'No tiene saldo suficiente.'
      })
    }

    // Estan correctos los datos de destino?
    const userRecipientId = await CardsObject.getUserIdByCardNumber(req.body.tarjeta_destino)
    if (!userRecipientId || userRecipientId === userId) {
      return res.status(400).json({
        message: 'Destinatario no valido.'
      })
    }

    // La transaccion espera el id de tarjeta y no sus numeros.
    req.body.tarjeta_origen = await CardsObject.getCardIdByCardNumber(req.body.tarjeta_origen)
    req.body.tarjeta_destino = await CardsObject.getCardIdByCardNumber(req.body.tarjeta_destino)
    req.body.destino_usuario_id = userRecipientId

    // Hacer la transaccion
    // Primero intento registrar la transaccion
    const transactionResponse = await TransactionsObject.postUserTransaction({ ...req.body, origen_usuario_id: userId })
    if (transactionResponse !== 1) {
      return res.status(400).json({
        message: 'Error al realizar la transaccion. Comuniquese con el banco.'
      })
    }

    // Si la transaccion fue exitosa, actualizo el saldo de los usuarios.
    const userBalanceResponse = await UsersObject.changeUserBalance(userId, -req.body.monto)
    const userRecipientBalanceResponse = await UsersObject.changeUserBalance(req.body.destino_usuario_id, req.body.monto)
    if (userBalanceResponse === 1 && userRecipientBalanceResponse === 1) {
      res.status(200).json({
        message: 'Transaccion realizada con exito.'
      })
    } else {
      // La transaccion se realizo pero alguno de los saldos de los usuarios no pudo ser actualizado.
      res.status(400).json({
        message: 'Error al realizar la transaccion. Comuniquese con el banco.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
