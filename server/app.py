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

    def post(self):

        new_user = User(
            name=request.form['name'],
            email=request.form['email'],
        )

        db.session.add(new_user)
        db.session.commit()

        response_dict = new_user.to_dict()

        return response_dict, 201

api.add_resource(Users, '/users')

class Pets(Resource):

    def get(self):
        pets_list = [pet.to_dict() for pet in Pet.query.all()]

        return pets_list, 200

api.add_resource(Pets, '/pets')

class Shelters(Resource):

    def get(self):
        shelters_list = [shelter.to_dict() for shelter in Shelter.query.all()]

        return shelters_list, 200

api.add_resource(Shelters, '/shelters')

class Adoptions(Resource):

    def get(self):
        adoptions_list = [adoption.to_dict() for adoption in Adoption.query.all()]

        return adoptions_list, 200

api.add_resource(Adoptions, '/adoptions')


if __name__ == "__main__":
    app.run(port=5555, debug=True)