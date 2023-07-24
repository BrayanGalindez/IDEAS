const createusers = `
CREATE TABLE IF NOT EXISTS ideausers (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  pin VARCHAR(30),
  saldo DECIMAL(10, 2)
)`

const createcards = `
CREATE TABLE IF NOT EXISTS ideacards (
  id SERIAL PRIMARY KEY,
  numero_tarjeta VARCHAR(16),
  usuario_id INTEGER,
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
  FOREIGN KEY (origen_usuario_id) REFERENCES ideausers(id),
  FOREIGN KEY (tarjeta_origen) REFERENCES ideacards(id),
  FOREIGN KEY (destino_usuario_id) REFERENCES ideausers(id),
  FOREIGN KEY (tarjeta_destino) REFERENCES ideacards(id)
)`
