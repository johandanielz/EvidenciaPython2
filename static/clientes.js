const tablaClientes = document.getElementById("tabla-clientes");
const btnCrearEditar = document.getElementById("btn-submit");
const textoOriginalBoton = btnCrearEditar.textContent;
let idEditando = null;

document.getElementById("form-cliente")
.addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = new FormData(event.target);
    const url = idEditando ? `/clientes/${idEditando}` : "/clientes";
    const metodo = idEditando ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: datos.get("nombre"),
                email: datos.get("email"),
                telefono: datos.get("telefono")
            })
        });

        cargarClientes();
        event.target.reset();
        idEditando = null;
        btnCrearEditar.textContent = textoOriginalBoton;
    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al crear el cliente";
    }
});

async function cargarClientes() {
    const response = await fetch("/clientes");
    const clientes = await response.json();

    tablaClientes.innerHTML = "";

    if (clientes.length === 0) {
        tablaClientes.innerHTML = "No hay clientes registrados";
        return;
    }

    const filas = clientes.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.email}</td>
            <td>${c.telefono}</td>
            <td>
                <button onclick="editarCliente(${c.id}, '${c.nombre}', '${c.email}', '${c.telefono}')">Editar</button>
                <button onclick="eliminarCliente(${c.id})">Eliminar</button>
            </td>
        </tr>
    `).join("");

    tablaClientes.innerHTML = filas;
}

async function eliminarCliente(id) {
    const response = await fetch(`/clientes/${id}`, {method:"DELETE"});

    if (!response.ok) throw new Error("Error al eliminar elemento");
    cargarClientes();
    console.log("Cliente eliminado correctamente");
    return;
}

function editarCliente(id, nombre, email, telefono) {
    document.querySelector('[name="nombre"]').value = nombre;
    document.querySelector('[name="email"]').value = email;
    document.querySelector('[name="telefono"]').value = telefono;
    idEditando = id;
    btnCrearEditar.textContent = "Actualizar";
}

cargarClientes();