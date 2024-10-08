document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("eliminarCurso").addEventListener("click", async () => {
        const id = document.getElementById("cursoId").value;
        console.log(`El ID es ${id}`);

        if (!confirm("¿Estás seguro de que deseas eliminar este curso?")) {
            return;
        }

        try {
            const response = await fetch(`/cursos/eliminarCurso/${id}`, {
                method: "DELETE",
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error de servidor');
            }

            alert(data.message);
            window.location = `/cursos`;

        } catch (error) {
            alert("Problemas al eliminar el curso, intenta de nuevo");
            console.error(error);
        }
    });
});
document.getElementById('confirmInscription').onclick = function() {
    const id = document.getElementById("cursoId").value;
    window.location.href = `/inscribirse/${id}`;
  };