import { Router } from "express";
import { Authorization } from "../middlewares/Authorization.js";

import { getCursos, getAreaCurso, getCursoID, getFiltroCurso, inscripcion, cursosInscritos } from "../models/cursos.js";

const router = Router()

router.get("/", async (req, res) => {
    res.render("home")
})

router.get("/login", async (req, res) => {
    res.render("login")
})

router.get("/register", async (req, res) => {
    res.render("register")
})

router.get("/cursos", Authorization, async (req, res) => {
    const decode = req.decoded;
    const id_area = req.query.area;

    try {
        let cursos;

        
        if (!id_area || id_area === "") {
            
            cursos = await getCursos(); 
        } else {

            cursos = await getFiltroCurso(id_area);
        }
        const areaCurso = await getAreaCurso();
        res.render("cursos", {
            cursos: cursos.rows,
            areaCurso: areaCurso.rows,
            decode: decode
        });
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
});



router.get("/crearCurso", Authorization, async (req, res) => {
    const decode = req.decoded
    const areaCurso = await getAreaCurso()
    res.render("crearCurso", {
        areaCurso: areaCurso.rows,
        decode: decode

    })
})
router.get("/editarCurso/:id", Authorization, async (req,res) => {
    const decode = req.decoded;
    const id = req.params.id;
    try {
        const areaCurso = await getAreaCurso()
        const cursoId = await getCursoID(id)
        
        res.render("editarCurso", {
            cursoId: cursoId.rows,
            areaCurso: areaCurso.rows,
            decode: decode
            
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("error", {
            message: 'Error al editar el curso',
            error
        });
    }
})

router.get("/curso/:id", Authorization, async (req, res) => {
    const decode = req.decoded;
    const id = req.params.id;

    try {
        const curso = await getCursoID(id);       
        res.render("cursoID", {
            cursoID: curso.rows[0],
            decode: decode
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("error", {
            message: 'Error al obtener el curso',
            error
        });
    }
});

router.get("/inscribirse/:id", Authorization, async (req, res) => {
    const decode = req.decoded;
    const cursoId = req.params.id;
    const userId = decode.id_usuario;

    try {
        const inscripcionUser = await inscripcion(userId, cursoId);
        console.log(`ola${cursoId}${userId}`)
        res.redirect(`/curso/${cursoId}`);
    } catch (error) {
        console.error(error);
        res.status(500).render("error", {
            message: 'Error al inscribir al usuario',
            error
        });
    }
});

router.get("/inscripciones", Authorization, async (req, res) => {
    const decode = req.decoded;
    const userId = decode.id_usuario;

    try {
        const vercursosInscritos = await cursosInscritos(userId)
        console.log(vercursosInscritos.rows)
        res.render("inscripciones", {
            cursosInscritos: vercursosInscritos.rows,
            decode: decode
        })
    } catch (error) {
        console.error(error);
        res.status(500).render("error", {
            message: 'Error al obtener las inscripciones',
            error
        });
    }
})

export { router }