document.getElementById("editarCurso").addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("cursoId").value;
    const { nombre, descripcion, id_area, fecha_inicio, fecha_termino, portada } = event.target;
    console.log(`este es el id ${id}`)
    if (id_area.value === ""
                || nombre.value === ""
                || descripcion.value === ""
                || fecha_inicio.value === ""
                || fecha_termino.value === ""
                || portada.value === "") {
                alert('Faltan campos por completar');
                return;
    }
    try {
        const formData = new FormData(event.target);
        console.log(`datos del form ${formData}`)
        const response = await fetch(`/cursos/editarCurso/${id}`, {
            method: "PUT",
            body: formData
        });

        const data = await response.json();
        if (response.status == 500) {
            throw new Error('Error de servidor');
        }

        alert(data.message);

    } catch (error) {
        alert("Problemas al editar curso, intentalo de nuevo");
        console.error(error);
    }

    window.location = `/cursos`;
});
