// models/permiso.model.js
const { Schema, model } = require('mongoose');

const PermisoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true, // 'producto_read' -> 'PRODUCTO_READ'
    },
    recurso: {
      type: String,
      required: true,
      enum: ['RENT', 'ROOM', 'USER', 'ROL', 'PERMISOS', 'PAGO', 'SOLICITUD', 'COMMENT', 'PRODUCTO', 'PROVEEDOR'], // agrega lo que necesites
    },
    accion: {
      type: String,
      required: true,
      enum: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'LIST'],
    },
    descripcion: {
      type: String,
      default: '',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Permiso', PermisoSchema, 'permisos');
