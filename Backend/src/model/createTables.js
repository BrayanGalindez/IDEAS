const pkg = require('pg')
const { pool } = pkg

const { postgresuser, postgreshost, postgresdb, postgrespassword, postgresport } = require('./environment.js')

const pool = new pool({
  user: postgresuser,
  host: postgreshost,
  database: postgresdb,
  password: postgrespassword,
  port: postgresport,
  ssl: {
    rejectUnauthorized: false
  }
})

let isConected
const connectToDb = async () => {
  try {
    if (!isConected) {
      await pool.connect()
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
  email VARCHAR(100),
  telefono VARCHAR(20),
  picture VARCHAR(100),
  role VARCHAR(50),
  activo BOOLEAN NOT NULL DEFAULT TRUE
)`

const createcards = `
CREATE TABLE IF NOT EXISTS ideacards (
  id SERIAL PRIMARY KEY,
  numero_tarjeta VARCHAR(16),
  usuario_id INTEGER,
  tipo VARCHAR(50) DEFAULT 'green',
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (usuario_id) REFERENCES ideausers(id)
)`

const createtrasactions = `
CREATE TABLE IF NOT EXISTS ideatransactions (
  id SERIAL PRIMARY KEY,
  monto DECIMAL(10, 2),
  origen_usuario_id INTEGER,
  origen_nombre VARCHAR(50),
  origen_apellido VARCHAR(50),
  tarjeta_origen INTEGER,
  destino_usuario_id INTEGER,
  destino_nombre VARCHAR(50),
  destino_apellido VARCHAR(50),
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
  let result = await pool.query(createusers)
  console.log(result)
  result = await pool.query(createcards)
  console.log(result)
  result = await pool.query(createtrasactions)
  console.log(result)
  pool.end()
}

fn()
