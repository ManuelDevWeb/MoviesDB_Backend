// Importando express
import express from "express";

// Puerto
const PORT = 4000;

// Inicializando aplicacion con express
const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hola Mundo",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
