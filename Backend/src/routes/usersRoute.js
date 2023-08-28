const { Router } = require('express')
const passport = require('../middlewares/auth')
const usersController = require('../controllers/usersController')

const usersRoute = Router()

usersRoute.post(
  '/users/login',
  (req, res) => {
    usersController.userLogin(req, res)
  }
)

usersRoute.get(
  '/users/balance',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    usersController.getUserBalance(req, res)
  }
)

usersRoute.get(
  '/users/cardsbalance',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    usersController.getCardsBalance(req, res)
  }
)


// ----------------------- para desarrollo
usersRoute.get(
  '/users',
  (req, res) => {
    usersController.getUsers(req, res)
  }
)

module.exports = usersRoute
