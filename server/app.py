from datetime import datetime
from flask_migrate import Migrate
from models import db, User, Pet, Adoption
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from flask_cors import CORS
import os

from models import db, User, Pet, Adoption

app = Flask(__name__)
CORS(app)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route("/")
def index():
    return "<h1>Pawfect Match</h1>"


@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)  # Clear the user_id from session
    return jsonify({'message': 'Logged out successfully'}), 200
class CheckSession(Resource):

    def get(self):
        user_id = session['user_id']
        print(user_id)
        if user_id:
            user=User.query.filter(User.id==user_id).first()
            return user.to_dict(),200

        return {}, 401

api.add_resource(CheckSession, '/check_session')

#Login
class Login(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        #password = data.get('password')  # You should check the password as well
        
        user = User.query.filter_by(name=username).first()
        if user: #and user.check_password(password):  # Assuming you have a method to check the password
            session['user_id'] = user.id
            return jsonify(user.to_dict())
        else:
            return jsonify({'errors': ['Invalid username or password']}), 401



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
class CurrentUser(Resource):
    def get(self):
        user_id = session.get('user_id')
        print(user_id)
        if user_id:
            user = User.query.get(user_id)
            if user:
                return user.to_dict(), 200
        return {'error': 'User not logged in'}, 401

    
api.add_resource(CurrentUser, '/current_user')

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
    @app.route("/pets/<int:id>", methods=['GET'])
    def get_pet_by_id(id):
        # if 'user_id' not in session:
        #     return {'error': 'Unauthorized, Need to Log in'}, 401

        pet = Pet.query.filter_by(id=id).first()

        if pet:
            return pet.to_dict(), 200
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

#api.add_resource(PetsByID, '/pets/<int:id>')


class Adoptions(Resource):

    def get(self):
        adoptions_list = [adoption.to_dict() for adoption in Adoption.query.all()]
        return adoptions_list, 200

    def post(self):
        data = request.get_json()
        new_adoption = Adoption(
            user_id=data['user_id'],  
            pet_id=data['pet_id'],    
            adoption_date=data.get('adoption_date', datetime.utcnow()),  
        )
        db.session.add(new_adoption)
        db.session.commit()
        response_dict = new_adoption.to_dict()
        return response_dict, 201

api.add_resource(Adoptions, '/adoptions')

class UserAdoptions(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            adoptions = Adoption.query.filter_by(user_id=user_id).all()
            adoptions_list = []
            for adoption in adoptions:
                pet = Pet.query.get(adoption.pet_id)
                if pet:
                    adoption_dict = adoption.to_dict()
                    adoption_dict['pet'] = pet.to_dict()
                    adoptions_list.append(adoption_dict)
            return adoptions_list, 200
        return {'error': 'User not logged in'}, 401

api.add_resource(UserAdoptions, '/user_adoptions')


if __name__ == "__main__":
    app.run(port=5555, debug=True)