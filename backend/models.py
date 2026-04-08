from config import db

class Alerta(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    mensagem = db.Column(db.String(200), nullable = False)
    criado_em = db.Column(db.DataTime, server_default=db.func.now())