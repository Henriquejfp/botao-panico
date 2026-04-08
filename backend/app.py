from flask import Flask
from config import db 
from routes import init_routes

app = Flask(__name__)
app.config.from_object('config')

db.init_app(app)
init_routes(app)

if __name__ == "__main__":
    app.run(debug=True)