from app import app
from models import db, User, Pet, Adoption

with app.app_context():

    print("Deleting data...")
    User.query.delete()
    Pet.query.delete()
    Adoption.query.delete()

    print("Creating users...")
    user1 = User(name='Stephen Bowen', email='stephen@gmail.com')
    user2 = User(name='Marion Aluoch', email='marion@gmail.com')
    user3 = User(name='Dennis Kinyanjui', email='dennis@gmail.com')
    users = [user1, user2, user3]

    print("Creating pets...")
    pet1 = Pet(name='Mike', pet_type='Cat', breed='Persian', age=2, location='KSPCA')
    pet2 = Pet(name='Peter', pet_type='Dog', breed='Poodle', age=3, location='KSPCA')
    pet3 = Pet(name='John', pet_type='Dog', breed='Beagle', age=4, location='KSPCA')
    pets = [pet1, pet2, pet3]

    print("Creating Adoptions...")
    adopt1 = Adoption(user= user1, pet=pet1, adoption_date='12/12/2023', comments='Mike is a good pet')
    adopt2 = Adoption(user=user2, pet=pet2, adoption_date='2/02/2024', comments='Peter is a good pet')
    adopt3 = Adoption(user=user3, pet=pet3, adoption_date='15/04/2024', comments='John is a good pet')
    adoptions = [adopt1, adopt2, adopt3]

    db.session.add_all(users)
    db.session.add_all(pets)
    db.session.add_all(adoptions)

    db.session.commit()

    print("Seeding done")
    
    