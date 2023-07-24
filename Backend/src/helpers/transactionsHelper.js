const { client, connectToDb } = require('../config/postgreConection')

class Transactions {
  constructor () {
    this.client = client
    this.connectToDb = connectToDb
  }

  async getUserTransactions (id) {
    await this.connectToDb()
    const response = await this.client.query('SELECT * FROM ideatransactions WHERE origen_usuario_id = $1 OR destino_usuario_id = $1', [id])
    return response.rows
  }
}

module.exports.TransactionsObject = new Transactions()
