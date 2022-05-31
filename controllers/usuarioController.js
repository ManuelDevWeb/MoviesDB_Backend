// Importando modelo Usuario
import { Usuario } from "../models/Usuario.js";
// Importando funcion que genera un ID aleatorio
import { generarId } from "../helpers/generarId.js";
// Importando funcion que genera un JWT
import { generarJWT } from "../helpers/generarJWT.js";

// Función para crear un nuevo usuario
const registrarUsuario = async (req, res) => {
  // Obteniendo email del usuario
  const { email } = req.body;

  // Verificando si el usuario existe en la DB
  const usuario = await Usuario.findOne({ email });

  // Si existe el usuario retorna un error 400
  if (usuario) {
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
const autenticarUsuario = async (req, res) => {
  // Obteniendo el email y la contraseña del usuario
  const { email, password } = req.body;

  // Verificando si el usuario existe en la DB
  const usuario = await Usuario.findOne({ email });

  // Si no existe el usuario retorna un error 400
  if (!usuario) {
    const error = new Error("Usuario no encontrado 😔");
    return res.status(400).json({
      msg: error.message,
    });
  }

  // Verificando si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error(
      "Tu cuenta no esta confirmada, porfavor verifique su correo 😔"
    );
    return res.status(403).json({
      msg: error.message,
    });
  }

  // Comprobar si la contraseña es correcta
  const passwordCorrecto = await usuario.comprobarPassword(password);
  if (passwordCorrecto) {
    // Enviamos un res.json para acceder a la informacion del usuario desde el frontend
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      avatar: usuario.avatar,
      // Asignando valor token al usuario, con la funcion generarJWT()
      jwtToken: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Contraseña incorrecta 😔");
    return res.status(400).json({
      msg: error.message,
    });
  }
};

// Función para confirmar un usuario
const confirmarUsuario = async (req, res) => {
  // Obteniendo el token del usuario (Generado al momento de registrarse)
  const { token } = req.params;

  // Verificando si el usuario existe en la DB
  const usuario = await Usuario.findOne({ token });

  // Si no existe el usuario retorna un error 400
  if (!usuario) {
    const error = new Error("Usuario no encontrado 😔");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    // Asignamos el valor confirmado a true
    usuario.confirmado = true;
    // El token es de un solo uso, por ende asignamos el valor a vacio
    usuario.token = "";
    // Actualizamos el usuario en la DB
    await usuario.save();

    res.json({
      ms: "Usuario confirmado correctamente, ya puedes iniciar sesión 😉",
    });
  } catch (error) {
    console.log(error);
  }
};

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
