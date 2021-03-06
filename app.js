// importando express
const express = require('express');

// Importando body-parser para poder hacer el CRUD de la DB
const bodyParser = require('body-parser');

// asignando express a la constante app
const app = express();

// Configuracion del body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// importando dotenv para hacer las variables de entorno
require('dotenv').config();
// importante: tambien debemos crear el archivo .env que en donde se configuran las variables 

// asignando un puerto al servidor (solo para desarrollo local)
const port = process.env.PORT || 3000;

// Para hacer la conexión a la base de datos
const mongoose = require('mongoose');

// Datos necesarios para hacer la conexion en el archivo .env

const uri = `mongodb+srv://${process.env.USER2}:${process.env.PASSWORD2}@cluster0.ybufp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// haciendo la conexión a la BD
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=>console.log('Base de Datos conectada'))
  .catch(e=>console.log(e))


// Motor de plantillas
// Aqui debemos poner en el segundo parametro el lenguaje que ocuparemos para hacer
// las platillas
app.set('view engine', 'ejs');
// Debemos indicar la ruta donde estan las vistas
app.set('views',__dirname+'/views');

// si pones rutas estaticas antes de los verbos (POST, GET...)
// estas se van a ejecutar antes y se les conoce como middleware
// _dirname sirve para poner todo la ruta por default y solo le cantatenamos el archivo
// al que debe de acceder
app.use(express.static(__dirname+'/public'));

// declarando lo que debe hacer el servidor cuando le hacen una peticion GET
// recibe dos parametros el primero es la ruta
// el segundo es un callback con el requerimiento y la respuesta como parametros
// esta callback contiene toda la logica de lo que debe hacer el servidor cuando le hacen
// una peticion GET
// Cuando trabajamos con plantillas debemo ocupar render en lugar de send

// importando las rutas desde el router
app.use('/', require('./router/rutasWeb'));

app.use('/mascotas', require('./router/mascotas'));


// Si no encuentra ninguna ruta ejecutamos el error 404
// Cuando veamos un use significa que estamos usando un middleware
app.use((req,res,next)=>{
  // Si no necesitamos mandar nada entonces esta es la forma corta
  res.status(404).render('404')
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