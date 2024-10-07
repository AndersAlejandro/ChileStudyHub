import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const Authorization = async (req, res, next) => {
  try {
    // Obtenemos las cookies del request
    const cookies = cookie.parse(req.headers.cookie || '');

    // Extraemos el token de las cookies
    const token = cookies.token;

    // Si no hay token, redirigimos a la página de inicio o login
    if (!token) {
      return res.status(401).render("home");
    }

    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Asignamos la información decodificada a req
    req.decoded = decoded;

    // Pasamos al siguiente middleware
    next();
  } catch (error) {
    console.error("Error en la autorización:", error);
    // Si hay un error con el token (invalidez o expiración), redirigimos
    return res.status(401).render("home");
  }
};
