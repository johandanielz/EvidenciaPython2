document.getElementById("form-cliente").addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = new FormData(event.target);

    try {
        const response = await fetch("/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: datos.get("nombre"),
                email: datos.get("email"),
                telefono: datos.get("telefono")
            })
        });

        const data = await response.json();
        document.getElementById("mensaje").textContent = "Cliente creado: " + data.nombre;
        event.target.reset();
    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al crear el cliente";
    }
});