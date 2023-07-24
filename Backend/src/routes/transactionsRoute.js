const { Router } = require('express')
const transactionsController = require('../controllers/transactionsController')
const transactionsRoute = Router()

// Devuelve todas las transacciones de un usuario
transactionsRoute.get(
  '/transactions',
  async (req, res) => {
    transactionsController.getUserTransactions(req, res)
  })

// Registra una transaccion
transactionsRoute.post(
  '/transactions',
  async (req, res) => {
    transactionsController.postUserTransaction(req, res)
  }
)

module.exports = transactionsRoute
