from flask import Flask, jsonify, request
#from flask_cors import CORS
from algorithms import knapsack
#import sqlite3
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os


# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

# Allow all origins for development (you can restrict this later)
#CORS(app, resources={r"/*": {"origins": "*"}})

# -----------------------------
# Initialize SUPABASE database
# -----------------------------

# Fetch Variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Construct the SQLAlchemy connection string
DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Test the connection
try:
    with engine.connect() as conn:
        print("Connection successful!")
except Exception as e:
    print(f"Failed to connect: {e}")
#DATABASE = "products.db" local server

# -----------------------------
# Initialize SQLite database
# -----------------------------
#def init_db():
#    conn = sqlite3.connect(DATABASE)
#    c = conn.cursor()
 #   c.execute("""
  #      CREATE TABLE IF NOT EXISTS products (
   #         id INTEGER PRIMARY KEY AUTOINCREMENT,
    #        name TEXT NOT NULL,
     #       price REAL NOT NULL
      #  )
   # """)

   # conn.commit()
   # conn.close()

# -----------------------------
# API Routes
# -----------------------------
@app.route("/api", methods=["GET"])
def home():
    return jsonify({"message":"Flash backend on Vercel is working!"})

# API for getting items from the products.db
@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        with engine.connect() as conn:
            result = conn.execute("SELECT id, name, price FROM products")
            rows = [dict(row._mapping) for row in result]

            # Ensure 'price' is string type for JSON
            for row in rows:
                row['price'] = str(row['price'])
        return jsonify(rows), 200
    except Exception as e:
        print("Database error:", e)
        return jsonify({"error": str(e)}), 500

    #conn = sqlite3.connect(DATABASE)
    #conn.row_factory = sqlite3.Row
    #c = conn.cursor()
    #c.execute("SELECT * FROM products")
    #rows = c.fetchall()
    #conn.close()
    #products = [dict(row) for row in rows]
    #return jsonify(products)


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

        #apply greedy knapsack algorithm
        selected_items = knapsack.greed_sort(selected_items, float(budget))


        # Calculations
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
    #init_db()
    app.run(debug=True)
