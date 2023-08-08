const { client, connectToDb } = require('../config/postgreConection')
const bcrypt = require('bcrypt')

class Users {
  constructor () {
    this.client = client
    this.connectToDb = connectToDb
  }

  async userLogin (userId, pin, role) {
    await this.connectToDb()
    const selectQuery = 'SELECT * FROM ideausers WHERE id = $1 AND activo = $2 AND role = $3'
    const response = await this.client.query(selectQuery, [userId, true, role])
    if (response.rowCount > 0 && bcrypt.compareSync(pin, response.rows[0].pin)) {
      return response.rows
    }
    return []
  }

  async getUserBalance (id) {
    await this.connectToDb()
    const selectQuery = 'SELECT saldo FROM ideausers WHERE id = $1 AND activo = $2'
    const response = await this.client.query(selectQuery, [id, true])
    return response.rows[0].saldo
  }

  async changeUserBalance (id, amount) {
    await this.connectToDb()
    const updateQuery = 'UPDATE ideausers SET saldo = saldo + $1 WHERE id = $2 AND activo = $3'
    const response = await this.client.query(updateQuery, [amount, id, true])
    return response.rowCount
  }

  async getUserNameById (id) {
    await this.connectToDb()
    const selectQuery = 'SELECT nombre, apellido FROM ideausers WHERE id = $1'
    const response = await this.client.query(selectQuery, [id])
    return response.rows[0]
  }

  async newUser (data) {
    await this.connectToDb()
    const insertQuery = 'INSERT INTO ideausers (nombre, apellido, pin, saldo, picture, activo) VALUES ($1, $2, $3, $4, $5, $6)'
    const response = await this.client.query(insertQuery, [data.nombre, data.apellido, data.pin, data.saldo, data.picture, true])
    return response.rowCount
  }

  async getUser (id) {
    await this.connectToDb()
    const selectQuery = 'SELECT * FROM ideausers WHERE id = $1 AND activo = $2'
    const response = await this.client.query(selectQuery, [id, true])
    return response.rows
  }

  async getAllUsers () {
    await this.connectToDb()
    const selectQuery = 'SELECT * FROM ideausers WHERE activo = $1 AND role = $2'
    const response = await this.client.query(selectQuery, [true, 'USER'])
    return response.rows
  }

  async updateUser (data) {
    await this.connectToDb()
    const updateQuery = 'UPDATE ideausers SET nombre = $1, apellido = $2, pin = $3, saldo = $4, picture = $5 WHERE id = $6'
    const response = await this.client.query(updateQuery, [data.nombre, data.apellido, data.pin, data.saldo, data.picture, data.id])
    return response.rowCount
  }

  async deleteUser (id) {
    await this.connectToDb()
    const updateQuery = 'UPDATE ideausers SET activo = $1 WHERE id = $2'
    const response = await this.client.query(updateQuery, [false, id])
    return response.rowCount
  }
}

module.exports.UsersObject = new Users()
