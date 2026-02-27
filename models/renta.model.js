const { Schema, model } = require('mongoose');
const status = require('statuses');

const Rentachema = new Schema({
    // Información básica de la renta
    fechainicio: {
        type: Date,
        required: true,  
    },
    fechafin: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['activa', 'finalizada', 'cancelada'],
        default: 'activa'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',     
        required: true
    },
    cuarto: {
        type: Schema.Types.ObjectId,
        ref: 'Room',     
        required: true
    },
    
});

module.exports = model('Renta', Rentachema, 'rentas');