const { UsersObject } = require('../dao/usersDao')
const { CardsObject } = require('../dao/cardsDao')
const { generateJwtToken } = require('../middlewares/auth')

const bcrypt = require('bcrypt')
const saltRounds = 8

exports.userLogin = async (req, res) => {
  try {
    const userId = await CardsObject.getUserIdByCardNumber(req.body.cardNumber)
    const response = await UsersObject.userLogin(userId, req.body.pin)
    if (response.length > 0) {
      response[0].cards = await CardsObject.getCardsNumberByUserId(response[0].id)
      delete response[0].pin
      response[0].jwtToken = generateJwtToken(response[0].id)
      res.status(200).json(response)
    } else {
      res.status(404).json({
        message: 'Usuario no encontrado o PIN incorrecto'
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getUserBalance = async (req, res) => {
  try {
    const response = await UsersObject.getUserBalance(req.user)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// ---------------------- para desarrollo
exports.newUser = async (req, res) => {
  try {
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
    res.status(500).json(error)
  }
}

exports.getUserByCardNumber = async (req, res) => {
  try {
    const response = await UsersObject.getUserByCardNumber(req.params.cardNumber)
    if (response.length > 0) {
      res.status(200).json(response)
    } else {
      res.status(404).json({
        message: 'No se encontraron usuarios'
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getUsers = async (_req, res) => {
  try {
    const response = await UsersObject.getUsers()
    const usersAndCards = []
    if (response.length > 0) {
      for (const user of response) {
        user.cards = await CardsObject.getCardsNumberByUserId(user.id)
        usersAndCards.push(user)
      }
      res.status(200).json(usersAndCards)
    } else {
      res.status(404).json({
        message: 'No se encontraron usuarios'
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// Para comparar PIN se usa bcrypt.compareSync(req.body.pin, user.pin) que devuelve TRUE o FALSE
