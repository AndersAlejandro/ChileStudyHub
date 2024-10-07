import * as db from '../db/db.js';

export const createCurso = async (data) => {
    const { nombre, descripcion, fecha_inicio, fecha_termino, portada, id_area } = data
    const text = "INSERT INTO cursos (nombre, descripcion, fecha_inicio, fecha_termino, portada, id_area) VALUES ($1, $2, $3, $4, $5, $6)"
    const values = [
        nombre,
        descripcion,
        fecha_inicio,
        fecha_termino,
        portada,
        id_area
    ]
    const result = await db.query(text, values)
    return result
}

export const updateCurso = async (data,id) => {
    const { nombre, descripcion, fecha_inicio, fecha_termino,portada, id_area} = data
    const text = "UPDATE cursos SET nombre = $1, descripcion = $2, fecha_inicio = $3, fecha_termino = $4, portada = $5, id_area = $6 WHERE id = $7"
    const values = [
        nombre,
        descripcion,
        fecha_inicio,
        fecha_termino,
        portada,
        id_area,
        id
    ]
    const result = await db.query(text, values)
    return result
}

export const deleteCurso = async (id) => {
    const text = "DELETE FROM cursos WHERE id = $1"
    const values = [id]
    const result = await db.query(text, values)
    return result
}

export const getCursos = async (data) => {
    const text = "SELECT * FROM cursos"
    const result = await db.query(text)
    return result
}

export const getAreaCurso = async () => {
    const text = "SELECT * FROM areas"
    const result = await db.query(text)
    return result
}

export const getCursoID = async (id) => {
    const text = "SELECT * FROM cursos WHERE id = $1"
    const values = [id]
    const result = await db.query(text, values)
    return result
}

export const getFiltroCurso = async (id) => {
    const text = `SELECT cursos.* FROM cursos JOIN areas ON cursos.id_area = areas.id WHERE areas.id = $1`
    const values = [id]
    const result = await db.query(text, values)
    return result
}

export const inscripcion = async (userId, cursoId) => {
    const text = `INSERT INTO inscripciones (inscripcion, id_usuario, id_curso)
    VALUES ($1, $2, $3)
    ON CONFLICT (id_usuario, id_curso) 
    DO UPDATE SET inscripcion = EXCLUDED.inscripcion`       
    const values = [true,userId,cursoId]
    const result = await db.query(text, values)
    return result
}

export const cursosInscritos = async (userId) => {
    const text = `SELECT c.nombre, c.id, c.portada 
    FROM cursos c
    JOIN inscripciones i ON c.id = i.id_curso
    WHERE i.id_usuario = $1 AND i.inscripcion = true`
    const values = [userId]
    const result = await db.query(text, values)
    return result
}