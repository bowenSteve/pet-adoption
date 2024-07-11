import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoggedNav from "./LoggedNav";

function PetCard() {
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [adoptedMessage, setAdoptedMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/pets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPet(data);
      })
      .catch((err) => {
        console.error("Error fetching pet data:", err);
      });

    // Fetch current user info
    fetch('/current_user')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('User not logged in');
        }
      })
      .then((user) => {
        setCurrentUser(user);
        //console.log(user);
      })
      .catch((err) => {
        console.error("Error fetching current user data:", err);
      });
  }, [id]);
console.log(currentUser)
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const adoptPet = () => {
    if (currentUser && pet) {
      const adoptionData = {
        user_id: currentUser.id,
        pet_id: pet.id,
        adoption_date: new Date().toISOString(),
      };

      fetch('/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adoptionData),
      })
        .then((res) => res.json())
        .then((data) => {
          setAdoptedMessage(`You have adopted ${pet.name}. More details will be sent to your email.`);
        })
        .catch((err) => {
          console.error("Error adopting pet:", err);
        });
    }
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LoggedNav />
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
          {currentUser ? (
            <button className="btn btn-success ms-1" onClick={adoptPet}>
              Adopt
            </button>
          ) : (
            <button className="btn btn-secondary ms-1" disabled>
              Log in to Adopt
            </button>
          )}
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
