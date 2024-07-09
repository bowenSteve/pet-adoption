import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PetCard() {
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite status
  const [adoptedMessage, setAdoptedMessage] = useState(""); // State for adoption message
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/Pets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
      })
      .catch((err) => {
        console.error("Error fetching pet data:", err);
      });
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle favorite status
  };

  const adoptPet = () => {
    // Implement your adopt pet logic here
    setAdoptedMessage(`You have adopted ${pet.name}. More details will be sent to your email`); // Set the adoption message
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="card mb-4 text-center">
        <div
          className="card-img-container"
          style={{
            height: "300px",
            width: "400px",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <img
            src={pet.image_url}
            className="card-img-top"
            alt={pet.name}
            style={{ height: "100%", width: "auto" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
          <p className="card-text">Age: {pet.age}</p>
          <p className="card-text">Breed: {pet.breed}</p>
          <button
            className={`btn btn-${isFavorite ? "danger" : "outline-primary"} mr-3`}
            onClick={toggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Mark as Favorite"}
          </button>
          <button className="btn btn-success ms-1" onClick={adoptPet}>
            Adopt
          </button>
          {adoptedMessage && (
            <div className="mt-3">
              <p className="text-success">{adoptedMessage}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PetCard;
