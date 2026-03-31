const Pago = require('../models/pago.model');
const Renta = require('../models/renta.model');
const Room = require('../models/room.model');
const Usuario = require('../models/usuario.model');
const mongoose = require('mongoose');
const { enviarCorreoPago } = require('../services/email.service');

const guardar = async (req, res) => {
    try {
        const { renta, monto, periodoPago, notas, comprobante } = req.body;

        if (!renta || !monto || !periodoPago) {
            return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
        }

        if (!mongoose.Types.ObjectId.isValid(renta)) {
            return res.status(400).json({ status: 'error', message: 'El ID de renta no es válido' });
        }

        const rentaData = await Renta.findById(renta);
        if (!rentaData) {
            return res.status(404).json({ status: 'error', message: 'Renta no encontrada' });
        }

        const nuevoPago = new Pago({
            renta,
            inquilino: req.user.id,
            monto,
            periodoPago,
            notas: notas || '',
            comprobante: comprobante || '',
            estado: 'pendiente'
        });

        const guardado = await nuevoPago.save();

        return res.status(201).json({ status: 'success', message: 'Pago registrado correctamente', data: guardado });
    } catch (error) {
        console.error('Error al guardar pago:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const listarTodos = async (req, res) => {
    try {
        const pagos = await Pago.find()
            .populate('renta')
            .populate('inquilino')
            .lean();

        return res.status(200).json({ status: 'success', message: 'Lista de pagos', data: pagos });
    } catch (error) {
        console.error('Error al listar pagos:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const BuscarId = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de pago no es válido' });
        }

        const pago = await Pago.findById(req.params.id)
            .populate('renta')
            .populate('inquilino')
            .lean();

        if (!pago) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Pago encontrado', data: pago });
    } catch (error) {
        console.error('Error al buscar pago:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const actualizar = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de pago no es válido' });
        }

        const { estado, comprobante, notas, fechaPago } = req.body;

        if (!estado && !comprobante && !notas && !fechaPago) {
            return res.status(400).json({ status: 'error', message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const datosActualizar = {};
        if (estado) datosActualizar.estado = estado;
        if (comprobante) datosActualizar.comprobante = comprobante;
        if (notas) datosActualizar.notas = notas;
        if (fechaPago) datosActualizar.fechaPago = fechaPago;

        const actualizado = await Pago.findByIdAndUpdate(
            req.params.id,
            datosActualizar,
            { new: true, runValidators: true }
        ).populate('renta').populate('inquilino');

        if (!actualizado) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Pago actualizado', data: actualizado });
    } catch (error) {
        console.error('Error al actualizar pago:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de pago no es válido' });
        }

        const eliminado = await Pago.findByIdAndDelete(req.params.id).lean();

        if (!eliminado) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Pago eliminado', data: eliminado });
    } catch (error) {
        console.error('Error al eliminar pago:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const enviarOrdenPago = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de pago no es válido' });
        }

        const pago = await Pago.findById(req.params.id)
            .populate('inquilino')
            .populate('renta');

        if (!pago) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }

        const cuarto = await Room.findById(pago.renta?.cuarto).populate('propietario');

        if (!cuarto) {
            return res.status(404).json({ status: 'error', message: 'Cuarto no encontrado' });
        }

        const propietario = await Usuario.findById(cuarto.propietario);

        if (!propietario?.usuario) {
            return res.status(404).json({ status: 'error', message: 'Propietario no encontrado' });
        }

        await enviarCorreoPago(propietario.usuario, {
            inquilino: pago.inquilino?.nombre || pago.inquilino?.usuario || 'Inquilino',
            cuarto: cuarto.titulo,
            monto: pago.monto,
            periodoPago: pago.periodoPago,
            estado: pago.estado,
            notas: pago.notas,
        });

        return res.status(200).json({
            status: 'success',
            message: 'Orden de pago enviada al propietario correctamente'
        });

    } catch (error) {
        console.error('Error enviando orden de pago:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

module.exports = { guardar, listarTodos, BuscarId, actualizar, eliminar, enviarOrdenPago };