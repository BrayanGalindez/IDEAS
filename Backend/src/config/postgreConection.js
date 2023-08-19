const pkg = require('pg')
const { postgresuser, postgreshost, postgresdb, postgrespassword, postgresport } = require('./environment.js')

const { Client } = pkg

const client = new Client({
  user: postgresuser,
  host: postgreshost,
  database: postgresdb,
  password: postgrespassword,
  port: postgresport,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
})

let isConected
const connectToDb = async () => {
  if (!isConected) { // Esta logica es para evitar varias conexiones simultaneas
    await client
      .connect()
      .then(() => {
        isConected = true
        console.log('PostgreDB Connected...')
      })
      .catch((err) => console.error(`Ideas PostgreDB ${err}`))
  }
}

module.exports = {
  client,
  connectToDb
}
