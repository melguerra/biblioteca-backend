const express = require("express");
const Libro = require("../models/Libro");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const libros = await Libro.find();   //busco todos los libros que esten guardados en mongodb y los devuelve
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los libros" });
  }
});

router.post("/", async (req, res) => { //la ruta post lo que hace es recibe los datos enviados desde el cliente , crea un nuevo libro y lo guarda en la base de datos
  try {
    const nuevoLibro = new Libro({
      titulo: req.body.titulo,
      autor: req.body.autor,
    });

    const libroGuardado = await nuevoLibro.save();

    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar el libro" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(
      req.params.id, //busca el libro por su id y lo actualiza con los datos enviados en el cuerpo de la solicitud
      {
        titulo: req.body.titulo,
        autor: req.body.autor,
      },
      { new: true }
    );

    if (!libroActualizado) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el libro" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);

    if (!libroEliminado) {
      return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    res.json({ mensaje: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el libro" });
  }
});

module.exports = router;