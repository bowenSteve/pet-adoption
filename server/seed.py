from app import app
from models import db, User, Pet, Shelter, Adoption

with app.app_context():

    print("Deleting data...")
    User.query.delete()
    Pet.query.delete()
    Adoption.query.delete()
    Shelter.query.delete()

    print("Creating users...")
    user1 = User(name='Stephen Bowen', email='')
    user2 = User(name='Marion Aluoch', email='')
    user3 = User(name='', email='')
    