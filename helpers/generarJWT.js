// Importando JWT para crear el token
import jwt from "jsonwebtoken";

// Funcion para generar JWT
const generarJWT = (id) => {
  // Firmando (generando) el token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { generarJWT };
