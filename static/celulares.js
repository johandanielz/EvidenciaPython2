const tablaCelulares = document.getElementById("tabla-celulares");
const btnCrearEditar = document.getElementById("btn-submit");
const textoOriginalBoton = btnCrearEditar.textContent;
let idEditando = null;

document.getElementById("form-celular")
.addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = new FormData(event.target);
    const url = idEditando ? `/celulares/${idEditando}` : "/celulares";
    const metodo = idEditando ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                marca: datos.get("marca"),
                modelo: datos.get("modelo"),
                precio: datos.get("precio")
            })
        });
        cargarCelulares();
        event.target.reset();
        idEditando = null;
        btnCrearEditar.textContent = textoOriginalBoton;
    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al crear el celular";
    }
});

async function cargarCelulares() {
    const response = await fetch("/celulares");
    const celulares = await response.json();
    tablaCelulares.innerHTML = "";

    if (celulares.length === 0){
        tablaCelulares.innerHTML = "No hay celulares registrados";
        return;
    }

    const filas = celulares.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.marca}</td>
            <td>${c.modelo}</td>
            <td>${c.precio}</td>
            <td>
                <button onclick="editarCelular(${c.id}, '${c.marca}', '${c.modelo}', ${c.precio})">Editar</button>
                <button onclick="eliminarCelular(${c.id})">Eliminar</button>
            </td>
        </tr>
    `).join("");

    tablaCelulares.innerHTML = filas;
}

async function eliminarCelular(id) {
    const response = await fetch(`/celulares/${id}`, {method: "DELETE"});

    if (!response.ok) throw new Error("Error al eliminar elemento");
    cargarCelulares();
    console.log("Celular eliminado correctamente");
    return;
    
}

function editarCelular(id, marca, modelo, precio) {
    document.querySelector('[name="marca"]').value = marca;
    document.querySelector('[name="modelo"]').value = modelo;
    document.querySelector('[name="precio"]').value = precio;
    idEditando = id;
    btnCrearEditar.textContent = "Actualizar";
}

cargarCelulares();