const Product = require('../models/product.model');
const mongoose = require('mongoose');

const guardar = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, stock, disponible } = req.body;

        if (!nombre || !precio) {
            return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios: nombre y precio' });
        }

        const nuevo = new Product({
            nombre,
            descripcion: descripcion || '',
            precio,
            categoria: categoria || '',
            stock: stock || 0,
            disponible: disponible !== undefined ? disponible : true
        });

        const guardado = await nuevo.save();

        return res.status(201).json({ status: 'success', message: 'Producto creado correctamente', data: guardado });
    } catch (error) {
        console.error('Error al guardar producto:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const listarTodos = async (req, res) => {
    try {
        const productos = await Product.find().lean();

        return res.status(200).json({ status: 'success', message: 'Lista de productos', data: productos });
    } catch (error) {
        console.error('Error al listar productos:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const BuscarId = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de producto no es válido' });
        }

        const producto = await Product.findById(req.params.id).lean();

        if (!producto) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Producto encontrado', data: producto });
    } catch (error) {
        console.error('Error al buscar producto:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const actualizar = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de producto no es válido' });
        }

        const { nombre, descripcion, precio, categoria, stock, disponible } = req.body;

        if (!nombre && !descripcion && precio === undefined && !categoria && stock === undefined && disponible === undefined) {
            return res.status(400).json({ status: 'error', message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const datosActualizar = {};
        if (nombre) datosActualizar.nombre = nombre;
        if (descripcion !== undefined) datosActualizar.descripcion = descripcion;
        if (precio !== undefined) datosActualizar.precio = precio;
        if (categoria !== undefined) datosActualizar.categoria = categoria;
        if (stock !== undefined) datosActualizar.stock = stock;
        if (disponible !== undefined) datosActualizar.disponible = disponible;

        const actualizado = await Product.findByIdAndUpdate(
            req.params.id,
            datosActualizar,
            { new: true, runValidators: true }
        );

        if (!actualizado) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Producto actualizado', data: actualizado });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: 'error', message: 'El ID de producto no es válido' });
        }

        const eliminado = await Product.findByIdAndDelete(req.params.id).lean();

        if (!eliminado) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        return res.status(200).json({ status: 'success', message: 'Producto eliminado', data: eliminado });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ status: 'error', message: 'Error en el servidor', error: error.message });
    }
};

module.exports = { guardar, listarTodos, BuscarId, actualizar, eliminar };