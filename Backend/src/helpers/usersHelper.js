const { client, connectToDb } = require('../config/postgreConection')

class Users {
  constructor () {
    this.client = client
    this.connectToDb = connectToDb
  }

  async newUser (data) {
    await this.connectToDb()
    const insertQuery = 'INSERT INTO ideausers (nombre, apellido, pin, saldo, activo) VALUES ($1, $2, $3, $4, $5)'
    const response = await this.client.query(insertQuery, [data.nombre, data.apellido, data.pin, data.saldo, true])
    return response.rowCount
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
}

module.exports.UsersObject = new Users()
