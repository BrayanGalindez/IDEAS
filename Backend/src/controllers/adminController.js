const { UsersObject } = require('../dao/usersDao')
const { CardsObject } = require('../dao/cardsDao')
const { generateAdminJwtToken } = require('../middlewares/auth')

const bcrypt = require('bcrypt')
const saltRounds = 8

// ------------- Admin users
exports.adminLogin = async (req, res) => {
  try {
    const userId = await CardsObject.getUserIdByCardNumber(req.body.cardNumber)
    const response = await UsersObject.userLogin(userId, req.body.pin, 'ADMIN')
    if (response.length > 0) {
      response[0].cards = await CardsObject.getCardsNumberByUserId(response[0].id)
      delete response[0].pin
      response[0].jwtToken = generateAdminJwtToken(response[0].id)
      res.status(200).json(response)
    } else {
      res.status(404).json({
        message: 'Usuario no encontrado o PIN incorrecto'
      })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.newUser = async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.apellido || !req.body.pin || req.body.saldo === undefined || !req.body.picture) {
      return res.status(400).json({
        message: 'Faltan campos requeridos'
      })
    }
    req.body.pin = bcrypt.hashSync(req.body.pin, saltRounds) // Encriptar PIN
    const response = await UsersObject.newUser(req.body)
    if (response === 1) {
      res.status(200).json({
        message: 'Usuario creado con exito'
      })
    } else {
      res.status(400).json({
        message: 'Error al crear el usuario'
      })
    }
  } catch (error) {
    res.status(500).json({error})
  }
}

exports.getUser = async (req, res) => {
  try {
    if ('id' in req.query) {
      const response = await UsersObject.getUser(req.query.id)
      if (response.length > 0) {
        response[0].cards = await CardsObject.getCardsNumberByUserId(response[0].id)
        delete response[0].pin
        response[0].jwtToken = generateAdminJwtToken(response[0].id)
        res.status(200).json(response)
      } else {
        res.status(404).json({
          message: 'Usuario no encontrado'
        })
      }
    }
  } catch (error) {
    res.status(500).json({error})
  }
}

exports.updateUser = async (req, res) => {
  try {
    if (!req.body.id || !req.body.nombre || !req.body.apellido || !req.body.pin || req.body.saldo === undefined || !req.body.picture) {
      res.status(400).json({
        message: 'Faltan campos requeridos'
      })
    }
    req.body.pin = bcrypt.hashSync(req.body.pin, saltRounds)
    const response = await UsersObject.updateUser(req.body)
    if (response === 1) {
      res.status(200).json({
        message: 'Usuario modificado con exito'
      })
    } else {
      res.status(400).json({
        message: 'Error al modificar el usuario'
      })
    }
  } catch (error) {
    res.status(500).json({error})
  }
}

exports.deleteUser = async (req, res) => {
  try {
    if ('id' in req.query) {
      const response = await UsersObject.deleteUser(req.query.id)
      if (response === 1) {
        res.status(200).json({
          message: 'Usuario eliminado con exito'
        })
      } else {
        res.status(400).json({
          message: 'Error al eliminar el usuario'
        })
      }
    }
  } catch (error) {
    res.status(500).json({error})
  }
}

// ------------- Admin cards
exports.newCard = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({
        message: 'Debe incluir userId'
      })
    }
    const userName = await UsersObject.getUserNameById(req.body.userId)
    if (!userName) {
      return res.status(400).json({
        message: 'Usuario no encontrado'
      })
    }
    const response = await CardsObject.newCard(req.body.userId)
    if (response.count === 1) {
      res.status(200).json({
        message: 'Tarjeta creada con exito',
        cardNumber: response.cardNumber
      })
    } else {
      res.status(400).json({
        message: 'Error al crear la tarjeta'
      })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.deleteCard = async (req, res) => {
  try {
    if ('id' in req.query) {
      const response = await CardsObject.deleteCard(req.query.id)
      if (response === 1) {
        res.status(200).json({
          message: 'Tarjeta eliminada con exito'
        })
      } else {
        res.status(400).json({
          message: 'Error al eliminar la tarjeta'
        })
      }
    } else {
      res.status(400).json({ message: 'Debe incluir id en la peticion' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
