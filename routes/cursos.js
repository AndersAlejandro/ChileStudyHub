import { Router } from "express";
import { getCursos, createCurso, updateCurso, deleteCurso } from "../models/cursos.js";
import path from 'node:path'

import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router()

router.get("/", async (req, res) => {
    try {
        const result = await getCursos()

        res.json({
            cursos: result.rows
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const file = req.files.portada;
        const photoURL = path.join(__dirname, "../static/img", file.name);

        let dbURL = path.join("img", file.name);
        dbURL = dbURL.replace(/\\/g, '/');
        file.mv(photoURL);
        data.portada = dbURL;
        const result = await createCurso(data);

        res.json({
            message: 'Creado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
        console.error(error);
    }
});

router.put("/editarCurso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        
        console.log(`Esto es el ID: ${id}`);
        const data = {
            ...req.body,
            id_area: parseInt(req.body.id_area, 10)
        };
        if (req.files && req.files.portada) {
            const file = req.files.portada;
            const photoURL = path.join(__dirname, "../static/img", file.name);
            let dbURL = path.join("img", file.name);
            dbURL = dbURL.replace(/\\/g, '/');
            file.mv(photoURL);
            data.portada = dbURL;
        }
        console.log("Datos recibidos:", data);

        const result = await updateCurso(data, id)
        res.json({
            message: 'Actualizado con éxito'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})

router.delete("/eliminarCurso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteCurso(id)
        console.log(`el id es ${id}`)
        res.json({
            message: 'Curso eliminado'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})

export { router }