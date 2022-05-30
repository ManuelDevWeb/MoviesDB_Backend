// Importando modelo Usuario
import { Usuario } from "../models/Usuario.js";
// Importando funcion que genera un ID aleatorio
import { generarId } from "../helpers/generarId.js";

// Función para crear un nuevo usuario
const registrarUsuario = async (req, res) => {
  // Obteniendo email del usuario
  const { email } = req.body;

  // Verificando si el usuario ya existe en la DB
  const existeUsuario = await Usuario.findOne({ email });

  // Si existe el usuario retorna un error 400
  if (existeUsuario) {
    const error = new Error("El email ya pertenece a un usuario 😔");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    // Instanciando un usuario a partir del modelo Usuario
    const usuario = new Usuario(req.body);
    // Asignar valor token al usuario aleatorio, con la funcion generarId()
    usuario.token = generarId();
    // Guardar usuario en la DB
    await usuario.save();
    res.json({
      msg: "Usuario creado correctamente, revisa tu email para confirmar tu cuenta 😉",
    });
  } catch (error) {
    console.log(error);
  }
};

// Función para autenticar un usuario
const autenticarUsuario = async (req, res) => {};

// Función para confirmar un usuario
const confirmarUsuario = async (req, res) => {};

// Función para recuperar contraseña (Genera un nuevo Token)
const recuperarPasswordUsuario = async (req, res) => {};

// Función para validar token (Verifica si corresponde a un usuario)
const validarTokenUsuario = async (req, res) => {};

// Función para actualizar contraseña (Verifica si corresponde a un usuario y actualiza la contraseña)
const nuevaPasswordUsuario = async (req, res) => {};

// Función para obtener el perfil del usuario
const perfilUsuario = async (req, res) => {};

export {
  registrarUsuario,
  autenticarUsuario,
  confirmarUsuario,
  recuperarPasswordUsuario,
  validarTokenUsuario,
  nuevaPasswordUsuario,
  perfilUsuario,
};
