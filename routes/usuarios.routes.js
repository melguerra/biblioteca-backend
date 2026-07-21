const express = require("express"); //importa express
const Usuario = require("../models/Usuario"); //importa el modelo de usuario para poder usarlo en las rutas

const router = express.Router(); //crea un router de express para poder definir las rutas de usuarios

router.post("/registro", async (req, res) => {  //crea una ruta post llamada registro que recibe los datos del usuario desde el cliente y los guarda en la base de datos
  try {
    const nuevoUsuario = new Usuario({ //crea un objeto Usuario usando el modelo q hicimos antes
      nombre: req.body.nombre,   //toman los datos que envia el frontend(o postman) y los coloca dentro del nuevo usuario
      email: req.body.email,
      password: req.body.password,
    });

    const usuarioGuardado = await nuevoUsuario.save(); //guarda el nuevo usuario en MongoDB

    res.status(201).json(usuarioGuardado); //Aca devuelve el usuario creado con el codigo http 201 (creado) 
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
});

module.exports = router;
