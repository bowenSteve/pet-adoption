import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import LoggedNav from "./LoggedNav";

function Adoptions(){
const [pets, setPets]=useState([])
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
    fetch('/user_adoptions')
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
}, [])
    const newPets = pets.map(pet=>{
        return pet
    })
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
    return(
        <div>
        <LoggedNav />
        <div className="container mt-5">
        <div className="row">
          {pets.slice(currentIndex, currentIndex + 4).map((pet, index) => (
            <div className="col-md-3" key={index}>
              <div className="card mb-4" style={{ cursor: 'pointer' }}>
                <Link to={`/pet/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={pet.pet.image_url} className="card-img-top" alt={pet.pet.name} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{pet.pet.name}</h5>
                    <p className="card-text">Age: {pet.pet.age}</p>
                    <p className="card-text">Breed: {pet.pet.breed}</p>
                  </div>
                </Link>
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
    )

}
export default Adoptions