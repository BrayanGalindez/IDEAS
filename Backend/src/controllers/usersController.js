const { UsersObject } = require('../helpers/usersHelper')

const bcrypt = require('bcrypt')
const saltRounds = 8

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

// Para comparar PIN se usa bcrypt.compareSync(req.body.pin, user.pin) que devuelve TRUE o FALSE
