// utils/rolesDefault.js
const RolDB = require("../models/role.model");
const PermisoDB = require("../models/permisos.model");
const { ensureDefaultPermisos } = require("./permsDefault");

async function getOrCreateUserRole() {
  let rol = await RolDB.findOne({ nombre: "ADMIN" });
  if (rol) return rol;

  console.log("⚠️ Rol ADMIN no existe, creando automáticamente...");

  // 1) asegurar que existan los permisos por defecto
  await ensureDefaultPermisos();

  // 2) ahora sí, buscar los que quieres que tenga USER
  const permisosBasicos = await PermisoDB.find({
    nombre: {
      $in: [
        //ROOM
        "ROOM_LIST",
        "ROOM_CREATE",
        "ROOM_UPDATE",
        "ROOM_DELETE",
        //RENT
        "RENT_LIST",
        "RENT_CREATE",
        "RENT_UPDATE",
        "RENT_DELETE",

        // USER
        "USER_LIST",
        "USER_CREATE",
        "USER_UPDATE",
        "USER_DELETE",

        // ROL
        "ROL_LIST",
        "ROL_CREATE",
        "ROL_UPDATE",
        "ROL_DELETE",

        // PERMISOS
        "PERMISOS_LIST",
        "PERMISOS_CREATE",
        "PERMISOS_UPDATE",
        "PERMISOS_DELETE",
      ],
    }
  });

  rol = new RolDB({
    nombre: "ADMIN",
    descripcion: "Rol predefinido con permisos ",
    permisos: permisosBasicos.map(p => p._id),
    activo: true,
  });

  rol = await rol.save();
  console.log("✅ Rol USER creado automáticamente:", rol._id);

  return rol;
}

module.exports = { getOrCreateUserRole };
