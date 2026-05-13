from config import db

class Alerta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mensagem = db.Column(db.String(500))
    data_criacao = db.Column(db.DateTime)