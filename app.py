from flask import Flask, request, jsonify
from db import db
from blueprints.celulares import celulares_bp
from blueprints.clientes import clientes_bp
from blueprints.proveedores import proveedores_bp

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tienda.db"
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Funciona!"

app.register_blueprint(celulares_bp)
app.register_blueprint(clientes_bp)
app.register_blueprint(proveedores_bp)
    
if __name__ == "__main__":
    app.run(debug=True)