const { Router } = require('express')
const passport = require('../middlewares/auth')
const transactionsController = require('../controllers/transactionsController')
const transactionsRoute = Router()

// Devuelve todas las transacciones de un usuario
transactionsRoute.get(
  '/transactions',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    transactionsController.getUserTransactions(req, res)
  })

// Registra una transaccion
transactionsRoute.post(
  '/transactions',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    transactionsController.postUserTransaction(req, res)
  }
)

module.exports = transactionsRoute
