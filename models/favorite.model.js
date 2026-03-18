const { Schema, model } = require("mongoose");

const FavoritoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  cuarto: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true
  }
}, { timestamps: true });
module.exports = model("Favorito", FavoritoSchema, "favoritos");