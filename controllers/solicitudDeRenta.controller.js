const SolicitudDeRenta = require('../models/solicitudDeRenta.model');
const Room = require('../models/room.model');
const Usuario = require('../models/usuario.model');
const mongoose = require('mongoose');

const guardar = async (req, res) => {
    try {
        const { cuarto, fechaInicio, fechaFin, mensaje } = req.body;

        if (!cuarto || !fechaInicio || !fechaFin) {
            return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
        }

        // Validar que el ID de cuarto sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(cuarto)) {
            return res.status(400).json({ status: 'error', message: 'El ID de cuarto no es válido' });
        }

        const cuartoData = await Room.findById(cuarto);
        if (!cuartoData) {
            return res.status(404).json({ status: 'error', message: 'Cuarto no encontrado' });
        }

        const nueva = new SolicitudDeRenta({
            inquilino: req.user.id,
            cuarto,
            fechaInicio,
            fechaFin,
            mensaje: mensaje || '',
            estado: 'pendiente'
        });

        const guardada = await nueva.save();

        return res.status(201).json({ status: 'success', message: 'Solicitud creada correctamente', data: guardada });
    } catch (error) {
        console.error('Error al guardar solicitud:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const listarTodos = async (req, res) => {
    try {
        const solicitudes = await SolicitudDeRenta.find()
            .populate('inquilino')
            .populate('cuarto')
            .lean();

        return res.status(200).json({ status: 'success', message: 'Lista de solicitudes', data: solicitudes });
    } catch (error) {
        console.error('Error al listar solicitudes:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const BuscarId = async (req, res) => {
    try {
        // Validar que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de solicitud no es válido' });
        }

        const solicitud = await SolicitudDeRenta.findById(req.params.id)
            .populate('inquilino')
            .populate('cuarto')
            .lean();

        if (!solicitud) {
            return res.status(404).json({ status: 'error', message: 'Solicitud no encontrada' });
        }

        return res.status(200).json({ status: 'success', message: 'Solicitud encontrada', data: solicitud });
    } catch (error) {
        console.error('Error al buscar solicitud:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const actualizar = async (req, res) => {
    try {
        // Validar que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de solicitud no es válido' });
        }

        const { estado, motivoRechazo, fechaInicio, fechaFin, mensaje } = req.body;

        if (!estado && !motivoRechazo && !fechaInicio && !fechaFin && !mensaje) {
            return res.status(400).json({ status: 'error', message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const datosActualizar = {};
        if (estado) datosActualizar.estado = estado;
        if (motivoRechazo) datosActualizar.motivoRechazo = motivoRechazo;
        if (fechaInicio) datosActualizar.fechaInicio = fechaInicio;
        if (fechaFin) datosActualizar.fechaFin = fechaFin;
        if (mensaje) datosActualizar.mensaje = mensaje;

        const actualizada = await SolicitudDeRenta.findByIdAndUpdate(
            req.params.id,
            datosActualizar,
            { new: true, runValidators: true }
        ).populate('inquilino').populate('cuarto');

        if (!actualizada) {
            return res.status(404).json({ status: 'error', message: 'Solicitud no encontrada' });
        }

        return res.status(200).json({ status: 'success', message: 'Solicitud actualizada', data: actualizada });
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        // Validar que el ID sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de solicitud no es válido' });
        }

        const eliminada = await SolicitudDeRenta.findByIdAndDelete(req.params.id).lean();

        if (!eliminada) {
            return res.status(404).json({ status: 'error', message: 'Solicitud no encontrada' });
        }

        return res.status(200).json({ status: 'success', message: 'Solicitud eliminada', data: eliminada });
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

module.exports = { guardar, listarTodos, BuscarId, actualizar, eliminar };