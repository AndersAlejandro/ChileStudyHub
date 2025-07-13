import { Router } from "express";
import { Authorization } from "../middlewares/Authorization.js";

import {
  getCursos,
  getAreaCurso,
  getCursoID,
  getFiltroCurso,
  inscripcion,
  cursosInscritos,
  estaInscrito,
} from "../models/cursos.js";

const router = Router();

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/login/admin", async (req, res) => {
  res.render("login", {
    usuarioDefault: "profesor@demo.com",
    contrasenaDefault: "profesor123",
  });
});

router.get("/register", async (req, res) => {
  res.render("register");
});

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
      decode: decode,
    });
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
});

router.get("/crearCurso", Authorization, async (req, res) => {
  const decode = req.decoded;
  const areaCurso = await getAreaCurso();
  res.render("crearCurso", {
    areaCurso: areaCurso.rows,
    decode: decode,
  });
});
router.get("/editarCurso/:id", Authorization, async (req, res) => {
  const decode = req.decoded;
  const id = req.params.id;
  try {
    const areaCurso = await getAreaCurso();
    const cursoId = await getCursoID(id);

    res.render("editarCurso", {
      cursoId: cursoId.rows,
      areaCurso: areaCurso.rows,
      decode: decode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error al editar el curso",
      error,
    });
  }
});

router.get("/curso/:id", Authorization, async (req, res) => {
  const decode = req.decoded;
  const cursoId = req.params.id;
  const userId = decode.id_usuario;

  try {
    const curso = await getCursoID(cursoId);
    const cursoData = curso.rows[0];

    const opcionesFecha = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Santiago",
    };

    const fechaInicioFormateada = new Date(
      cursoData.fecha_inicio
    ).toLocaleDateString("es-CL", opcionesFecha);
    const fechaTerminoFormateada = new Date(
      cursoData.fecha_termino
    ).toLocaleDateString("es-CL", opcionesFecha);

    cursoData.fecha_inicio_formateada = fechaInicioFormateada;
    cursoData.fecha_termino_formateada = fechaTerminoFormateada;

    const cursoOcultar = await estaInscrito(userId, cursoId);

    res.render("cursoID", {
      cursoID: cursoData,
      estaInscrito: cursoOcultar,
      decode: decode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error al obtener el curso",
      error,
    });
  }
});

router.get("/inscripciones", Authorization, async (req, res) => {
  const decode = req.decoded;
  const userId = decode.id_usuario;

  try {
    const vercursosInscritos = await cursosInscritos(userId);
    res.render("inscripciones", {
      cursosInscritos: vercursosInscritos.rows,
      decode: decode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Error al obtener las inscripciones",
      error,
    });
  }
});

export { router };
