import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import LoggedNav from "./LoggedNav";

function Adoptions() {
  const [pets, setPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/user_pets')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setPets(data);
      })
      .catch(error => {
        console.error('Error fetching user adoptions:', error);
      });
  }, []);

  const nextPets = () => {
    if (currentIndex + 4 < pets.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const previousPets = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/pets/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete pet with ID ${id}`);
      }
      setPets(pets.filter(pet => pet.id !== id));
    } catch (error) {
      console.error(`Error deleting pet with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="main-text-color">MyPets</h1>
      </div>
      <div className="container mt-5">
        <div className="row">
          {pets.slice(currentIndex, currentIndex + 4).map((pet, index) => (
            <div className="col-md-3" key={index}>
              <div className="card mb-4" style={{ cursor: 'pointer' }}>
                <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={pet.image_url} className="card-img-top" alt={pet.name} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p className="card-text">Age: {pet.age}</p>
                  <p className="card-text">Breed: {pet.breed}</p>
                  <p className="card-text">Description: {pet.description}</p>
                </div>
                <div className="btn-group">
                  <Link to={`/modifypet/${pet.id}`}><button className="btn btn-custom logout-btn">Modify Pet</button></Link>
                  <button className="btn btn-custom btn-delete logout-btn" onClick={() => handleDelete(pet.id)}>Delete Pet</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-container d-flex justify-content-center">
          {currentIndex > 0 && (
            <button className="btn btn-primary mx-2" onClick={previousPets}>
              Back
            </button>
          )}
          {currentIndex + 4 < pets.length && (
            <button className="btn btn-primary mx-2" onClick={nextPets}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Adoptions;
