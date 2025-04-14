from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pomodoro.db'
    app.config['JWT_SECRET_KEY'] = 'yousr-secret-key'

    db.init_app(app)
    jwt.init_app(app)

    from .routes import api
    app.register_blueprint(api)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    return app 

