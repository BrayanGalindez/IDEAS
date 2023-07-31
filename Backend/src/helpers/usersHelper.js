const { client, connectToDb } = require('../config/postgreConection')
const bcrypt = require('bcrypt')

class Users {
  constructor () {
    this.client = client
    this.connectToDb = connectToDb
  }

  async userLogin (userId, pin) {
    await this.connectToDb()
    const selectQuery = 'SELECT * FROM ideausers WHERE id = $1 AND activo = $2'
    const response = await this.client.query(selectQuery, [userId, true])
    if (response.rowCount > 0 && bcrypt.compareSync(pin, response.rows[0].pin)) {
      return response.rows
    }
    return []
  }

  async userBalance (id) {
    await this.connectToDb()
    const selectQuery = 'SELECT saldo FROM ideausers WHERE id = $1'
    const response = await this.client.query(selectQuery, [id])
    return response.rows[0].saldo
  }

  async changeUserBalance (id, amount) {
    await this.connectToDb()
    const updateQuery = 'UPDATE ideausers SET saldo = saldo + $1 WHERE id = $2'
    const response = await this.client.query(updateQuery, [amount, id])
    return response.rowCount
  }

  // ---------------------- Para desarrollo
  async newUser (data) {
    await this.connectToDb()
    const insertQuery = 'INSERT INTO ideausers (nombre, apellido, pin, saldo, activo) VALUES ($1, $2, $3, $4, $5)'
    const response = await this.client.query(insertQuery, [data.nombre, data.apellido, data.pin, data.saldo, true])
    return response.rowCount
  }

  async getUsers () {
    await this.connectToDb()
    const selectQuery = 'SELECT * FROM ideausers'
    const response = await this.client.query(selectQuery)
    return response.rows
  }
}

module.exports.UsersObject = new Users()
