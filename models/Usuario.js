// Importando ODM mongoose
import mongoose from "mongoose";
// Importando Bcrypt para encriptar contraseñas
import bcrypt from "bcrypt";

// Schema Usuario (Estructura en la BD)
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      // Eliminando espacios en blanco al inicio y al final
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Crea columna de creado y otra de actualizado
    timestamps: true,
  }
);

// Middleware que se ejecuta antes de guardar en la BD
usuarioSchema.pre("save", async function (next) {
  // Hacemos referencia al objeto instanciado
  const usuario = this;

  // Si la contraseña no ha sido modificada, no se ejecuta el middleware
  if (!usuario.isModified("password")) {
    // Saltando al siguiente middleware
    next();
  }

  // Hashea la contraseña 10 veces
  const salt = await bcrypt.genSalt(10);

  // Hasheamos la contrase;a
  const passwordHashed = await bcrypt.hash(usuario.password, salt);
  // Asignamos la contraseña hasheada
  usuario.password = passwordHashed;
  // Saltando al siguiente middleware
  next();
});

// Definiendo el modelo (Nombre para identificar Modelo y Schema)
const Usuario = mongoose.model("Ususario", usuarioSchema);

export { Usuario };
