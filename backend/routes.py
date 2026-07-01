from flask import request, jsonify
from backend.models import Alerta, db


def init_routes(app):
    @app.route("/alerta", methods=["POST"])
    def criar_alerta():
        data = request.get_json()

        if not data or not data.get("comentario"):
            return jsonify({"erro": "campo 'comentario' é obrigatório"}), 400

        novo_alerta = Alerta(
            nome=data.get("nome"),
            telefone=data.get("telefone"),
            comentario=data.get("comentario"),
            anonimo=bool(data.get("anonimo", False)),
        )
        db.session.add(novo_alerta)
        db.session.commit()
        return jsonify({"status": "alerta criado", "id": novo_alerta.id}), 201

    @app.route("/alerta", methods=["GET"])
    def listar_alertas():
        alertas = Alerta.query.order_by(Alerta.data_criacao.desc()).all()
        return jsonify([
            {
                "id": a.id,
                "nome": a.nome,
                "telefone": a.telefone,
                "comentario": a.comentario,
                "anonimo": a.anonimo,
                "data_criacao": a.data_criacao,
            }
            for a in alertas
        ])
