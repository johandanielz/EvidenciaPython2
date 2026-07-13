from flask import Flask, request, jsonify
from db import db
from models import Celular

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tienda.db"
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Funciona!"

# Funcion para crear un celular 
@app.route("/celulares", methods=["POST"])
def crear_celular():
    data = request.get_json()
    nuevo_celular = Celular(
        marca = data["marca"],
        modelo = data["modelo"],
        precio = data["precio"]
    )
    db.session.add(nuevo_celular)
    db.session.commit()
    return jsonify(nuevo_celular.to_dict())

# Funcion para obtener todos los celulares
@app.route("/celulares", methods=["GET"])
def obtener_celulares():
    data = Celular.query.all()
    celulares = [celular.to_dict() for celular in data]
    return jsonify(celulares)

# Funcion para actualizar un celular 
@app.route("/celulares/<int:id>", methods=["PUT"])
def actualizar_celular(id):
    celular = Celular.query.get(id)
    if not celular:
        return "Celular no encontrado", 404
    
    data = request.get_json()
    celular.marca = data.get("marca", celular.marca)
    celular.modelo = data.get("modelo", celular.modelo)
    celular.precio = data.get("precio", celular.precio)

    db.session.commit()
    return jsonify(celular.to_dict())


# Funcion para eliminar un celular
@app.route("/celulares/<int:id>", methods=["DELETE"])
def eliminar_celular(id):
    celular = Celular.query.get(id)
    if not celular:
        return "Celular no encontrado", 404
    
    db.session.delete(celular)
    db.session.commit()
    return jsonify({"mensaje": f"Celular con id {id} eliminado correctamente"})
    
if __name__ == "__main__":
    app.run(debug=True)