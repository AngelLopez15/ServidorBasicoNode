const express = require('express');

// importando el router
const router = express.Router();

router.get('/', (req, res) => {
  res.render('mascotas', {
    arrayMascotas:[
    {id:1, nombre:'Simbo', descripcion:'descripcion de simbo'},
    {id:2, nombre:'Simbo2', descripcion:'descripcion de simbo2'},
  ]
  });
});

module.exports = router;