const { Router } = require('express')
const usersController = require('../controllers/usersController')
const usersRoute = Router()

usersRoute.post(
  '/users/login',
  async (req, res) => {
    usersController.userLogin(req, res)
  }
)

// ----------------------- para desarrollo
usersRoute.post(
  '/users',
  async (req, res) => {
    usersController.newUser(req, res)
  }
)

usersRoute.get(
  '/users',
  async (req, res) => {
    usersController.getUsers(req, res)
  }
)

module.exports = usersRoute
