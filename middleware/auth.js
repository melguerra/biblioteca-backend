const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que exista el encabezado Authorization
  if (!authHeader) {
    return res.status(401).json({
      mensaje: "Acceso denegado. Token no proporcionado.",
    });
  }

  // El encabezado llega como: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos la información del usuario para usarla más adelante si hace falta
    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido.",
    });
  }
};

module.exports = verificarToken;