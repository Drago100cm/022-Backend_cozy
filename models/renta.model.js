const { Schema, model } = require('mongoose');

const RentaSchema = new Schema({
    // Información básica de la renta
    fechainicio:  { type: Date, required: true },
    fechafin:     { type: Date, required: true },
    usuario:      { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    cuarto:       { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    solicitud:    { type: Schema.Types.ObjectId, ref: 'SolicitudDeRenta' }, // opcional, viene de solicitud aprobada
    montoPorMes:  { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ['activa', 'proxima', 'finalizada', 'cancelada'],
        default: 'proxima'
    },
}, { timestamps: true });

module.exports = model('Renta', RentaSchema, 'rentas');