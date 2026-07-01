from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Alerta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mensagem = db.Column(db.String(200), nullable=False)
    nome = db.Column(db.String(120), nullable=True)
    telefone = db.Column(db.String(30), nullable=True)
    comentario = db.Column(db.String(280), nullable=True)
    anonimo = db.Column(db.Boolean, default=False, nullable=False)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
