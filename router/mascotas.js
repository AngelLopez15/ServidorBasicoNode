const express = require('express');

// importando el router
const router = express.Router();

// Importando el modelo
const Mascota = require('../models/mascota')


router.get('/', async (req, res) => {

  try {
    
    // ocuapando el metodo find para traer todas los datos de la DB
    const arrayMascotasDB = await Mascota.find()

    // mandando los datos encontrados en la DB a la vista
    res.render('mascotas', {
      arrayMascotas: arrayMascotasDB
    });

  } catch (error) {
    console.log(error)
  }

});

module.exports = router;