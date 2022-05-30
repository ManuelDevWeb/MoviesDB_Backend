// Importando express
import express from "express";

// Importando funciones del controller de usuario
import {
  registrarUsuario,
  autenticarUsuario,
  confirmarUsuario,
  recuperarPasswordUsuario,
  validarTokenUsuario,
  nuevaPasswordUsuario,
  perfilUsuario,
} from "../controllers/usuarioController.js";

// Importando middleware para verificar que el usuario este autenticado

// Instanciando router de express
const router = express.Router();

// Autenticacion, Registro y Confirmacion de Usuarios

// Crear un nuevo usuario
router.post("/", registrarUsuario);

// Autenticar un usuario
router.post("/login");

// Confirmar un usuario
router.get("/confirmar/:token");

// Recuperar contraseña (Genera un nuevo Token)
router.post("/recuperar-password");

// Validar token para recuperar contraseña (GET) y Almacenar la nueva contraseña (POST)
router.route("/recuperar-password/:token").get().post();

// Obtener el perfil del usuario, solo si esta autenticado (Middleware)
router.get("/perfil");

export default router;
