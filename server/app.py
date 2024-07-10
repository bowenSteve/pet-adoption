from flask_migrate import Migrate
from models import db, User, Pet, Adoption
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

#Login
class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        user = User.query.filter(User.username == username)

        session['user_id'] = user.id

        return user.to_dict()

api.add_resource(Login, '/login')

class Users(Resource):
    
    def get(self):
        users_list = [user.to_dict() for user in User.query.all()]

        return users_list, 200

    def post(self):

        data = request.get_json()

        new_user = User(
            name=data['name'],
            email=data['email'],
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

    def post(self):

        data = request.get_json()

        new_pet = Pet(
            name=data['name'],
            pet_type=data['pet_type'],
            breed=data['breed'],
            age=data['age'],
            location=data['location'],
            image_url=data['image_url'],
            description=data['description'],
        )

        db.session.add(new_pet)
        db.session.commit()

        response_dict = new_pet.to_dict()

        return response_dict, 201

api.add_resource(Pets, '/pets')

class PetsByID(Resource):

    def get(self, id):

        if not session['user_id']:
            return {'error': 'Unauthorized, Need to Log in'}, 401

        pet = Pet.query.filter_by(id=id).first()

        if pet:
            response_dict = pet.to_dict()

            return response_dict, 200
        else:
            return {"error": "Pet not found"}, 404

    def patch(self, id):

        pet = Pet.query.filter_by(id=id).first()

        if pet:

            for attr in request.form:
                setattr(pet, attr, request.form[attr])

            db.session.add(pet)
            db.session.commit()

            response_dict = pet.to_dict()

            return response_dict, 200
        else:
            return {"error": "Pet not found"}, 404

    def delete(self, id):

        pet = Pet.query.filter_by(id=id).first()

        if pet:
           db.session.delete(pet)
           db.session.commit()

           return {"message": "Pet successfully deleted"}, 204
        else:
            return {"error": "Pet not found"}, 404

api.add_resource(PetsByID, '/pets/<int:id>')


class Adoptions(Resource):

    def get(self):
        adoptions_list = [adoption.to_dict() for adoption in Adoption.query.all()]

        return adoptions_list, 200
    
    def post(self):

        data = request.get_json()

        new_adoption = Adoption(
            user_id=data['name'],
            pet_id=data['pet_type'],
            adoption_date=data['breed'],
        )

        db.session.add(new_adoption)
        db.session.commit()

        response_dict = new_adoption.to_dict()

        return response_dict, 201
        

api.add_resource(Adoptions, '/adoptions')


if __name__ == "__main__":
    app.run(port=5555, debug=True)