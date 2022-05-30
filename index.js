// Importando express
import express from "express";
// Importando dotenv
import dotenv from "dotenv";

// Importando funcion para conextarnos a la DB
import { connectDB } from "./config/db.js";

// Puerto
const PORT = process.env.PORT || 4000;

// Inicializando aplicacion con express
const app = express();

// Indicando que busque en el archivo .env (Evita tener que importar dotenv en todos los archivos)
dotenv.config();

// Llamando a la funcion connectDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
