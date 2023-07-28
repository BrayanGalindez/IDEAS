const { client, connectToDb } = require('../config/postgreConection')

class Transactions {
  constructor () {
    this.client = client
    this.connectToDb = connectToDb
  }

  async getUserTransactions (id) {
    await this.connectToDb()
    const selectQuery = 'SELECT * FROM ideatransactions WHERE origen_usuario_id = $1 OR destino_usuario_id = $1'
    const response = await this.client.query(selectQuery, [id])
    return response.rows
  }

  async postUserTransaction (data) {
    await this.connectToDb()
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const insertQuery = 'INSERT INTO ideatransactions (monto, origen_usuario_id, tarjeta_origen, destino_usuario_id, tarjeta_destino, fecha) VALUES ($1, $2, $3, $4, $5, $6)'
    const response = await this.client.query(insertQuery, [data.monto, data.origen_usuario_id, data.tarjeta_origen, data.destino_usuario_id, data.tarjeta_destino, fecha])
    return response.rowCount
  }
}

module.exports.TransactionsObject = new Transactions()
