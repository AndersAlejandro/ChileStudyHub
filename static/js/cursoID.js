document.addEventListener("DOMContentLoaded", () => {
  const eliminarCursoBtn = document.getElementById("eliminarCurso");
  if (eliminarCursoBtn) {
    eliminarCursoBtn.addEventListener("click", async () => {
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
  }
  
  const confirmBtn = document.getElementById('confirmInscription');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const cursoId = document.getElementById('cursoId').value;

      
      const inscriptionModalEl = document.getElementById('inscriptionModal');
      const inscriptionModal = bootstrap.Modal.getInstance(inscriptionModalEl);
      inscriptionModal.hide();

      try {
        const response = await fetch(`/inscripcion/${cursoId}`, {
          method: 'POST', 
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          
          const successModalEl = document.getElementById('successModal');
          const successModal = new bootstrap.Modal(successModalEl);
          successModal.show();
        } else {
          alert(data.message || 'Error al inscribirse en el curso');
        }
      } catch (error) {
        alert('Error en la inscripción. Intenta de nuevo.');
        console.error(error);
      }
    });
  }
});
