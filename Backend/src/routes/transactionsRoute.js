const { Router } = require('express')
const passport = require('../middlewares/auth')
const transactionsController = require('../controllers/transactionsController')
const transactionsRoute = Router()

// Devuelve todas las transacciones de un usuario
transactionsRoute.get(
  '/transactions',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    transactionsController.getUserTransactions(req, res)
  })

// Registra una transaccion
transactionsRoute.post(
  '/transactions',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    transactionsController.postUserTransaction(req, res)
  }
)

// Verifica si es posible una transaccion
transactionsRoute.post(
  '/transactions/verify',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    transactionsController.checkUserTransaction(req, res)
  }
)

module.exports = transactionsRoute
