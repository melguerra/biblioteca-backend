const mongoose = require("mongoose"); //importa mongoose

const usuarioSchema = new mongoose.Schema({ //creo el esquema de usuarios, donde va a estar la información de cada usuario
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //no se puede agregar dos usuaros con el mismo email
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema); //crea el modelo llamado Usuario para poder usarlo desde las rutas y controladores