const { Router } = require('express')
const usersController = require('../controllers/usersController')
const usersRoute = Router()

usersRoute.post(
  '/users',
  async (req, res) => {
    usersController.newUser(req, res)
  }
)

module.exports = usersRoute
