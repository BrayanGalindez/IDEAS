const pkg = require('pg')
const { Client } = pkg

const client = new Client({
  user: 'default',
  host: 'ep-restless-feather-07309582-pooler.us-east-1.postgres.vercel-storage.com',
  database: 'verceldb',
  password: 'KSk0VeZJMR2b',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

let isConected
const connectToDb = async () => {
  try {
    if (!isConected) {
      await client.connect()
      isConected = true
      console.log('PostgreDB Conectada...')
    }
  } catch (err) {
    console.error('Error al conectar con PostgreSQL:', err.message)
  }
}

const createusers = `
CREATE TABLE IF NOT EXISTS ideausers (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  pin VARCHAR(50),
  saldo DECIMAL(10, 2),
  activo BOOLEAN NOT NULL DEFAULT TRUE
)`

const createcards = `
CREATE TABLE IF NOT EXISTS ideacards (
  id SERIAL PRIMARY KEY,
  numero_tarjeta VARCHAR(16),
  usuario_id INTEGER,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (usuario_id) REFERENCES ideausers(id)
)`

const createtrasactions = `
CREATE TABLE IF NOT EXISTS ideatransactions (
  id SERIAL PRIMARY KEY,
  monto DECIMAL(10, 2),
  origen_usuario_id INTEGER,
  tarjeta_origen INTEGER,
  destino_usuario_id INTEGER,
  tarjeta_destino INTEGER,
  fecha TIMESTAMP,
  registrada BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (origen_usuario_id) REFERENCES ideausers(id),
  FOREIGN KEY (tarjeta_origen) REFERENCES ideacards(id),
  FOREIGN KEY (destino_usuario_id) REFERENCES ideausers(id),
  FOREIGN KEY (tarjeta_destino) REFERENCES ideacards(id)
)`

connectToDb()
const fn = async () => {
  let result = await client.query(createusers)
  console.log(result)
  result = await client.query(createcards)
  console.log(result)
  result = await client.query(createtrasactions)
  console.log(result)
  client.end()
}

fn()
