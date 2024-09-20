import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FaPaw } from 'react-icons/fa';

function LoggedNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (isLoggedIn) {
      fetch("http://127.0.0.1:5555/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setIsLoggedIn(false);
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navcolor ">
        <Link className='link' to={"/logged"}>
          <h2 className="ms-3 main-text-color">Pawfect Match<FaPaw /></h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <div className="navbar-nav">
            {/* This div is empty intentionally to create spacing on the left side */}
          </div>
          <ul className="navbar-nav custom-nav d-flex justify-content-center align-items-center">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn link main-text-color logout-btn d-flex justify-content-center align-items-center" to="/user_adoptions">
                    PawList
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn link main-text-color logout-btn d-flex justify-content-center align-items-center" to="/CreatePet">
                    Rehome
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <button type="submit" className="btn btn-primary logout-btn d-flex justify-content-center align-items-center" onClick={handleLogout}>
                {isLoggedIn ? <span>Log Out <FontAwesomeIcon icon={faRightToBracket} /></span> : <span>Log In</span>}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default LoggedNav;
