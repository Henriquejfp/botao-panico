import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:batata@localhost:5432/botao_panico"
SQLALCHEMY_TRACK_MODIFICATIONS = False

