document.getElementById("form-celular")
.addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = new FormData(event.target);

    try {
        const response = await fetch("/celulares", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                marca: datos.get("marca"),
                modelo: datos.get("modelo"),
                precio: datos.get("precio")
            })
        });

        const data = await response.json();
        document.getElementById("mensaje").textContent = "Celular creado: " + data.marca;
        event.target.reset();
    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al crear el celular";
    }
});