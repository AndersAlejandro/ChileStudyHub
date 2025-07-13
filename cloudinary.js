import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary con variables de entorno
cloudinary.config({
  cloud_name: process.env.API_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function subirImagen(path, publicId = "") {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: publicId || undefined,
      folder: "cursos", // carpeta opcional
    });
    return result;
  } catch (error) {
    console.error("Error subiendo imagen a Cloudinary:", error);
    throw error;
  }
}

export function generarUrl(publicId, options = {}) {
  return cloudinary.url(publicId, options);
}
