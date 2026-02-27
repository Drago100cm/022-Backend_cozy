const RolDB = require("../models/role.model");
const PermisoDB = require("../models/permisos.model");

// Registrar / crear un nuevo rol// controllers/permiso.controller.js// controllers/permiso.controller.js
const guardar = async (req, res) => {
    try {
        const { nombre, descripcion, permisos, activo } = req.body;

        // Validar nombre obligatorio
        if (!nombre) {
            return res.status(400).json({
                status: "error",
                message: "El nombre del rol es obligatorio"
            });
        }

        // Verificar si el rol ya existe
        const existe = await RolDB.findOne({ nombre: nombre.toUpperCase() }).lean();
        if (existe) {
            return res.status(400).json({
                status: "error",
                message: "Ya existe un rol con ese nombre"
            });
        }

        // Validar permisos si vienen
        let permisosValidos = [];
        if (Array.isArray(permisos) && permisos.length > 0) {
            const encontrados = await PermisoDB.find({
                _id: { $in: permisos },
                activo: true
            }).lean();

            if (encontrados.length !== permisos.length) {
                return res.status(400).json({
                    status: "error",
                    message: "Uno o más permisos no existen o están inactivos"
                });
            }

            permisosValidos = permisos;
        }

        const nuevoRol = new RolDB({
            nombre,
            descripcion: descripcion || "",
            permisos: permisosValidos,
            activo: typeof activo === "boolean" ? activo : true
        });

        const rolGuardado = await (await nuevoRol.save()).populate("permisos");

        return res.status(201).json({
            status: "success",
            message: "Rol registrado exitosamente",
            data: rolGuardado
        });

    } catch (error) {
        console.log("Error al registrar rol: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};
// Listar todos los roles
const listar = async (req, res) => {
    try {
        const roles = await RolDB.find()
            .populate("permisos")
            .lean()
            .sort({ nombre: 1 });

        return res.status(200).json({
            status: "success",
            message: "Lista de roles",
            data: roles
        });
    } catch (error) {
        console.log("Error al listar roles: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Buscar rol por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;

        const rol = await RolDB.findById(id)
            .populate("permisos")
            .lean();

        if (!rol) {
            return res.status(404).json({
                status: "error",
                message: "Rol no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Rol encontrado",
            data: rol
        });
    } catch (error) {
        console.log("Error al buscar rol por ID: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Actualizar rol
const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, permisos, activo } = req.body;

        const datosActualizar = {};

        if (nombre) datosActualizar.nombre = nombre;
        if (descripcion !== undefined) datosActualizar.descripcion = descripcion;
        if (typeof activo === "boolean") datosActualizar.activo = activo;

        // Actualizar permisos si vienen
        if (Array.isArray(permisos)) {
            if (permisos.length > 0) {
                const encontrados = await PermisoDB.find({
                    _id: { $in: permisos },
                    activo: true
                }).lean();

                if (encontrados.length !== permisos.length) {
                    return res.status(400).json({
                        status: "error",
                        message: "Uno o más permisos no existen o están inactivos"
                    });
                }
                datosActualizar.permisos = permisos;
            } else {
                // si mandan [], limpiamos permisos
                datosActualizar.permisos = [];
            }
        }

        const actualizado = await RolDB.findByIdAndUpdate(id, datosActualizar, {
            new: true,
            runValidators: true
        }).populate("permisos");

        if (!actualizado) {
            return res.status(404).json({
                status: "error",
                message: "Rol no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Rol actualizado correctamente",
            data: actualizado
        });

    } catch (error) {
        console.log("Error al actualizar rol:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Eliminar rol
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;

        const eliminado = await RolDB.findByIdAndDelete(id).lean();

        if (!eliminado) {
            return res.status(404).json({
                status: "error",
                message: "Rol no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Rol eliminado exitosamente",
            data: eliminado
        });

    } catch (error) {
        console.log("Error al eliminar rol:", error);
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
