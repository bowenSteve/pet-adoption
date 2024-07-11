import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import DisplayPets from './DisplayPets';
import LoggedNav from './LoggedNav';


function Home() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/pets')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setFilteredPets(data);
        console.log(data)
      });
  }, []);

  const sortPets = (sortBy) => {
    const sortedPets = [...pets];
    if (sortBy === 'breed') {
      sortedPets.sort((a, b) => {
        if (a.breed < b.breed) return -1;
        if (a.breed > b.breed) return 1;
        return 0;
      });
    }
    else if (sortBy === 'age') {
      sortedPets.sort((a, b) => a.age - b.age);
    }

 
    setPets(sortedPets);
    setFilteredPets(sortedPets);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = pets.filter(item => {
      return (
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.breed.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredPets(filteredData);
  };

  return (
    <div> 
        <LoggedNav />
          <div className="container ms-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="sort-container" style={{ margin: '0' }}>
            <span>Sort:</span>
            <div className="form-group ml-2">
              <select className="form-control" onChange={(e) => sortPets(e.target.value)}>
                <option value="breed">Breed</option>
                <option value="age">Age</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="mx-auto d-flex align-items-center">
            <input
              className="form-control search-bar"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button className="btn btn-outline-success ml-2" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <DisplayPets pets={filteredPets} />
      <Footer />
    </div>
  );
}

export default Home;
