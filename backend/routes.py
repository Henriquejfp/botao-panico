from flask import request, jsonify
from models import Alerta, db

def init_routes(app):
    @app.route("/alerta", methods=["POST"])
    def criar_alerta():
        data = request.get_json()
        novo_alerta = Alerta(mensagem=data["mensagem"])
        db.session.add(novo_alerta)
        db.session.commit()
        return jsonify({"status": "alerta criado"}), 201

    @app.route("/alerta", methods=["GET"])
    def listar_alertas():
        alertas = Alerta.query.all()
        return jsonify([{"id": a.id, "mensagem": a.mensagem, "criado_em": a.criado_em} for a in alertas])
