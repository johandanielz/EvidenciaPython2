from flask import Blueprint, request, jsonify
from db import db
from models import Cliente

clientes_bp = Blueprint("clientes", __name__, url_prefix="/clientes")

# Funcion para crear un cliente 
@clientes_bp.route("", methods=["POST"])
def crear_cliente():
    data = request.get_json()
    nuevo_cliente = Cliente(
        nombre = data["nombre"],
        email = data["email"],
        telefono = data["telefono"]
    )
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(nuevo_cliente.to_dict())

# Funcion para obtener todos los clientes
@clientes_bp.route("", methods=["GET"])
def obtener_clientes():
    data = Cliente.query.all()
    clientes = [cliente.to_dict() for cliente in data]
    return jsonify(clientes)

# Funcion para actualizar un cliente 
@clientes_bp.route("/<int:id>", methods=["PUT"])
def actualizar_cliente(id):
    cliente = Cliente.query.get(id)
    if not cliente:
        return "Cliente no encontrado", 404
    
    data = request.get_json()
    cliente.nombre = data.get("nombre", cliente.nombre)
    cliente.email = data.get("email", cliente.email)
    cliente.telefono = data.get("telefono", cliente.telefono)

    db.session.commit()
    return jsonify(cliente.to_dict())

# Funcion para eliminar un cliente
@clientes_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_cliente(id):
    cliente = Cliente.query.get(id)
    if not cliente:
        return "" \
        "Cliente no encontrado", 404
    
    db.session.delete(cliente)
    db.session.commit()
    return jsonify({"mensaje": f"Cliente con id {id} eliminado correctamente"})
