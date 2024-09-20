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

      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://127.0.0.1:5555/current_user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) =>
            response.ok ? response.json() : Promise.reject("Failed to fetch current user")
          )
          .then((data) => {
            if (data.id) {
              setCurrentUser(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching current user:", error);
          });
      }
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
          {/* <button
            className={`btn logout-btn btn-${isFavorite ? "danger" : "outline-primary"} mr-3`}
            onClick={toggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Mark as Favorite"}
          </button> */}
          {currentUser ? (
            <button className="btn logout-btn ms-1" onClick={adoptPet}>
              Adopt
            </button>
          ) : (
            <button className="btn logout-btn ms-1" disabled>
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
