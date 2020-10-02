const express = require('express');

// importando el router
const router = express.Router();


// declarando lo que debe hacer el servidor cuando le hacen una peticion GET
// recibe dos parametros el primero es la ruta
// el segundo es un callback con el requerimiento y la respuesta como parametros
// esta callback contiene toda la logica de lo que debe hacer el servidor cuando le hacen
// una peticion GET
// Cuando trabajamos con plantillas debemo ocupar render en lugar de send

// Como vamos a ocupar un el router entonces debemos cambiar el app por router
router.get('/', (req, res) =>{
  res.render('index',{titulo:'mi titulo dinámico'});
});

// podemos poner otra peticion get para otra ruta
router.get('/servicios', (req, res) =>{
  res.render('servicios', {tituloServicios:'Este es un mensaje dinamico de servicios'});
});

module.exports = router;