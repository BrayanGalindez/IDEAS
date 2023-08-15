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
      const response = await TransactionsObject.getUserTransactionsSummary(req.query.id)
      if (response.length > 0) {
        
        /* ELIMINAMOS ESTA LOGICA YA QUE HACE DEMASIADAS CONSULTAS A LA BASE DE DATOS
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
        }*/

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
          response[i].fecha = `${response[i].fecha.getUTCDate().toString().padStart(2, '0')}-${response[i].fecha.getUTCMonth().toString().padStart(2, '0')}-${response[i].fecha.getUTCFullYear()}`
          
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

    // Traigo los datos del usuario (nombre, apellido, saldo)
    const origin_user = await UsersObject.getUserNameAndBalance(userId)
    
   
    // Monto de la transaccion es positivo y tiene saldo?
    if (req.body.monto < 0 || req.body.monto > origin_user[0].saldo) {
      return res.status(400).json({
        message: 'Monto no valido.'
      })
    }

    // Estan correctos los datos de destino?
    const userRecipientId = await CardsObject.getUserIdByCardNumber(req.body.tarjeta_destino)
    if (!userRecipientId || userRecipientId === userId) {
      return res.status(400).json({
        message: 'Destinatario no valido.'
      })
    }

    // Traigo los datos del destinatario (nombre, apellido, saldo)
    const recipient_user = await UsersObject.getUserNameAndBalance(userRecipientId)

    // La transaccion espera el id de tarjeta y no sus numeros.
    req.body.tarjeta_origen = await CardsObject.getCardIdByCardNumber(req.body.tarjeta_origen)
    req.body.tarjeta_destino = await CardsObject.getCardIdByCardNumber(req.body.tarjeta_destino)
    
    // Hacer la transaccion
    // Primero intento registrar la transaccion
    const transactionResponse = await TransactionsObject.postUserTransaction({
      ...req.body,
      origen_usuario_id: userId,
      origen_nombre: origin_user[0].nombre,
      origen_apellido: origin_user[0].apellido,
      destino_usuario_id: userRecipientId,
      destino_nombre: recipient_user[0].nombre,
      destino_apellido: recipient_user[0].apellido
     })

    if (transactionResponse !== 1) {
      return res.status(400).json({
        message: 'Error al realizar la transaccion. Comuniquese con el banco.'
      })
    }

    // Si la transaccion fue exitosa, actualizo el saldo de los usuarios.
    const userBalanceResponse = await UsersObject.changeUserBalance(userId, -req.body.monto)
    const userRecipientBalanceResponse = await UsersObject.changeUserBalance(userRecipientId, req.body.monto)
    const saldo = await UsersObject.getUserBalance(userId)
    if (userBalanceResponse === 1 && userRecipientBalanceResponse === 1) {
      res.status(200).json({
        message: 'Transaccion realizada con exito.',
        saldo
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
