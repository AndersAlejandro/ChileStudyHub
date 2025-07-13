const verMasLinks = document.querySelectorAll(".ver-mas");
verMasLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    const cursoId = link.getAttribute("href").split("/").pop();
    window.location.href = `/curso/${cursoId}`;
  });
});

//

const btnCategoria = document.getElementById("btnCategoria");
const listaCategorias = document.getElementById("listaCategorias");
const categoriasSeleccionadas = document.getElementById(
  "categoriasSeleccionadas"
);
const checkboxes = document.querySelectorAll(".categoria-checkbox");
const cursosContainer = document.getElementById("listaCursos");
const buscador = document.getElementById("buscador");
const btnClear = document.getElementById("btnClear");

// Mostrar/ocultar dropdown
btnCategoria.addEventListener("click", () => {
  const expanded = btnCategoria.getAttribute("aria-expanded") === "true";
  btnCategoria.setAttribute("aria-expanded", !expanded);
  listaCategorias.classList.toggle("show");
});

// Cerrar dropdown si clic fuera
document.addEventListener("click", (e) => {
  if (!btnCategoria.contains(e.target) && !listaCategorias.contains(e.target)) {
    listaCategorias.classList.remove("show");
    btnCategoria.setAttribute("aria-expanded", "false");
  }
});

// Actualiza las etiquetas de categorías seleccionadas
function actualizarCategoriasSeleccionadas() {
  categoriasSeleccionadas.innerHTML = "";
  const seleccionadas = Array.from(checkboxes).filter((ch) => ch.checked);

  if (seleccionadas.length === 0) {
    btnCategoria.textContent = "Categorías ▼";
    return;
  }

  // Cambiar texto botón a mostrar seleccionadas (ej: "3 categorías")
  btnCategoria.textContent = `${seleccionadas.length} categorías seleccionadas ▼`;

  seleccionadas.forEach((ch) => {
    const label = ch.nextElementSibling.textContent.trim();
    const tag = document.createElement("div");
    tag.className = "categoria-tag";
    tag.textContent = label;

    // "x" para quitar categoría
    const spanClose = document.createElement("span");
    spanClose.textContent = "×";
    spanClose.title = "Quitar categoría";
    spanClose.addEventListener("click", (e) => {
      e.stopPropagation();
      ch.checked = false;
      actualizarCategoriasSeleccionadas();
      filtrarCursos();
    });

    tag.appendChild(spanClose);
    categoriasSeleccionadas.appendChild(tag);
  });
}

// Filtra cursos por búsqueda y categorías
function filtrarCursos() {
  const textoBusqueda = buscador.value.toLowerCase().trim();
  const categoriasChecked = Array.from(checkboxes)
    .filter((ch) => ch.checked)
    .map((ch) => ch.dataset.id);

  const cursos = cursosContainer.querySelectorAll(".curso-item");

  cursos.forEach((curso) => {
    const areaCurso = curso.dataset.area;

    const coincideBusqueda =
      textoBusqueda === "" ||
      curso.textContent.toLowerCase().includes(textoBusqueda);

    const coincideCategoria =
      categoriasChecked.length === 0 || categoriasChecked.includes(areaCurso);

    if (coincideBusqueda && coincideCategoria) {
      curso.style.display = "flex";
    } else {
      curso.style.display = "none";
    }
  });
}

// Detectar cambios en checkboxes
checkboxes.forEach((ch) => {
  ch.addEventListener("change", () => {
    actualizarCategoriasSeleccionadas();
    filtrarCursos();
  });
});

// Buscar texto
buscador.addEventListener("input", () => {
  filtrarCursos();
});

// Limpiar búsqueda
btnClear.addEventListener("click", (e) => {
  e.preventDefault();
  buscador.value = "";
  filtrarCursos();
  buscador.focus();
});

// Inicializar estado
actualizarCategoriasSeleccionadas();
filtrarCursos();
