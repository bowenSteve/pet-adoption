from app import app
from models import db, User, Pet, Shelter, Adoption

with app.app_context():

    print("Deleting data...")
    User.query.delete()
    Pet.query.delete()
    Adoption.query.delete()
    Shelter.query.delete()

    print("Creating users...")
    user1 = User(name='Stephen Bowen', email='stephen@gmail.com')
    user2 = User(name='Marion Aluoch', email='marion@gmail.com')
    user3 = User(name='Dennis Kinyanjui', email='dennis@gmail.com')

    print("Creating shelters...")
    shelter1 = Shelter(name='KSPCA', location='Karen, Nairobi')
    shelter2 = Shelter(name='Nairobi Feline Sanctuary', location='Kayole, Nairobi')

    print("Creating pets...")
    pet1 = Pet(name='Mike', pet_type='Cat', breed='Persian', age=2, shelter=shelter2)
    pet2 = Pet(name='Peter', pet_type='Dog', breed='Poodle', age=3, shelter=shelter1)
    pet3 = Pet(name='John', pet_type='Dog', breed='Beagle', age=4, shelter=shelter1)

    print("Creating Adoptions...")
    adopt1 = Adoption(user=, pet=, )
    adopt2 =
    adopt3 =
    