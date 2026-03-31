const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    precio: { type: Number, required: true, min: 0 },
    categoria: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    disponible: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = model('Product', ProductSchema, 'productos');