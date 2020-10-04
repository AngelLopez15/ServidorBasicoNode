// El schema o modelo es nuestra estructura
// Se pone en singular por que es el modelo de un registro de nuestra base de datos

// importamos mongoose
const mongoose = require('mongoose');
// importamos schema
const schema = mongoose.Schema;

// Creando la estructura del "esquema" para definir los datos que recibira 
// la coleccion o sea los registros de la base de datos
const mascotaSchema = new schema({
  nombre: String,
  descripcion: String, 
});

// Creando el modelo
const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;