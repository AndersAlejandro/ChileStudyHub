document.getElementById("register").addEventListener("submit", async (event) => {
    event.preventDefault()

    const { contraseña, contraseña2 } = event.target

    if (contraseña.value != contraseña2.value) {
        alert('Las contraseñas son distintas')
        return
    }

    try {
        const { nombre, email, contraseña } = event.target

        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                email: email.value,
                contraseña: contraseña.value
            })
        })

        const data = await response.json()
        if (response.status == 500) {
            throw new Error('Error de servidor')
        } else if (response.status == 401) {
            throw new Error('Usuario ya existe')
        }

    } catch (error) {
        alert("Problemas al crear registro, intentalo de nuevo")
        console.error(error)
    }
    window.location = '/'
})