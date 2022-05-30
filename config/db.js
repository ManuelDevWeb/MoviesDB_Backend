// Importando ODM mongoose
import mongoose from "mongoose";

// Funcion para conectar a la base de datos
const connectDB = async () => {
  try {
    // Conectandonos a la DB con mongoose
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });

    // Almacenando la info de la conexion de la DB
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`Conectado a la DB: ${url}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // Forzar cierre del proceso
    process.exit(1);
  }
};

// Exportando funcion connectDB
export { connectDB };
