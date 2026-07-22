const express = require("express"); //importa express
const Usuario = require("../models/Usuario"); //importa el modelo de usuario para poder usarlo en las rutas
const jwt = require("jsonwebtoken"); //importa libreria para crear tokens de autenticacion

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

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body; //obtiene el mail y contraseña que envia el cliente

    const usuario = await Usuario.findOne({ email }); //aca busca en MogoDB un usuario con ese email

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" }); //si no existe devuelve error
    }

    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" }); //si el email existe pero la contraseña no coincide entonces devuelve otro error
    }

// creamos el token JWT: donde guardaremos el id del usuario y email
const token = jwt.sign(
  {
    id: usuario._id,
    email: usuario.email,
  },
  process.env.JWT_SECRET, // usa la clave que agrege al archivo .env
  {
    expiresIn: "1h", //el token sera valido durante 1 hr, dsps tendra que iniciar sesion nuevamente.
  }
);    
   res.json({
  mensaje: "Login correcto",
  token,
  usuario: {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
  },
});

  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
});

module.exports = router;
