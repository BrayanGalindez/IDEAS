const express = require('express')
const treblle = require('@treblle/express') // Creates API documentation

const { staticFiles, port, treblleApiKey, treblleProjectId } = require('./config/environment')
const transactionsRoute = require('./routes/transactionsRoute')
const usersRoute = require('./routes/usersRoute')

const app = express()

// ---------------------- MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(staticFiles))
app.use('/api/doc', express.static(staticFiles))
app.use(
  treblle({
    apiKey: treblleApiKey,
    projectId: treblleProjectId
  }))

// ---------------------- ROUTES
app.use('/api', transactionsRoute)
app.use('/api', usersRoute)

app.get('/', (req, res) => {
  res.send('Hola, este es el servidor de Express!')
})

// ---------------------- START SERVER
app.listen(port, () => {
  console.log(`El servidor está funcionando en http://localhost:${port}`)
})
