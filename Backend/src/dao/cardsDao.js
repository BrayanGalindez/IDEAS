const creditCardGenerator = require('creditcard-generator')
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

  async getCardsNumberByUserId (userId) {
    await this.connectToDb()
    const selectQuery = 'SELECT numero_tarjeta FROM ideacards WHERE usuario_id = $1 AND activo = $2'
    const response = await this.client.query(selectQuery, [userId, true])
    return response.rowCount > 0 ? response.rows : null
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

  async newCard (userId) {
    await this.connectToDb()
    const cardNumber = await creditCardGenerator.GenCC('VISA')[0].toString()
    const insertQuery = 'INSERT INTO ideacards (usuario_id, numero_tarjeta) VALUES ($1, $2)'
    const response = await this.client.query(insertQuery, [userId, cardNumber])
    return { count: response.rowCount, cardNumber }
  }

  async deleteCard (cardId) {
    await this.connectToDb()
    const updateQuery = 'UPDATE ideacards SET activo = $1 WHERE id = $2'
    const response = await this.client.query(updateQuery, [false, cardId])
    return response.rowCount
  }
}

module.exports.CardsObject = new Cards()
