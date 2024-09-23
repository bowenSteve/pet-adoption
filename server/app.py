from datetime import datetime
from flask_migrate import Migrate
from models import db, User, Pet, Adoption
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
import random
import sys
import os
from datetime import timedelta


from .models import db, User, Pet, Adoption

app = Flask(__name__) 

CORS(app)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://pets_hoc6_user:IcT0fpcCODagrfTjH1GYa9eUaYKxrr4V@dpg-crn6be88fa8c738a7fsg-a.oregon-postgres.render.com/pets_hoc6'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh" + str(random.randint(1, 1000000000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV" + str(random.randint(1, 1000000000000))

migrate = Migrate(app, db)
jwt = JWTManager(app)

db.init_app(app)

api = Api(app)


@app.route("/")
def index():
    return "<h1>Pawfect Match</h1>"
@app.route('/user_pets', methods=['GET'])
@jwt_required()
def user_pets():
    user_id = get_jwt_identity()
    
    if not user_id:
        return jsonify({'error': 'User not logged in'}), 401
    
    # Convert user_id to string if it's not already
    user_pets = Pet.query.filter_by(user_id=str(user_id)).all()
    pets_list = [pet.to_dict() for pet in user_pets]
    
    return jsonify(pets_list), 200

    
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
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):  
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"message": "Invalid email or password"}), 401
# Logout
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200


#current-user
@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user:
        return jsonify({"id": current_user.id, "first_name": current_user.first_name, "second_name": current_user.second_name, "email": current_user.email}), 200
    else:
        return jsonify({"error": "User not found"}), 404



@app.route('/signup', methods=['POST'])
def SignUp():
    data = request.get_json()  # Get the JSON data from the request
    first_name = data.get('first_name')
    second_name = data.get('second_name')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, second_name, email, password]):
        return jsonify({"message": "All fields are required"}), 400
    
    new_user = User(first_name=first_name, second_name=second_name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": "User added successfully!"}), 201

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

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()  # Get user_id from the JWT
        data = request.get_json()

        # Validate the incoming data
        if not all(key in data for key in ('name', 'pet_type', 'breed', 'age', 'location', 'image_url', 'description')):
            return {'error': 'Missing required fields'}, 400

        new_pet = Pet(
            name=data['name'],
            pet_type=data['pet_type'],
            breed=data['breed'],
            age=data['age'],
            location=data['location'],
            image_url=data['image_url'],
            description=data['description'],
            user_id=user_id  # Use the user_id from JWT
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
    @app.route("/pets/<int:id>", methods=['PATCH'])
    def patch(id):

        pet = Pet.query.filter_by(id=id).first()

        if pet:

            for attr in request.get_json():
                setattr(pet, attr, request.get_json()[attr])

            db.session.add(pet)
            db.session.commit()

            response_dict = pet.to_dict()

            return response_dict, 200
        else:
            return {"error": "Pet not found"}, 404
    @app.route("/pets/<int:id>", methods=['DELETE'])
    def delete(id):

        pet = Pet.query.filter_by(id=id).first()

        if pet:
           db.session.delete(pet)
           db.session.commit()

           return {"message": "Pet successfully deleted"}, 204
        else:
            return {"error": "Pet not found"}, 404

api.add_resource(PetsByID, '/pets/<int:id>')

class Adoptions(Resource):

    @jwt_required()  
    def get(self):
        adoptions_list = [adoption.to_dict() for adoption in Adoption.query.all()]
        return adoptions_list, 200

    @jwt_required()  
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

@app.route("/user_adoptions", methods=["GET"])
@jwt_required() 
def get_user_adoptions():
    user_id = get_jwt_identity()
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





if __name__ == "__main__":
    app.run(debug=True)