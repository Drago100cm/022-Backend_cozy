const { Schema, model } = require('mongoose');

const RentaSchema = new Schema({
    // Información básica de la renta
    fechainicio:  { type: Date },
    fechafin:     { type: Date },
    usuario:      { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    cuarto:       { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    status: {
        type: String,
        enum: ["pendiente",
"aprobada",
"rechazada",
"activa",
"finalizada",
"cancelada"],
        default: 'pendiente'
    },
}, { timestamps: true });

module.exports = model('Renta', RentaSchema, 'rentas');