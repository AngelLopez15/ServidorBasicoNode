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
  res.send('Mi respuesta desde Express');
})

// podemos poner otra peticion get para otra ruta
app.get('/servicios', (req, res) =>{
  res.send('Mi respuesta desde Servicios');
})

// Si no encuentra ninguna ruta ejecutamos el error 404
app.use((req,res,next)=>{
  res.status(404).sendFile(__dirname+'/public/error404.html')
})

// Levantando el servido
// listen recibe dos parametros: 1- El puerto desde donde se levantara
// 2- (Opcional) una funcion anonima para enviar un mensaje a la consola y ver
// que efectivamente el servidor se levanto
app.listen(port,()=>{
  console.log(`Servidor a su servicio en el puerto ${port}`);
})

// NOTA: Todo lo que esta dentro de la carpeta public es a lo que los usuarios
// va a tener acceso. todos los archivos fuera de public son el servidor 