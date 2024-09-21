import React, { useState } from 'react';
import { FaPaw } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [email, setEmail] = useState('');
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
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((err) => {
            setErrors([err.message]);
            throw new Error(err.message);
          });
        }
      })
      .then((data) => {
        setLoggedInUser(data);
        localStorage.setItem("token", data.access_token); 
        navigate("/logged");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light custom-navcolor">
        <Link className="link navbar-brand ms-3 main-text-color" to={"/"}>
          <h2>Pawfect Match<FaPaw /></h2>
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

        <div className="collapse navbar-collapse">
          {/* Left-aligned content */}
          <div className="me-auto"></div>

          {/* Right-aligned content */}
          <ul className="navbar-nav ms-auto">
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
                  <div className="d-flex align-items-center ">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    <span>Login/Register</span>
                  </div>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Login/Register Offcanvas */}
      <div
        className="offcanvas offcanvas-end custom-navcolor"
        tabIndex="-1"
        id="offcanvasLogin"
        aria-labelledby="offcanvasLoginLabel"
      >
        <div className="offcanvas-header ms-auto">
         
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary custom-login-btn login-btn" style={{ width: '200px' }}>
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
              <Link to={"/signup"}><span className="ms-1">Create Account</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
