from  flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData,CheckConstraint
from sqlalchemy.orm import validates, relationship


metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db =SQLAlchemy(metadata=metadata)

class User (db.Model,SerializerMixin):
    __tablename__='users'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    email=db.Column(db.String, unique=True,nullable=False)

    adoptions=db.relationship('Adoption',back_populates='user')

    @validates('name')
    def validate_name(self,key,name):
        if not name:
            raise ValueError('Name is required.')
        return name
    

    @validates('email')
    def validate_email(self,key,email):
        if '@' not in email:
            raise ValueError('Email address is required')
        return email



class Pet(db.Model,SerializerMixin):
    __tablename__='pets'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String,nullable=False)
    pet_type=db.Column(db.String, nullable=False)
    breed=db.Column(db.String, nullable=False)
    age = db.Column(db.Integer,nullable=False)
    shelter_id=db.Column(db.Integer,db.ForeignKey('shelters.id'))

    adoptions=db.relationship('Adoption',back_populates='pet')
    shelter=db.relationship('Shelter', back_populates='pets')

    @validates('name')
    def validate_name(self,key,name):
        if not name:
            raise ValueError('Pet name is required.')
        return name
    
    @validates('type')
    def validate_type(self,key,type):
        if not type:
            raise ValueError('Pet type is required.')
        return type

    @validates('breed')
    def validate_breed(self,key,breed):
        if not breed:
            raise ValueError('Pet breed if required.')
        return breed    
    
    @validates('age')
    def validate_age(self,key,age):
        if age is None or age <0:
            raise ValueError('Pet age must be a positive number.')
        return age

class Shelter(db.Model,SerializerMixin):
    __tablename__='shelters'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String,nullable=False)
    location=db.Column(db.String, nullable=False)
    
    pets=db.relationship('Pet', back_populates='shelter')

    @validates('name')
    def validate_name(self,key,name):
        if not name:
            raise ValueError('Shelter name is required.')
        return name
    
    @validates('location')
    def validate_location(self,key,location):
        if not location:
            raise ValueError('Location is required.')
        return location

class Adoption(db.Model,SerializerMixin):
    __tablename__='adoptions'

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id', nullable=False))
    pet_id=db.Column(db.Integer, db.ForeignKey('pets.id',nullable=False))
    adoption_date=db.Column(db.String)
    comments=db.Column(db.String)
    
    user=db.relationship('User', back_populates='adoptions')
    pet=db.relationship('Pet',back_populates='adoptions')

    @validates('adoption_date')
    def validates_date(self,key,adoption_date):
        if not adoption_date:
            raise ValueError('Adoption date required')
        return adoption_date



