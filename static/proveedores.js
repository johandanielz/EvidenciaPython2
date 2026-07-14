document.getElementById("form-proveedor").addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = new FormData(event.target);

    try {
        const response = await fetch("/proveedores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: datos.get("nombre"),
                contacto: datos.get("contacto"),
                telefono: datos.get("telefono")
            })
        });

        const data = await response.json();
        document.getElementById("mensaje").textContent = "Proveedor creado: " + data.nombre;
        event.target.reset();
    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al crear el proveedor";
    }
});