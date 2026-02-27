//1.- Requerir mongoose.
const mongoose = require('mongoose');

//2.- Crear funcion para conectar a la base de datos.
const conection= async() => {
    console.log("Desde la funcion Conection, Intentando conectar");
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/DB-Cozy_House");
        console.log("::: Conexion a la base de datos establecida :::");
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
        throw new error("::: ERROR No se ha podido establecer la conexion a la BD :::");
    }
}

//3.- Exportar la funcion(modulo) para utilizarla en otro archivo.
module.exports = conection;