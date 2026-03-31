const { Schema, model } = require('mongoose');

const ProviderSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    contacto: { type: String, trim: true },
    email: { type: String, trim: true },
    telefono: { type: String, trim: true },
    direccion: { type: String, trim: true },
    activo: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = model('Provider', ProviderSchema, 'proveedores');