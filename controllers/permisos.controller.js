// controllers/permiso.controller.js
const PermisoDB = require("../models/permisos.model");

// Opcional: define aquí los valores válidos (debes alinearlos con tu schema)
const RECURSOS_VALIDOS = ['RENT', 'ROOM', 'USER', 'ROLE', 'PERMISSION', 'PAYMENT', 'COMMENT', 'PRODUCT', 'PROVIDER', 'ADMIN']; // agrega lo que necesites
const ACCIONES_VALIDAS = ['CREATE', 'READ', 'UPDATE', 'DELETE', 'LIST'];

// Registrar / crear un nuevo permiso
const guardar = async (req, res) => {
  try {
    const { recurso, accion, descripcion, activo } = req.body;

    if (!recurso || !accion) {
      return res.status(400).json({
        status: "error",
        message: "Recurso y acción son obligatorios",
      });
    }

    const nombre = `${recurso}_${accion}`.toUpperCase();

    const existe = await PermisoDB.findOne({ nombre }).lean();
    if (existe) {
      return res.status(400).json({
        status: "error",
        message: "Ya existe un permiso con ese recurso y acción",
      });
    }

    const nuevoPermiso = new PermisoDB({
      nombre,                     
      recurso,
      accion,
      descripcion: descripcion || "",
      activo: typeof activo === "boolean" ? activo : true,
    });

    const permisoGuardado = await nuevoPermiso.save();

    return res.status(201).json({
      status: "success",
      message: "Permiso registrado exitosamente",
      data: permisoGuardado,
    });
  } catch (error) {
    console.log("Error al registrar permiso: ", error);
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor",
      error: error.message,
    });
  }
};


// Listar todos los permisos
const listar = async (req, res) => {
    try {
        const permisos = await PermisoDB.find().lean().sort({ recurso: 1, nombre: 1 });

        return res.status(200).json({
            status: "success",
            message: "Lista de permisos",
            data: permisos
        });
    } catch (error) {
        console.log("Error al listar permisos: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Buscar permiso por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;
        const permiso = await PermisoDB.findById(id).lean();

        if (!permiso) {
            return res.status(404).json({
                status: "error",
                message: "Permiso no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Permiso encontrado",
            data: permiso
        });
    } catch (error) {
        console.log("Error al buscar permiso por ID: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Actualizar permiso
const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, recurso, accion, descripcion, activo } = req.body;

        const datosActualizar = {};

        if (nombre) datosActualizar.nombre = nombre;
        if (descripcion !== undefined) datosActualizar.descripcion = descripcion;
        if (typeof activo === "boolean") datosActualizar.activo = activo;

        if (recurso) {
            if (!RECURSOS_VALIDOS.includes(recurso)) {
                return res.status(400).json({
                    status: "error",
                    message: `Recurso inválido. Valores permitidos: ${RECURSOS_VALIDOS.join(", ")}`
                });
            }
            datosActualizar.recurso = recurso;
        }

        if (accion) {
            if (!ACCIONES_VALIDAS.includes(accion)) {
                return res.status(400).json({
                    status: "error",
                    message: `Acción inválida. Valores permitidos: ${ACCIONES_VALIDAS.join(", ")}`
                });
            }
            datosActualizar.accion = accion;
        }

        const actualizado = await PermisoDB.findByIdAndUpdate(id, datosActualizar, {
            new: true,
            runValidators: true
        }).lean();

        if (!actualizado) {
            return res.status(404).json({
                status: "error",
                message: "Permiso no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Permiso actualizado correctamente",
            data: actualizado
        });

    } catch (error) {
        console.log("Error al actualizar permiso:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Eliminar un permiso por ID
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;

        const eliminado = await PermisoDB.findByIdAndDelete(id).lean();

        if (!eliminado) {
            return res.status(404).json({
                status: "error",
                message: "Permiso no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Permiso eliminado exitosamente",
            data: eliminado
        });
    } catch (error) {
        console.log("Error al eliminar permiso:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

module.exports = {
    guardar,
    listar,
    BuscarId,
    actualizar,
    eliminar
};
