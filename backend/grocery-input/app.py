from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Allow React to connect (port 3000 -> 5000)

DATABASE = "products.db"

# -----------------------------
# Initialize SQLite database
# -----------------------------
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL
        )
    """)
    # Seed data (optional)
   # c.execute("SELECT COUNT(*) FROM products")
   # if c.fetchone()[0] == 0:
    #    c.executemany(
     #       "INSERT INTO products (name, price) VALUES (?, ?)",
       #     [
      #          ("Apple", 0.99),
        #        ("Banana", 0.79),
         #       ("Orange", 1.25),
          #  ]
        #)
    conn.commit()
    conn.close()

# -----------------------------
# API Routes
# -----------------------------
@app.route("/api/products", methods=["GET"])
def get_products():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM products")
    rows = c.fetchall()
    conn.close()
    products = [dict(row) for row in rows]
    return jsonify(products)

@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    if not name or price is None:
        return jsonify({"error": "Name and price required"}), 400

    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("INSERT INTO products (name, price) VALUES (?, ?)", (name, price))
    conn.commit()
    conn.close()
    return jsonify({"message": "Product added successfully!"}), 201

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
