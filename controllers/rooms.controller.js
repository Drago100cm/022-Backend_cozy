const RoomDb = require('../models/room.model');

//Guardar un nuevo registro
const guardar = async (req, res) => {
    try {
        const { titulo, descripcion, precio, imagen, status, propietario } = req.body;

        // Validar que todos los campos obligatorios estén presentes
        if (!titulo || !descripcion || !precio || !imagen || !status || !propietario) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios",
            });
        }

        const nuevoRoom = new RoomDb({
            titulo,
            descripcion,
            precio,
            imagen,
            status,
            propietario
        });

        const RoomGuardado = await nuevoRoom.save();

        return res.status(201).json({
            status: "success",
            message: "Cuarto guardado exitosamente",
            data: RoomGuardado
        });
    } catch (error) {
        console.log("Error al guardar el cuarto: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        })
    }
}

//Listar todos los registros
const listarTodos = async (req, res) => {
    try {
        const rooms = await RoomDb.find().populate('propietario').lean();
        return res.status(200).json({
            status: "success",
            message: "Lista de cuartos",
            data: rooms
        });
    } catch (error) {
        console.log("Error al listar cuartos: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

//Buscar un registro por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;
        const room = await RoomDb.findById(id).populate('propietario').lean();

        if (!room) {
            return res.status(404).json({
                status: "error",
                message: "Cuarto no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Cuarto encontrado",
            data: room
        });
    } catch (error) {
        console.log("Error al buscar el cuarto: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

//Eliminar un registro por ID
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;
        const eliminada = await RoomDb.findByIdAndDelete(id).lean();

        if (!eliminada) {
            return res.status(404).json({
                status: "error",
                message: "Cuarto no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Cuarto eliminado exitosamente",
            data: eliminada
        });
    } catch (error) {
        console.log("Error al eliminar el cuarto: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

const actualizar = async (req, res) => {
    try {
        const id = req.params.id;   
        const { titulo, descripcion, precio, imagen, status, propietario } = req.body;

        if (!titulo && !descripcion && !precio && !imagen && !status && !propietario) {
            return res.status(400).json(
                {  
                    status: "error",
                    message: "Debe de proporcionar al menos un campo para actualizar",   
                }
            )
        }
        
        const datosactualizar = {};
        if (titulo) datosactualizar.titulo = titulo;
        if (descripcion) datosactualizar.descripcion = descripcion;
        if (precio) datosactualizar.precio = precio;
        if (imagen) datosactualizar.imagen = imagen;
        if (status) datosactualizar.status = status;
        if (propietario) datosactualizar.propietario = propietario;

        // Buscar y actualizar el registro
        const RoomActualizado = await RoomDb.findByIdAndUpdate(id, datosactualizar, {
            new: true,         // Devuelve el objeto actualizado
            runValidators: true // Ejecuta las validaciones del Schema
        }).populate('propietario');
        
        if (!RoomActualizado) {
            return res.status(404).json(
                {
                    status: "error",
                    message: "Cuarto no encontrado en la bd",
                }
            )
        }

        // Enviar una respuesta
        return res.status(200).json(
            {  
                status: "success",
                message: "Cuarto actualizado en la bd",
                data: RoomActualizado
            }
        )
    } catch (error) {
        console.error("Error al actualizar el registro", error);
        return res.status(500).json(
            {
                message: "Error en el servidor",
                error: error.message
            }
        );
    }
};

module.exports = {
    guardar,
    listarTodos,
    BuscarId,
    eliminar,
    actualizar
}