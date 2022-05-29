// Importando express
import express from "express";

// Importando funcion para conextarnos a la DB
import { connectDB } from "./config/db.js";

// Puerto
const PORT = 4000;

// Inicializando aplicacion con express
const app = express();

// Llamando a la funcion connectDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
