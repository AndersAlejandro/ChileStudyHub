document.getElementById("login").addEventListener("submit", async (event) => {
    event.preventDefault();

    const { email, contraseña } = event.target;

    if (!email.value || !contraseña.value) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                contraseña: contraseña.value
            })
        });

        if (!response.ok) {
            alert("Usuario no existe o contraseña incorrecta / Error de servidor");
            return;
        }

        const data = await response.json();


        document.cookie = `token=${data.token}; path=/; max-age=900`;

        window.location = '/cursos';
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al procesar la solicitud.");
    }
});
