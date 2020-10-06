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

});


// ocupamos async y await por que se estan haciendo solicitudes a las DB
// Para hacer el update del CRUD necesitamos el id por lo tanto
// necesitamos una variable dinamica para la url. En este caso la obtenemos con /:id 
router.get('/:id', async (req, res) => {

  // creando la variable id
  const id = req.params.id

  try {
    
    // buscando el id del registro a editar en la DB
    // En mongo DB los id esta con un guion bajo "_" por eso al pasar el paremetro id al
    // metodo findOne debemos pasarle un objeto donde igualemos el id al _id
    const mascotaDB = await Mascota.findOne({_id:id})

    // enviar la edicion a una vista
    // Si todo sale bien se va a pintar los datos de la mascota y el error por tanto esta en false
    res.render('editar',{
      mascota:mascotaDB,
      error:false
    })

  } catch (error) {

    // Si la busqueda fallo y el id no existe entonces el error es true y no hay datos que mostar
    // Pero si podemos mandar un mensaje
    res.render('editar',{
      error:true,
      mensaje: 'No se encontro el id seleccionado'
    })
  }

});

// Creando el verbo Delete del CRUD
// necesitamos el id para poder obtener el registro a borrar
router.delete('/:id', async(req, res)=>{
  
  // guardando el id para buscar el registro que se va a borrar
  const id = req.params.id

  try {
    
    const mascotaDB = await Mascota.findByIdAndDelete({_id:id});

    if (mascotaDB) {
      // como no podemos renderizar directamente a mascotas de nuevo ya que esto da un error
      // entonces la respuesta va a ser un JSON
      res.json({
        estado:true,
        mensaje: 'Eliminado'
      })
      
    } else {
      res.json({
        estado:false,
        mensaje:'No se pudo eliminar'
      })
    }

  } catch (error) {
    console.log(error)
  }

})

// Creando el verbo PUT del CRUD para editar un registro
router.put('/:id', async(req, res)=>{

  // obteniendo el id para hacer la consulta a la base de datos 
  const id = req.params.id
  // mandando los datos capturados por el formulario atraves del body
  const body = req.body

  try {
    
    const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {useFindAndModify:false})

    // Enviando la respuesta en caso de que se haya editado con exito
    res.json({
      estado:true,
      mensaje:'Mascota editada'
    })

  } catch (error) {
    console.log(error)
    res.json({
      estado:false,
      mensaje:'Fallo la edición'
    })

  }

})

module.exports = router;