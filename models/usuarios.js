import * as db from '../db/db.js';

export const getUser = async (data) => {
    const { email } = data
    const text = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const result = await db.query(text, values)
    return result
}

export const createUsers = async (data) => {
    const { nombre, email, contraseña } = data
    const text = "INSERT INTO usuarios (nombre, email, contraseña) VALUES ($1, $2, $3)"
    const values = [nombre, email, contraseña]
    const result = await db.query(text, values)
    return result
}