const { TransactionsObject } = require('../helpers/transactionsHelper')

exports.getUserTransactions = async (req, res) => {
  try {
    if ('id' in req.query) {
      const response = await TransactionsObject.getUserTransactions(req.query.id)
      res.status(200).json(response)
    } else {
      res.status(400).json({
        message: 'Debe incluir id en la peticion'
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.postUserTransaction = async (req, res) => {
  try {
    const response = await TransactionsObject.postUserTransaction(req.body)
    if (response === 1) {
      res.status(200).json({
        message: 'Transaccion realizada con exito'
      })
    } else {
      res.status(400).json({
        message: 'Error al realizar la transaccion'
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
