from flask import Flask
from backend.routes import init_routes
from backend.config import db


app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)

with app.app_context():
    db.create_all()

init_routes(app)

if __name__ == "__main__":
    app.run(debug=True)

