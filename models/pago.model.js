const { Schema, model } = require('mongoose');

const PagoSchema = new Schema({
    renta:     { type: Schema.Types.ObjectId, ref: 'Renta', required: true },
    inquilino: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    monto:     { type: Number, required: true, min: 0 },
    periodoPago: { type: String, required: true }, // ej: "2025-03"
    fechaPago:   { type: Date },
    estado: {
        type: String,
        enum: ['pendiente', 'enviado', 'validando', 'pagado', 'fallido', 'reembolsado'],
        default: 'pendiente'
    },
    comprobante: { type: String },  // URL del archivo/imagen
    notas:       { type: String, trim: true },
}, { timestamps: true });

module.exports = model('Pago', PagoSchema, 'pagos');