document.getElementById("curso").addEventListener("submit", async (event) => {
    event.preventDefault()
    const { nombre, descripcion, id_area, fecha_inicio, fecha_termino, portada } = event.target
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
        const formData = new FormData(event.target)

        const response = await fetch("/cursos", {
            method: "POST",
            body: formData
        })

        const data = await response.json()
        if (response.status == 500) {
            throw new Error('Error de servidor')
        }

    } catch (error) {
        alert("Problemas al crear curso, intentalo de nuevo")
        console.error(error)
    }


    window.location = `/cursos`
})