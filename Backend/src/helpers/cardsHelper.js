const { client, connectToDb } = require('../config/postgreConection')

class Cards {
  constructor () {
    this.client = client
    this.connectToDb = connectToDb
  }

  async getUserIdByCardNumber (cardNumber) {
    await this.connectToDb()
    const selectQuery = 'SELECT usuario_id FROM ideacards WHERE numero_tarjeta = $1'
    const response = await this.client.query(selectQuery, [cardNumber])
    return response.rowCount > 0 ? response.rows[0].usuario_id : null
  }

  async getCardIdByCardNumber (cardNumber) {
    await this.connectToDb()
    const selectQuery = 'SELECT id FROM ideacards WHERE numero_tarjeta = $1'
    const response = await this.client.query(selectQuery, [cardNumber])
    return response.rowCount > 0 ? response.rows[0].id : null
  }

  async getCardNumberByCardId (cardId) {
    await this.connectToDb()
    const selectQuery = 'SELECT numero_tarjeta FROM ideacards WHERE id = $1'
    const response = await this.client.query(selectQuery, [cardId])
    return response.rowCount > 0 ? response.rows[0].numero_tarjeta : null
  }
}

module.exports.CardsObject = new Cards()
