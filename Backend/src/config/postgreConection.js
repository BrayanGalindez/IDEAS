const pkg = require('pg');
const { postgres_url } = require('./environment.js');

const { Pool } = pkg;

const pool = new Pool({
  connectionString: `${postgres_url}?sslmode=require`
});


let isReconnecting = false;
pool.on('error', async (err) => {
  console.error('Unhandled error in PostgreSQL pool:', err);
  if (!isReconnecting) {
    isReconnecting = true;
    console.log('Attempting to reconnect...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    isReconnecting = false;
    console.log('Reconnection attempt complete.');
  }
});

let isConnected = false;
const connectToDb = async () => {
  if (!isConnected) {
    try {
      await pool.connect();
      isConnected = true;
      console.log('PostgreDB Connected...');
    } catch (err) {
      console.error(`Error connecting to PostgreDB: ${err}`);
      return;
    }
  }
};

module.exports = {
  pool,
  connectToDb
};

