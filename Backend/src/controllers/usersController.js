const { UsersObject } = require('../dao/usersDao')
const { CardsObject } = require('../dao/cardsDao')
const { generateJwtToken } = require('../middlewares/auth')

exports.userLogin = async (req, res) => {
  try {
    const userId = await CardsObject.getUserIdByCardNumber(req.body.cardNumber)
    const response = await UsersObject.userLogin(userId, req.body.pin, 'USER')
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
    res.status(500).json({ error })
  }
}

exports.getUserBalance = async (req, res) => {
  try {
    const response = await UsersObject.getUserBalance(req.user)
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

// ---------------------- para desarrollo
exports.getUsers = async (_req, res) => {
  try {
    const response = await UsersObject.getAllUsers()
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
