// utils/permisosDefault.js
const Permiso = require('../models/permisos.model');

const PERMISOS_DEFAULT = [
  // ---- ROOM ----
  { nombre: 'ROOM_LIST',   recurso: 'ROOM', accion: 'LIST',   descripcion: 'Listar habitaciones' },
  { nombre: 'ROOM_CREATE', recurso: 'ROOM', accion: 'CREATE', descripcion: 'Crear habitaciones' },
  { nombre: 'ROOM_UPDATE', recurso: 'ROOM', accion: 'UPDATE', descripcion: 'Actualizar habitaciones' },
  { nombre: 'ROOM_DELETE', recurso: 'ROOM', accion: 'DELETE', descripcion: 'Eliminar habitaciones' },

  // ---- RENT ----
  { nombre: 'RENT_LIST',   recurso: 'RENT', accion: 'LIST',   descripcion: 'Listar rentas' },
  { nombre: 'RENT_CREATE', recurso: 'RENT', accion: 'CREATE', descripcion: 'Crear rentas' },
  { nombre: 'RENT_UPDATE', recurso: 'RENT', accion: 'UPDATE', descripcion: 'Actualizar rentas' },
  { nombre: 'RENT_DELETE', recurso: 'RENT', accion: 'DELETE', descripcion: 'Eliminar rentas' },

  // ---- USER ----
  { nombre: 'USER_LIST',   recurso: 'USER', accion: 'LIST',   descripcion: 'Listar usuarios' },
  { nombre: 'USER_CREATE', recurso: 'USER', accion: 'CREATE', descripcion: 'Crear usuarios' },
  { nombre: 'USER_UPDATE', recurso: 'USER', accion: 'UPDATE', descripcion: 'Actualizar usuarios' },
  { nombre: 'USER_DELETE', recurso: 'USER', accion: 'DELETE', descripcion: 'Eliminar usuarios' },

  // ---- ROL ----
  { nombre: 'ROL_LIST',   recurso: 'ROL', accion: 'LIST',   descripcion: 'Listar roles' },
  { nombre: 'ROL_CREATE', recurso: 'ROL', accion: 'CREATE', descripcion: 'Crear roles' },
  { nombre: 'ROL_UPDATE', recurso: 'ROL', accion: 'UPDATE', descripcion: 'Actualizar roles' },
  { nombre: 'ROL_DELETE', recurso: 'ROL', accion: 'DELETE', descripcion: 'Eliminar roles' },

  // ---- PERMISOS ----
  { nombre: 'PERMISOS_LIST',   recurso: 'PERMISOS', accion: 'LIST',   descripcion: 'Listar permisos' },
  { nombre: 'PERMISOS_CREATE', recurso: 'PERMISOS', accion: 'CREATE', descripcion: 'Crear permisos' },
  { nombre: 'PERMISOS_UPDATE', recurso: 'PERMISOS', accion: 'UPDATE', descripcion: 'Actualizar permisos' },
  { nombre: 'PERMISOS_DELETE', recurso: 'PERMISOS', accion: 'DELETE', descripcion: 'Eliminar permisos' },




];

async function ensureDefaultPermisos() {
  const creados = [];
  for (const p of PERMISOS_DEFAULT) {
    const doc = await Permiso.findOneAndUpdate(
      { nombre: p.nombre },
      p,
      { upsert: true, new: true }
    );
    creados.push(doc);
  }
  return creados;
}

module.exports = { ensureDefaultPermisos, PERMISOS_DEFAULT };
