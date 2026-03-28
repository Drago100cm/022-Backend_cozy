import Comment from "../models/comment.model.js";

export const crearComentario = async (req, res) => {
  try {
    const nuevo = new Comment(req.body);
    const guardado = await nuevo.save();
    res.json(guardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerComentariosPorRoom = async (req, res) => {
  try {
    const comentarios = await Comment.find({
      roomId: req.params.roomId,
      estado: "publicado"
    }).populate("userId", "nombre");

    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTodos = async (req, res) => {
  const comentarios = await Comment.find().populate("userId", "nombre");
  res.json(comentarios);
};

export const publicarComentario = async (req, res) => {
  await Comment.findByIdAndUpdate(req.params.id, {
    estado: "publicado",
  });
  res.json({ msg: "Comentario publicado" });
};

export const eliminarComentario = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ msg: "Comentario eliminado" });
};