// importando express
const express = require('express');

// asignando express a la constante app
const app = express();

// asignando un puerto al servidor (solo para desarrollo local)
const port = 3000;

// declarando lo que debe hacer el servidor cuando le hacen una peticion GET
// recibe dos parametros el primero es la ruta
// el segundo es un callback con el requerimiento y la respuesta como parametros
// esta callback contiene toda la logica de lo que debe hacer el servidor cuando le hacen
// una peticion GET
app.get('/', (req, res) =>{
  res.send('Mi respuesta desde Express')
})