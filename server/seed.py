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
    pet9 = Pet(name='Bella', pet_type='Dog', breed='Labrador', age=4, location='KSPCA', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch87GUSVdpELGX2B_T6XVAM1CoFj5p61GtQ&s',description='')
    pet10 = Pet(name='Max', pet_type='Cat', breed='Siamese', age=8, location='KSPCA', image_url='https://www.catster.com/wp-content/uploads/2023/11/Siamese-Cat_Andreas-LischkaPixabay-800x533.jpg',description='')
    pet11 = Pet(name='Luna', pet_type='Dog', breed='German Shepherd', age=5, location='KSPCA', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzNzBhGFkgplAEbRxGzLbzk-Q0CkDLetmNZA&s',description='')
    pet12 = Pet(name='Charlie', pet_type='Cat', breed='Bengal', age=2, location='KSPCA', image_url='https://www.catster.com/wp-content/uploads/2023/12/bengal-cat-sitting-on-the-floor_Eric-Isselee_Shutterstock.jpg',description='')
    pet13 = Pet(name='Daisy', pet_type='Dog', breed='Golden Retriever', age=6, location='KSPCA', image_url='https://image.petmd.com/files/inline-images/golden-retriever-2.jpg?VersionId=9HAclc1bWh8XvyNoGi2.UxpdEp1gygb_',description='')
    pet14 = Pet(name='Rocky', pet_type='Dog', breed='Bulldog', age=9, location='KSPCA', image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/640px-Bulldog_inglese.jpg',description='')
    pet15 = Pet(name='Molly', pet_type='Cat', breed='Persian', age=3, location='KSPCA', image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Fluffy_White_Persian_Cat.jpg/220px-Fluffy_White_Persian_Cat.jpg',description='')
    pet16 = Pet(name='Buddy', pet_type='Dog', breed='Rottweiler', age=4, location='KSPCA', image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Rottweiler_standing_facing_left.jpg/800px-Rottweiler_standing_facing_left.jpg',description='')
    pet17 = Pet(name='Sadie', pet_type='Dog', breed='Beagle', age=7, location='KSPCA', image_url='https://www.dogster.com/wp-content/uploads/2012/05/beagle-dog-standing-outdoor_Artyom-Gantsev_Shutterstock.jpg',description='')
    pet18 = Pet(name='Cooper', pet_type='Cat', breed='British Shorthair', age=6, location='KSPCA', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV88aLokC37dGZeLMZ7liNdvwvbA-9NIDQNQ&s',description='')
    pet19 = Pet(name='Lola', pet_type='Dog', breed='Dachshund', age=1, location='KSPCA', image_url='https://cdn.britannica.com/13/234213-050-45F47984/dachshund-dog.jpg',description='')
    pet20 = Pet(name='Milo', pet_type='Dog', breed='Poodle', age=9, location='KSPCA', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmnueMINKqoyf835Alf4XNZb1UMmCdeVx7jA&s',description='')
    pets = [pet1, pet2, pet3,pet4,pet5,pet6,pet7,pet8,pet9,pet10,pet11,pet12,pet13,pet14,pet15,pet16,pet17,pet18,pet19,pet20]
  

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
    
    