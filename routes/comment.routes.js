import { Router } from "express";
import {
    crearComentario,
    eliminarComentario,
    obtenerComentariosPorRoom,
    obtenerTodos,
    publicarComentario
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/", crearComentario);
router.get("/room/:roomId", obtenerComentariosPorRoom);
router.get("/", obtenerTodos);
router.put("/publicar/:id", publicarComentario);
router.delete("/:id", eliminarComentario);

export default router;