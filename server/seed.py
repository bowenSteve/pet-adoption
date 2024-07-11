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
    pet1 = Pet(name='Mike', pet_type='Cat', breed='Persian', age=2, location='KSPCA', image_url='https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBldHN8ZW58MHx8MHx8fDA%3D',description='')
    pet2 = Pet(name='Peter', pet_type='Dog', breed='Poodle', age=3, location='KSPCA', image_url='https://images.unsplash.com/photo-1601758177266-bc599de87707?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBldHN8ZW58MHx8MHx8fDA%3D',description='')
    pet3 = Pet(name='John', pet_type='Cat', breed='Beagle', age=4, location='KSPCA', image_url='https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBldHN8ZW58MHx8MHx8fDA%3D',description='')
    pet4 = Pet(name='Karen', pet_type='Dog', breed='Beagle', age=4, location='KSPCA', image_url='https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBldHN8ZW58MHx8MHx8fDA%3D',description='')
    pet5 = Pet(name='Rose', pet_type='Dog', breed='Beagle', age=4, location='KSPCA', image_url='https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D',description='')
    pet6 = Pet(name='Cutie', pet_type='Cat', breed='Beagle', age=4, location='KSPCA', image_url='https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D',description='')
    pet7 = Pet(name='Mike', pet_type='Cat', breed='Beagle', age=4, location='KSPCA', image_url='https://images.unsplash.com/photo-1554224155-6720d53d28b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGRvZ3xlbnwwfHx8MHx8fA%3D%3D',description='')
    pet8 = Pet(name='linda', pet_type='Dog', breed='Beagle', age=4, location='KSPCA', image_url='https://images.unsplash.com/photo-1598933272407-bd763ca0c25d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHx8MHx8fA%3D%3D',description='')
    pets = [pet1, pet2, pet3,pet4,pet5,pet6,pet7,pet8]

    print("Creating Adoptions...")
    adopt1 = Adoption(user= user1, pet=pet1, adoption_date='12/12/2023')
    adopt2 = Adoption(user=user2, pet=pet2, adoption_date='2/02/2024')
    adopt3 = Adoption(user=user3, pet=pet3, adoption_date='15/04/2024')
    adoptions = [adopt1, adopt2, adopt3]

    db.session.add_all(users)
    db.session.add_all(pets)
    db.session.add_all(adoptions)

    db.session.commit()

    print("Seeding done")
    
    