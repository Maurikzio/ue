from flask import Flask, request, jsonify
import sqlite3
from pydantic import BaseModel, ValidationError

app = Flask(__name__)
DB = "products.db"

def init_db():
  with sqlite3.connect(DB) as conn:
    conn.execute(
      """
      CREATE TABLE IF NOT EXISTS product
      (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL)
      """
    )

init_db()

@app.route("/")
def welcome():
  return jsonify({"message": "Hi there, welcome!"})

class Product(BaseModel):
  name: str
  price: float

# LISTAR TODOS LOS PRODUCTOS
@app.route("/api/products", methods=["GET"])
def list_products():
  with sqlite3.connect(DB) as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM product")
    products = [
      {"id": row[0], "name": row[1], "price": row[2]}
      for row in cursor.fetchall()
    ]
    return jsonify(products), 201

# CREAR PRODUCTO
@app.route("/api/products", methods=["POST"])
def create_product():
  try:
    data = Product(**request.json)
    with sqlite3.connect(DB) as conn:
      cursor = conn.cursor()
      cursor.execute(
        "INSERT INTO product(name, price) VALUES (?, ?)",
        (data.name, data.price)
      )
      conn.commit()
    return jsonify({"message": f"Product {cursor.lastrowid} created"}), 201
  except ValidationError as e:
    return jsonify(e.errors()), 400


# LEER UN PRODUCTO
@app.route("/api/products/<int:product_id>", methods=["GET"])
def read_product(product_id):
  with sqlite3.connect(DB) as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM product WHERE id=?", (product_id,))
    product = cursor.fetchone()

    if not product:
      return jsonify({"error": "Product not found"}), 404

  fields = [col[0] for col in cursor.description]
  return jsonify(dict(zip(fields, product))), 201

# ACTUALIZAR UN PRODUCTO
@app.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
  try:
    data = Product(**request.json)
    with sqlite3.connect(DB) as conn:
      cursor = conn.cursor()

      # verificamos si el producto existe - metodo 1
      cursor.execute("SELECT COUNT(*) FROM product WHERE id=?", (product_id,))
      product_exists = cursor.fetchone()[0]
      if not product_exists:
        return jsonify({"error": "Product not found"}), 404

      cursor.execute(
        "UPDATE product SET name=?, price=? WHERE id=?",
        (data.name, data.price, product_id)
      )
      conn.commit()

      # Verificar si product existe - metodo 2
      # if cursor.rowcount == 0:
      #   return jsonify({"error": "Product not found"}), 404

      return jsonify({"message": "Product Updated!"}), 200
  except ValidationError as e:
    return jsonify(e.errors()), 400

# ELIMINAR UN PRODUCTO
@app.route("/api/pdoructs/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
  with sqlite3.connect(DB) as conn:
    cursor = conn.cursor()
    cursor.execute("DELETE FROM product WHERE id=?", (product_id,))
    conn.commit()

  return jsonify({"message": "Product deleted!"}), 204

# Initialize server
if __name__ == "__main__":
  app.run(debug=True)