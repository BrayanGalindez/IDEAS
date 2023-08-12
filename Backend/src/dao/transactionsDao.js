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

  async getUserTransactionsSummary (id) {
    try {
      await this.connectToDb()
      const selectQuery = 'SELECT monto, origen_usuario_id, origen_nombre, origen_apellido, destino_nombre, destino_apellido, fecha  FROM ideatransactions WHERE origen_usuario_id = $1 OR destino_usuario_id = $1'
      const response = await this.client.query(selectQuery, [id])
      return response.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async postUserTransaction (data) {
    try {
      await this.connectToDb()
      const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const insertQuery = 'INSERT INTO ideatransactions (monto, origen_usuario_id, tarjeta_origen, origen_nombre, origen_apellido, destino_usuario_id, tarjeta_destino, destino_nombre, destino_apellido, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
      const response = await this.client.query(insertQuery, [data.monto, data.origen_usuario_id, data.tarjeta_origen, data.origen_nombre, data.origen_apellido, data.destino_usuario_id, data.tarjeta_destino, data.destino_nombre, data.destino_apellido, fecha])
      return response.rowCount
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports.TransactionsObject = new Transactions()
