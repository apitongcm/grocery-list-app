from flask import Flask, jsonify, request
from algorithms import knapsack
from supabase import create_client, Client
import os



app = Flask(__name__)

# -----------------------------
# Supabase configuration
# -----------------------------
NEXT_PUBLIC_SUPABASE_URL = os.getenv("SUPABASE_URL")
NEXT_PUBLIC_SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY)


# -----------------------------
# API Routes
# -----------------------------
@app.route("/api", methods=["GET"])
def home():
    return jsonify({"message":"Flash backend with Supabase on Vercel is working!"})

# API for getting items from the products.db
@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        response = supabase.table("products").select("*").execute()
        products = response.data
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# API for fetching selecteditems from the React frontend app
@app.route('/api/receive_data', methods=['POST', 'OPTIONS'])
def receive_data():
    if request.method == 'OPTIONS':
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
    app.run(debug=True)
