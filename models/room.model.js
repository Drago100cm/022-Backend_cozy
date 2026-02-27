const { Schema, model } = require('mongoose');
const status = require('statuses');

const RoomSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['disponible', 'no disponible']
    },
    propietario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

module.exports = model('Room', RoomSchema, 'rooms');