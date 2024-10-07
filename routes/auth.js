import { Router } from "express";
import { createUsers, getUser } from "../models/usuarios.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/register", async (req, res) => {
    try {

        const data = req.body

        const userExisting = await getUser(data)
        if (userExisting.rowCount > 0) {
            res.status(401).json({
                message: 'El usuario ya existe'
            })
        } else {
            const result = await createUsers(data)

            res.json({
                message: 'Usuario creado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error interno de servidor'
        })
        console.error(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const data = req.body

        const user = await getUser(data)
        if (user.rowCount == 0) {
            res.status(404).json({
                message: 'User no existe o contraseña incorrecta'
            })
        } else {
            if (req.body.contraseña != user.rows[0].contraseña) {
                res.status(400).json({
                    message: 'User no existe o contraseña incorrecta'
                })
            } else {
                const tokenUser = {
                    email: user.rows[0].email,
                    tipo_usuario: user.rows[0].tipo_usuario,
                    id_usuario: user.rows[0].id
                }
                const secret = process.env.JWT_SECRET
                const token = jwt.sign(tokenUser, secret, {
                    expiresIn: '20m'
                })
                res.json({
                    token: token,
                    message: 'Logeado'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
        console.error(error)
    }
})

export { router }