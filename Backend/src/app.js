// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola, este es el servidor de Express!');
});

app.listen(port, () => {
  console.log(`El servidor está funcionando en http://localhost:${port}`);
});