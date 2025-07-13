import { Router } from "express";
import { Authorization } from "../middlewares/Authorization.js";
import { inscripcion } from "../models/cursos.js";
const router = Router();
router.post("/:id", Authorization, async (req, res) => {
  const decode = req.decoded;
  const cursoId = req.params.id;
  const userId = decode.id_usuario;

  try {
    const inscripcionUser = await inscripcion(userId, cursoId);
    res.status(200).json({ message: "Inscripción exitosa" });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error al inscribir al usuario",
      error,
    });
  }
});

export { router };
