const RentaDb = require('../models/renta.model');

//Guardar un nuevo registro
const guardar = async (req, res) => {
    try {
        const { fechainicio, fechafin, usuario, cuarto, status } = req.body;

        // Validar que todos los campos obligatorios estén presentes
        if (!fechainicio || !fechafin || !usuario || !cuarto) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios",
            });
        }

        const nuevaRenta = new RentaDb({
            fechainicio,
            fechafin,
            usuario,
            cuarto,
            status: status || 'activa'
        });

        const RentaGuardada = await nuevaRenta.save();

        return res.status(201).json({
            status: "success",
            message: "Renta guardada exitosamente",
            data: RentaGuardada
        });
    } catch (error) {
        console.log("Error al guardar la renta: ", error);
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
        const rentas = await RentaDb.find().populate('usuario').populate('cuarto').lean();
        return res.status(200).json({
            status: "success",
            message: "Lista de rentas",
            data: rentas
        });
    } catch (error) {
        console.log("Error al listar rentas: ", error);
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
        const renta = await RentaDb.findById(id).populate('usuario').populate('cuarto').lean();

        if (!renta) {
            return res.status(404).json({
                status: "error",
                message: "Renta no encontrada"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Renta encontrada",
            data: renta
        });
    } catch (error) {
        console.log("Error al buscar la renta: ", error);
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
        const eliminada = await RentaDb.findByIdAndDelete(id).lean();

        if (!eliminada) {
            return res.status(404).json({
                status: "error",
                message: "Renta no encontrada"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Renta eliminada exitosamente",
            data: eliminada
        });
    } catch (error) {
        console.log("Error al eliminar la renta: ", error);
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
        const {
            fechainicio,
            fechafin,
            status,
            usuario,
            cuarto
        } = req.body;

        // Validar que al menos un campo se haya enviado
        if (
            !fechainicio &&
            !fechafin &&
            !status &&
            !usuario &&
            !cuarto
        ) {
            return res.status(400).json({
                status: "error",
                message: "Debe proporcionar al menos un campo para actualizar",
            });
        }

        // Construir objeto dinámico con los campos que sí vienen
        const datosactualizar = {};
        if (fechainicio) datosactualizar.fechainicio = fechainicio;
        if (fechafin) datosactualizar.fechafin = fechafin;
        if (status) datosactualizar.status = status;
        if (usuario) datosactualizar.usuario = usuario;
        if (cuarto) datosactualizar.cuarto = cuarto;

        // Buscar y actualizar el registro
        const rentaActualizada = await RentaDb.findByIdAndUpdate(
            id,
            datosactualizar,
            {
                new: true,          // Devuelve el objeto actualizado
                runValidators: true // Ejecuta validaciones del schema
            }
        ).populate('usuario').populate('cuarto');

        if (!rentaActualizada) {
            return res.status(404).json({
                status: "error",
                message: "Renta no encontrada en la base de datos",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Renta actualizada correctamente",
            data: rentaActualizada,
        });

    } catch (error) {
        console.error("Error al actualizar la renta:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message,
        });
    }
};


module.exports = {
    guardar,
    listarTodos,
    BuscarId,
    eliminar,
    actualizar
}