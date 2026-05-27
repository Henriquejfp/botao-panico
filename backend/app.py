from flask import Flask, request, jsonify
from supabase import create_client, Client
import os

app = Flask(__name__)

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route("/")
def home():
    return "API do Botão de Pânico está online!"

@app.route("/alerta", methods=["POST"])
def alerta():
    mensagem = request.json.get("mensagem")
    data = supabase.table("alerta").insert({"mensagem": mensagem}).execute()
    return jsonify(data.data), 201

@app.route("/panic", methods=["GET"])
def panic():
    data = supabase.table("alerta").select("*").execute()
    return jsonify(data.data), 200

if __name__ == "__main__":
    app.run(debug=True)