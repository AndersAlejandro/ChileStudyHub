import { Router } from "express";
import {
  getCursos,
  createCurso,
  updateCurso,
  deleteCurso,
} from "../models/cursos.js";
import path from "node:path";
import { subirImagen } from "../cloudinary.js";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await getCursos();

    res.json({
      cursos: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!req.files || !req.files.portada) {
      return res.status(400).json({ message: "No se recibió ninguna imagen" });
    }

    const file = req.files.portada;

    // Ruta temporal donde se guardará la imagen localmente
    const tempPath = path.join(process.cwd(), "temp", file.name);

    // Crear carpeta temporal si no existe
    if (!fs.existsSync(path.dirname(tempPath))) {
      fs.mkdirSync(path.dirname(tempPath), { recursive: true });
    }

    // Guardar el archivo temporalmente
    await file.mv(tempPath);

    // Subir a Cloudinary
    const resultadoCloudinary = await subirImagen(tempPath);

    // Eliminar el archivo temporal
    fs.unlinkSync(tempPath);

    // Guardar URL de Cloudinary en base de datos
    data.portada = resultadoCloudinary.secure_url;

    const result = await createCurso(data);

    res.json({
      message: "Curso creado con éxito",
      portada_url: data.portada,
    });
  } catch (error) {
    console.error("Error en /crearCurso:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/editarCurso/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = {
      ...req.body,
      id_area: parseInt(req.body.id_area, 10),
    };
    if (req.files && req.files.portada) {
      const file = req.files.portada;
      const photoURL = path.join(__dirname, "../static/img", file.name);
      let dbURL = path.join("img", file.name);
      dbURL = dbURL.replace(/\\/g, "/");
      file.mv(photoURL);
      data.portada = dbURL;
    }

    const result = await updateCurso(data, id);
    res.json({
      message: "Actualizado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }
});

router.delete("/eliminarCurso/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteCurso(id);
    res.json({
      message: "Curso eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }
});

export { router };
