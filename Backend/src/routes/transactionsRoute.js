const { Router } = require('express')
const transactionsController = require('../controllers/transactionsController')
const transactionsRoute = Router()

transactionsRoute.get(
  '/transactions',
  async (req, res) => {
    transactionsController.getUserTransactions(req, res)
  })

module.exports = transactionsRoute
