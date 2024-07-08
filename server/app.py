from flask_migrate import Migrate
from models import db, User, Pet, Shelter, Adoption
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route("/")
def index():
    return "<h1>Pawfect Match</h1>"

class Users(Resource):
    
    def get(self):
        users_list = [user.to_dict() for user in User.query.all()]

        return users_list, 200

api.add_resource(Users, '/users')