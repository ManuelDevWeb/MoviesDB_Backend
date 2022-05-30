// Importando ODM mongoose

import mongoose from "mongoose";

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

// Definiendo el modelo (Nombre para identificar Modelo y Schema)
const Usuario = mongoose.model("Ususario", usuarioSchema);

export { Usuario };
