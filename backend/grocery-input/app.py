from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3


#temporary to test 
import random


app = Flask(__name__)

# Allow all origins for development (you can restrict this later)
CORS(app, resources={r"/*": {"origins": "*"}})

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

    conn.commit()
    conn.close()

# -----------------------------
# API Routes
# -----------------------------

# API for getting items from the products.db
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


# API for fetching selecteditems from the React frontend app
@app.route('/api/receive_data', methods=['POST', 'OPTIONS'])
def receive_data():
    if request.method == 'OPTIONS':
        # Handle CORS preflight
        return '', 200

    try:
        #get data in json format containing selecteditems "Array" and budget as "String"
        data = request.get_json()
        selected_items = data.get("data", [])
        budget = data.get("budget", 0)

        print("Received from React:")
        print("Items:", selected_items)
        print("Budget:", budget)

        # Shuffle the items randomly
        random.shuffle(selected_items)


        # Example: process data
        total_cost = sum(item.get("price", 0) for item in selected_items)
        remaining = float(budget) - total_cost

        # Build response
        result = {
            "total_cost": total_cost,
            "remaining_budget": remaining,
            "over_budget": remaining < 0,
            "message": "Calculation complete!",
            "shuffled_items": selected_items 
        }

        return jsonify(result), 200

    except Exception as e:
        # use case for scenario is error.
        print("Error:", e)
        return jsonify({"error": str(e)}), 400
    

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
