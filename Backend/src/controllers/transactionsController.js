const { TransactionsObject } = require('../helpers/transactionsHelper')

exports.getUserTransactions = async (req, res) => {
  if ('id' in req.query) {
    const response = await TransactionsObject.getUserTransactions(req.query.id)
    res.status(200).json(response)
  } else {
    res.status(200).json({
      message: 'Debe incluir id en la peticion'
    })
  }
}
