import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function DisplayPets({ pets }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="container mt-5">
      <div className="row">
        {pets.slice(currentIndex, currentIndex + 4).map((pet, index) => (
          <div className="col-md-3" key={index}>
            <div className="card mb-4" style={{ cursor: 'pointer' }}>
              <Link to={`/pet/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={pet.image_url} className="card-img-top" alt={pet.name} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{pet.name}</h5>
                  <p className="card-text">Age: {pet.age}</p>
                  <p className="card-text">Breed: {pet.breed}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container d-flex justify-content-center">
        {currentIndex > 0 && (
          <button className="btn logout-btn mx-2" onClick={previousPets}>
            Back
          </button>
        )}
        {currentIndex + 4 < pets.length && (
          <button className="btn logout-btn mx-2" onClick={nextPets}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default DisplayPets;
