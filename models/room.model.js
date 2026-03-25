const { Schema, model } = require('mongoose');
const status = require('statuses');

const RoomSchema = new Schema({
    titulo: {type: String,required: true,trim: true},
    descripcion: {type: String,required: true,trim: true},
    precio: {type: Number,required: true,min: 0},
    status: {type: String,enum: ['disponible', 'no disponible']},
    propietario: {type: Schema.Types.ObjectId,ref: 'Usuario',required: true},
    // Ubicación (clave para tu contexto local)
    direccion: {type: String,required: true,trim: true},
    colonia: {type: String,required: true,trim: true},
    referencias: {type: String,trim: true},
    // Información del cuarto
    capacidad: {type: Number,min: 1},
    // Servicios
    servicios: [{type: String,enum: ["agua", "luz", "internet", "gas"]}],
    incluyeServicios: {type: Boolean,default: false},
    //  Extras importantes
    amueblado: {type: Boolean,default: false},
    //  Tipo de renta (más realista para tu zona)
    tipoRenta: {type: String,enum: ["mensual", "semanal"],default: "mensual"},
    //  Múltiples imágenes (mejor que una sola)
    imagen: [{type: String}],
    publicado: {type: Boolean,default: true}
});

module.exports = model('Room', RoomSchema, 'rooms');