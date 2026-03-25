import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  calificacion: {
    type: Number,
    default: 5,
  },
  estado: {
    type: String,
    enum: ["pendiente", "publicado"],
    default: "pendiente",
  },
}, {
  timestamps: true,
});

export default mongoose.model("Comment", commentSchema);