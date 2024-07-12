import React, { useState} from 'react';
import {FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username}),
    })
    .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setLoggedInUser(user);
          console.log(user)
          navigate("/logged");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  console.log(loggedInUser)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light custom-navcolor">
        <a className="navbar-brand" href="#">
          <Link className='link' to={"/"}><h2 className="ms-3 main-text-color">Pawfect Match<FaPaw /></h2></Link>
        </a>
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
          <ul className="navbar-nav">
            <li className="nav-item">
              {loggedInUser ? (
                <button type="button" className="btn btn-primary custom-login-btn" style={{ width: '150px' }}>
                  Log Out <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              ) : (
                <a
                  className="nav-link d-flex justify-content-center main-text-color fs-5"
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasLogin"
                  aria-controls="offcanvasLogin"
                >
                     <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                 <span>Login/Register</span>
               </div>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasLogin"
        aria-labelledby="offcanvasLoginLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLoginLabel">
            Login/Register
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleLogIn}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary custom-login-btn login-btn logout-btn" style={{ width: '200px' }}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            {errors.length > 0 && (
              <div className="mt-2">
                {errors.map((error, index) => (
                  <div key={index} className="alert alert-danger">
                    {error}
                  </div>
                ))}
              </div>
            )}
      
            <div className="mt-2">
              <span>Don't have an account?</span>
              <Link to={"/signup"}><a className="ms-1" href="">Create Account</a></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
