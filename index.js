import express from 'express'
import fileUpload from 'express-fileupload'
import { engine } from 'express-handlebars'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import morgan from 'morgan'
// importar rutas
import { router as views } from './routes/views.js'
import { router as auth } from './routes/auth.js'
import { router as cursos } from './routes/cursos.js'
// helpers
import { eqHelper } from './helpers/eq.js';
import { ifCond } from './helpers/ifcond.js';


// Instancia servidor
const app = express()
app.use(morgan("dev"))
// middleware para subir archivos
app.use(fileUpload())
// middleware para aceptar json
app.use(express.json())
// Archivos estáticos
// app.use(express.static('static'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el directorio 'static' para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'static')));

// Motor de vistas
app.engine('handlebars', engine({
    defaultLayout: 'main',
    extname: 'handlebars',
    helpers: {
        eq: eqHelper,
        ifCond: ifCond
    }
}));
app.set('view engine', 'handlebars');

app.use("/", views)
app.use("/auth", auth)
app.use("/cursos", cursos)

app.listen(3000, () => {
    console.log("App en el puerto 3000")
})

