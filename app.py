from flask import Flask, request, jsonify

app = Flask(__name__)

celulares = []      # Diccionario para guardar los celulares 
siguiente_id = 1    # Variable para asignar un id unico a cada celular

@app.route("/")
def home():
    return "Funciona!"

# Funcion para crear un celular 
@app.route("/celulares", methods=["POST"])
def crear_celular():
    global siguiente_id
    data = request.get_json()
    nuevo_celular = {
        "id": siguiente_id,
        "marca": data["marca"],
        "modelo": data["modelo"],
        "precio": data["precio"]
    }
    siguiente_id += 1
    celulares.append(nuevo_celular)
    return jsonify(nuevo_celular)

# Funcion para obtener todos los celulares
@app.route("/celulares", methods=["GET"])
def obtener_celulares():
    return jsonify(celulares)

# Funcion para actualizar un celular 
@app.route("/celulares/<int:id>", methods=["PUT"])
def actualizar_celular(id):
    data = request.get_json()
    for i, celular in enumerate(celulares):
        if celular["id"] == id:
            celular["marca"] = data.get("marca", celular["marca"])
            celular['modelo'] = data.get("modelo", celular["modelo"])
            celular["precio"] = data.get("precio", celular["precio"])
            return jsonify(celulares[i])
    return "Celular no encontrado", 404

# Funcion para eliminar un celular
@app.route("/celulares/<int:id>", methods=["DELETE"])
def eliminar_celular(id):
    for i, celular in enumerate(celulares):
        if celular["id"] == id:
            celulares.remove(celulares[i])
            return jsonify({"mensaje": f"Celular con id {id} eliminado correctamente"})
    return "Celular no encontrado", 404

if __name__ == "__main__":
    app.run(debug=True)