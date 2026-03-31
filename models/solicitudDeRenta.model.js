const { Schema, model } = require('mongoose');

const SolicitudDeRentaSchema = new Schema({
    inquilino: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    cuarto: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    estado: {
        type: String,
        enum: ['pendiente', 'en_revision', 'aprobada', 'rechazada', 'cancelada', 'vencida'],
        default: 'pendiente'
    },
    mensaje: { type: String, trim: true }, // mensaje del inquilino al solicitar
    motivoRechazo: { type: String, trim: true }, // solo si estado = rechazada
}, { timestamps: true });

module.exports = model('SolicitudDeRenta', SolicitudDeRentaSchema, 'solicitudes_renta');