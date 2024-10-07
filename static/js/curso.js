const verMasLinks = document.querySelectorAll('.ver-mas');
verMasLinks.forEach(link => {
    link.addEventListener("click", async (event) => {
        event.preventDefault();
        const cursoId = link.getAttribute("href").split("/").pop();
        window.location.href = `/curso/${cursoId}`;
    });
});

document.getElementById('filterArea').addEventListener('change', function() { 
    const selectedArea = this.value;

    window.location.href = `/cursos?area=${selectedArea}`;
  });
  