export const mostrarBoton = function(tipo_usuario, estaInscrito, options) {
  if (tipo_usuario === 'estudiante' && !estaInscrito) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};