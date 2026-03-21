require('dotenv').config();
const mongoose = require('mongoose');

const conection = async () => {
  try {
    const uri = process.env.MONGO_ATLAS; 
    // cambia a MONGO_LOCAL si quieres local

    await mongoose.connect(uri);

    console.log("::: Conectado a MongoDB :::");
  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
    throw new Error("ERROR No se ha podido establecer la conexion a la BD");
  }
};

module.exports = conection;