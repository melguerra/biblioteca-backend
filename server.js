const dns = require("node:dns"); //Node tenia problemas internos apuntando a 127.0.0.1 (localhost) y no resolviendo correctamente los dominios, por lo que se cambió a servidores DNS públicos (Cloudflare y Google) 
dns.setServers(["1.1.1.1", "8.8.8.8"]); 
const express = require("express");
const cors = require("cors");
const librosRoutes = require("./routes/libros.routes");

require("dotenv").config();
const conectarDB = require("./config/db");

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());

app.use("/api/libros", librosRoutes);

app.get("/", (req, res) => {
  res.send("API Biblioteca funcionando correctamente");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});