
function Navbar(){
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <h2 className="ms-3 text-color">Pawfect Match</h2>
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="mx-auto d-flex search-container">
            <input
              className="form-control search-bar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success ml-2" type="submit">
              Search
            </button>
          </div>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link"
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
            <button type="submit" className="btn btn-primary custom-login-btn">
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
    )
}
export default Navbar