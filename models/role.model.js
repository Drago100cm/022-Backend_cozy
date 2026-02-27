// models/rol.model.js
const { Schema, model } = require('mongoose');

const RolSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true, // 'admin' -> 'ADMIN'
    },
    descripcion: {
      type: String,
      default: '',
    },
    permisos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permiso',
      }
    ],
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Rol', RolSchema, 'roles');
