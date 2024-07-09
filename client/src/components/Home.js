import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import DispayPets from './DisplayPets';

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/Pets')
      .then(res => res.json())
      .then(data => {
        setPets(data);
      });
  }, []);

  const sortPets = (sortBy) => {
    // Create a copy of pets array to avoid mutating state directly
    const sortedPets = [...pets];

    // Sort by breed
    if (sortBy === 'breed') {
      sortedPets.sort((a, b) => {
        if (a.breed < b.breed) return -1;
        if (a.breed > b.breed) return 1;
        return 0;
      });
    }
    // Sort by age
    else if (sortBy === 'age') {
      sortedPets.sort((a, b) => a.age - b.age);
    }

    // Update state with sorted pets
    setPets(sortedPets);
  };

  return (
    <div>
      <Navbar />
      <div className="container ms-0">
        <div className="sort-container">
          <span>Sort:</span>
          <div className="form-group ml-2">
            <select className="form-control" onChange={(e) => sortPets(e.target.value)}>
              <option value="breed">Breed</option>
              <option value="age">Age</option>
            </select>
          </div>
        </div>
      </div>
      <DispayPets pets={pets} />
      <Footer />
    </div>
  );
}

export default Home;
