// const {Schema, model} = require('mongoose');

// const UsuarioSchema = new Schema(
//     {
//         nombre: {type: String,required: true,trim: true},

//         usuario: {type: String,required: true,unique: true,trim: true},

//         password: {type: String,required: true},

//         rol: {type: String,required: true,enum: ["admin", "gerente", "cajero"],default: "cajero"},

//         roles: {type: Schema.Types.ObjectId,ref: 'Rol',required: false,},
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = model("Usuario", UsuarioSchema, "usuarios");
const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    // 🧍 Datos básicos
    nombre: {type: String,required: true,trim: true,},

    usuario: {type: String,required: true,unique: true,trim: true,},

    password: {type: String,required: true,},

    telefono: {type: String,default: "",},

    fotoPerfil: {type: String,default: "",},

    descripcion: {type: String,trim: true,default: "",},

    // 👤 Tipo de usuario (clave para tu app)
    tipoUsuario: {type: String,enum: ["arrendador", "cliente"],default: "cliente",},

    // 🏷️ Roles (si sigues usando permisos)
    rol: {type: String,enum: ["admin", "gerente", "cajero"],default: "cajero",},

    roles: {type: Schema.Types.ObjectId,ref: "Rol",},

    // 🏡 Relaciones con propiedades
    room: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    favoritos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    // 🔐 Seguridad y control
    verificado: {
      type: Boolean,
      default: true,
    },
    type_User: {
      type: Boolean,
      default: true,
    },

    estado: {
      type: Boolean,
      default: true,
    },

    ultimoLogin: {
      type: Date,
    },

    intentosLogin: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Usuario", UsuarioSchema, "usuarios");