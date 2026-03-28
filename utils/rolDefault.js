const RolDB = require("../models/role.model");
const PermisoDB = require("../models/permisos.model");
const { ensureDefaultPermisos } = require("./permsDefault");

async function getOrCreateUserRole() {
  // 1) asegurar permisos
  await ensureDefaultPermisos();

  // ===================== ADMIN =====================
  let adminRole = await RolDB.findOne({ nombre: "ADMIN" });

  if (!adminRole) {
    console.log("⚠️ Creando rol ADMIN...");

    const allPermisos = await PermisoDB.find();

    adminRole = new RolDB({
      nombre: "ADMIN",
      descripcion: "Rol con todos los permisos",
      permisos: allPermisos.map(p => p._id),
      activo: true,
    });

    await adminRole.save();
    console.log("✅ Rol ADMIN creado");
  }

  // ===================== USER =====================
  let userRole = await RolDB.findOne({ nombre: "USER" });

  if (!userRole) {
    console.log("⚠️ Creando rol USER...");

    const permisosBasicos = await PermisoDB.find({
      nombre: {
        $in: [
          "ROOM_LIST",
          "ROOM_CREATE",
          "RENT_LIST",
          "RENT_CREATE",
          "USER_LIST"
        ]
      }
    });

    userRole = new RolDB({
      nombre: "USER",
      descripcion: "Rol con permisos básicos",
      permisos: permisosBasicos.map(p => p._id),
      activo: true,
    });

    await userRole.save();
    console.log("✅ Rol USER creado");
  }

  // ===================== LESSOR =====================
  let lessorRole = await RolDB.findOne({ nombre: "LESSOR" });

  if (!lessorRole) {
    console.log("⚠️ Creando rol LESSOR...");

    const permisosBasicos = await PermisoDB.find({
      nombre: {
        $in: [
          // ---- ROOM ----
          "ROOM_LIST",
          "ROOM_CREATE",
          "ROOM_UPDATE",
          "ROOM_DELETE",
          // ---- RENT ----
          "RENT_LIST",
          "RENT_CREATE",
          "RENT_UPDATE",
          "RENT_DELETE",
          // ---- USER ----
          "USER_LIST",
        ]
      }
    });

    lessorRole = new RolDB({
      nombre: "LESSOR", // ✅ corregido
      descripcion: "Rol con permisos de arrendador",
      permisos: permisosBasicos.map(p => p._id),
      activo: true,
    });

    await lessorRole.save();
    console.log("✅ Rol LESSOR creado");
  }

  return { adminRole, userRole, lessorRole }; // ✅ ahora sí retorna todo
}

module.exports = { getOrCreateUserRole };