const tablaProveedores = document.getElementById("tabla-proveedores");
const btnCrearEditar = document.getElementById("btn-submit");
const textoOriginalBoton = btnCrearEditar.textContent;
let idEditando = null;

document.getElementById("form-proveedor")
.addEventListener("submit", async function(event) {
    event.preventDefault();

    const datos = new FormData(event.target);
    const url = idEditando ? `/proveedores/${idEditando}` : "/proveedores";
    const metodo = idEditando ? "PUT" : "POST";

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: datos.get("nombre"),
                contacto: datos.get("contacto"),
                telefono: datos.get("telefono")
            })
        });

        cargarProveedores();
        event.target.reset();
        idEditando = null;
        btnCrearEditar.textContent = textoOriginalBoton;

    } catch (error) {
        document.getElementById("mensaje").textContent = "Error al crear el proveedor";
    }
});

async function cargarProveedores() {
    const response = await fetch("/proveedores");
    const proveedores = await response.json();
    tablaProveedores.innerHTML = "";

    if (proveedores.length === 0) {
        tablaProveedores.innerHTML = "No hay proveedores registrados";
        return;
    }

    const filas = proveedores.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.contacto}</td>
            <td>${p.telefono}</td>
            <td>
                <button onclick="editarProveedor(${p.id}, '${p.nombre}', '${p.contacto}', '${p.telefono}')">Editar</button>
                <button onclick="eliminarProveedor(${p.id})">Eliminar</button>
            </td>
        </tr>    
    `).join("");

    tablaProveedores.innerHTML = filas;

}

async function eliminarProveedor(id) {
    const response = await fetch(`/proveedores/${id}`, {method: "DELETE"});

    if (!response.ok) throw new Error("Error al eliminar elemento");
    cargarProveedores();
    console.log("Proveedor eliminado correctamente");
    return;
}

function editarProveedor(id, nombre, contacto, telefono) {
    document.querySelector('[name="nombre"]').value = nombre;
    document.querySelector('[name="contacto"]').value = contacto;
    document.querySelector('[name="telefono"]').value = telefono;
    idEditando = id;
    btnCrearEditar.textContent = "Actualizar";
}

cargarProveedores();