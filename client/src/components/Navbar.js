import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <Link className='link' to={"/"}><h2 className="ms-3 text-color ">Pawfect Match</h2></Link>
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
              <a
                className="nav-link d-flex justify-content-center"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasLogin"
                aria-controls="offcanvasLogin"
              >
                Login/Register
              </a>
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
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
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
              />
            </div>
            <button type="submit" className="btn btn-primary custom-login-btn login-btn" style={{ width: '200px' }}>
              Login
            </button>
            <div className="mt-2">
              <span>Don't have an account?</span>
              <a className="ms-1" href="">Create Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
