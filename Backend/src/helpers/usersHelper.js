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
}

module.exports.UsersObject = new Users()
