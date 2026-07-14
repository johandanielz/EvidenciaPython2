from flask import Blueprint, request, jsonify
from db import db
from models import Proveedor

proveedores_bp = Blueprint("proveedores", __name__, url_prefix="/proveedores")

# Funcion para crear un proveedor 
@proveedores_bp.route("", methods=["POST"])
def crear_proveedor():
    data = request.get_json()
    nuevo_proveedor = Proveedor(
        nombre = data["nombre"],
        contacto = data["contacto"],
        telefono = data["telefono"]
    )
    db.session.add(nuevo_proveedor)
    db.session.commit()
    return jsonify(nuevo_proveedor.to_dict())

# Funcion para obtener todos los proveedores
@proveedores_bp.route("", methods=["GET"])
def obtener_proveedores():
    data = Proveedor.query.all()
    proveedores = [proveedor.to_dict() for proveedor in data]
    return jsonify(proveedores)


# Funcion para actualizar un proveedor 
@proveedores_bp.route("/<int:id>", methods=["PUT"])
def actualizar_proveedor(id):
    proveedor = Proveedor.query.get(id)
    if not proveedor:
        return "Proveedor no encontrado", 404
    
    data = request.get_json()
    proveedor.nombre = data.get("nombre", proveedor.nombre)
    proveedor.contacto = data.get("contacto", proveedor.contacto)
    proveedor.telefono = data.get("telefono", proveedor.telefono)

    db.session.commit()
    return jsonify(proveedor.to_dict())


# Funcion para eliminar un proveedor
@proveedores_bp.route("/<int:id>", methods=["DELETE"])
def eliminar_proveedor(id):
    proveedor = Proveedor.query.get(id)
    if not proveedor:
        return "Proveedor no encontrado", 404
    
    db.session.delete(proveedor)
    db.session.commit()
    return jsonify({"mensaje": f"Proveedor con id {id} eliminado correctamente"})