const Provider = require('../models/provider.model');
const mongoose = require('mongoose');

const guardar = async (req, res) => {
    try {
        const { nombre, contacto, email, telefono, direccion, activo } = req.body;

        if (!nombre) {
            return res.status(400).json({ status: 'error', message: 'Falta el campo obligatorio: nombre' });
        }

        const nuevo = new Provider({
            nombre,
            contacto: contacto || '',
            email: email || '',
            telefono: telefono || '',
            direccion: direccion || '',
            activo: activo !== undefined ? activo : true
        });

        const guardado = await nuevo.save();

        return res.status(201).json({ status: 'success', message: 'Proveedor creado correctamente', data: guardado });
    } catch (error) {
        console.error('Error al guardar proveedor:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const listarTodos = async (req, res) => {
    try {
        const proveedores = await Provider.find().lean();

        return res.status(200).json({ status: 'success', message: 'Lista de proveedores', data: proveedores });
    } catch (error) {
        console.error('Error al listar proveedores:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const BuscarId = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de proveedor no es válido' });
        }

        const proveedor = await Provider.findById(req.params.id).lean();

        if (!proveedor) {
            return res.status(404).json({ status: 'error', message: 'Proveedor no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Proveedor encontrado', data: proveedor });
    } catch (error) {
        console.error('Error al buscar proveedor:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const actualizar = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de proveedor no es válido' });
        }

        const { nombre, contacto, email, telefono, direccion, activo } = req.body;

        if (!nombre && !contacto && !email && !telefono && !direccion && activo === undefined) {
            return res.status(400).json({ status: 'error', message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const datosActualizar = {};
        if (nombre) datosActualizar.nombre = nombre;
        if (contacto !== undefined) datosActualizar.contacto = contacto;
        if (email !== undefined) datosActualizar.email = email;
        if (telefono !== undefined) datosActualizar.telefono = telefono;
        if (direccion !== undefined) datosActualizar.direccion = direccion;
        if (activo !== undefined) datosActualizar.activo = activo;

        const actualizado = await Provider.findByIdAndUpdate(
            req.params.id,
            datosActualizar,
            { new: true, runValidators: true }
        );

        if (!actualizado) {
            return res.status(404).json({ status: 'error', message: 'Proveedor no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Proveedor actualizado', data: actualizado });
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de proveedor no es válido' });
        }

        const eliminado = await Provider.findByIdAndDelete(req.params.id).lean();

        if (!eliminado) {
            return res.status(404).json({ status: 'error', message: 'Proveedor no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Proveedor eliminado', data: eliminado });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

module.exports = { guardar, listarTodos, BuscarId, actualizar, eliminar };