const { Router } = require('express')
const passport = require('../middlewares/auth')
const adminController = require('../controllers/adminController')

const adminRoute = Router()

// ------------------ Admin users
adminRoute.post(
  '/admin/login',
  (req, res) => {
    adminController.adminLogin(req, res)
  }
)

adminRoute.post(
  '/admin/user',
  passport.authenticate('jwtadmin', { session: false }),
  (req, res) => {
    adminController.newUser(req, res)
  }
)

adminRoute.put(
  '/admin/user',
  passport.authenticate('jwtadmin', { session: false }),
  (req, res) => {
    adminController.updateUser(req, res)
  }
)

adminRoute.delete(
  '/admin/user',
  passport.authenticate('jwtadmin', { session: false }),
  (req, res) => {
    adminController.deleteUser(req, res)
  }
)

// ------------------ Admin cards
adminRoute.post(
  '/admin/cards',
  passport.authenticate('jwtadmin', { session: false }),
  (req, res) => {
    adminController.newCard(req, res)
  }
)

adminRoute.delete(
  '/admin/cards',
  passport.authenticate('jwtadmin', { session: false }),
  (req, res) => {
    adminController.deleteCard(req, res)
  }
)

module.exports = adminRoute
