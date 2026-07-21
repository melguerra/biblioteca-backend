const mongoose = require("mongoose"); //importa mongoose

const libroSchema = new mongoose.Schema({ //creo el esquema de libros , donde va a estar los datos que tendrá
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Libro", libroSchema); //crea el modelo llamado libro para poder usarlo desde las rutas y controladores