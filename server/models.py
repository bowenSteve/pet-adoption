from  flask_sqlachemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData


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
    adoptions=db.relationship('Adoption',backref='user')

class Pet(db.Model,SerializerMixin):
    __tablename__='pets'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.string,nullable=False)
    age = db.column(db.Integer,nullable=False)
    shelter_id=db.Column(db.Integer,db.ForeignKey('shelter.id'))
    adoptions=db.relationship('Adoption',backred='pet')

class Shelter(db.Model,SerializerMixin):
    __tablename__='shelter'

    id=db.Column(db.Integer, primary_key=True)
    name=db.column(db.String,nullable=False)
    location=db.Column(db.String, nullable=False)
    pets=db.relationship('Pets', backref='shelter')

class Adoption(db.Model,SerializerMixin):
    __tablename__='adoption'

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id', nullable=False))
    pet_id=db.column(db.Integer, db.ForeignKey('pet.id',nullable=False))
    adoption_date=db.Column(db.Date,nullable=False)
    comments=db.Column(db.String)


