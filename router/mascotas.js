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

// CREACION DEL CRUD

// Creando el GET para crear mascota
router.get('/crear', (req, res) => {
  res.render('crear')
});

// Metodo POST para enviar el formulario
router.post('/', async(req,res)=>{
  const body = req.body
  
  try {
    
    // Contruyendo una nueva mascota con los datos que vienen del formulario
    const mascotaDB = new Mascota(body);
    // usando el metodo save para guardar enviar a la base de datos
    await mascotaDB.save(); 
    // Redireccionando al usuario despues de dar enviar en el formulario
    res.redirect('/mascotas')
  } catch (error) {
    console.log(error)
  }


})


module.exports = router;