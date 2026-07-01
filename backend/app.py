from flask import Flask, request, jsonify
from supabase import create_client, Client
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route("/")
def home():
    return "API do Botão de Pânico está online!"

@app.route("/alerta", methods=["POST"])
def alerta():
    body = request.get_json()

    data = supabase.table("alerta").insert({
        "nome": body.get("nome"),
        "telefone": body.get("telefone"),
        "comentario": body.get("comentario"),
        "anonimo": body.get("anonimo", False)
    }).execute()

    return jsonify(data.data), 201

@app.route("/panic", methods=["GET"])
def panic():
    data = supabase.table("alerta").select("*").execute()
    return jsonify(data.data), 200

if __name__ == "__main__":
    app.run(debug=True)