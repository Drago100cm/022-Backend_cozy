const CommentDb = require("../models/comment.model");

// Guardar un nuevo registro
const guardar = async (req, res) => {
    try {
        const { roomId, userId, texto, calificacion, estado } = req.body;

        // Validar campos obligatorios
        if (!roomId || !userId || !texto) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios",
            });
        }

        const nuevoComentario = new CommentDb({
            roomId,
            userId,
            texto,
            calificacion,
            estado
        });

        const comentarioGuardado = await nuevoComentario.save();

        return res.status(201).json({
            status: "success",
            message: "Comentario guardado exitosamente",
            data: comentarioGuardado
        });

    } catch (error) {
        console.log("Error al guardar el comentario: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Listar todos los registros
const listarTodos = async (req, res) => {
    try {
        const comentarios = await CommentDb.find()
            .populate("userId", "nombre")
            .populate("roomId", "titulo")
            .lean();

        return res.status(200).json({
            status: "success",
            message: "Lista de comentarios",
            data: comentarios
        });

    } catch (error) {
        console.log("Error al listar comentarios: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Buscar un comentario por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;

        const comentario = await CommentDb.findById(id)
            .populate("userId", "nombre")
            .populate("roomId", "titulo")
            .lean();

        if (!comentario) {
            return res.status(404).json({
                status: "error",
                message: "Comentario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Comentario encontrado",
            data: comentario
        });

    } catch (error) {
        console.log("Error al buscar comentario: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Eliminar un registro por ID
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;

        const eliminado = await CommentDb.findByIdAndDelete(id).lean();

        if (!eliminado) {
            return res.status(404).json({
                status: "error",
                message: "Comentario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Comentario eliminado exitosamente",
            data: eliminado
        });

    } catch (error) {
        console.log("Error al eliminar comentario: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Actualizar un comentario
const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const { texto, calificacion, estado } = req.body;

        // Validar que al menos un campo venga
        if (!texto && calificacion === undefined && !estado) {
            return res.status(400).json({
                status: "error",
                message: "Debe proporcionar al menos un campo para actualizar"
            });
        }

        const datosActualizar = {};

        if (texto) datosActualizar.texto = texto;
        if (calificacion !== undefined) datosActualizar.calificacion = calificacion;
        if (estado) datosActualizar.estado = estado;

        const comentarioActualizado = await CommentDb.findByIdAndUpdate(
            id,
            datosActualizar,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("userId", "nombre")
        .populate("roomId", "titulo");

        if (!comentarioActualizado) {
            return res.status(404).json({
                status: "error",
                message: "Comentario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Comentario actualizado",
            data: comentarioActualizado
        });

    } catch (error) {
        console.error("Error al actualizar comentario", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};
const obtenerPorRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const comentarios = await CommentDb.find({
      roomId
    })
      .populate("userId", "nombre")
      .lean();

    return res.status(200).json({
      status: "success",
      data: comentarios
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener comentarios",
      error: error.message
    });
  }
};
//aqi
module.exports = {
  guardar,
  listarTodos,
  BuscarId,
  eliminar,
  actualizar,
  obtenerPorRoom
};