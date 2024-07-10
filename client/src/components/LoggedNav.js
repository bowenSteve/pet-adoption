import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

function LoggedNav(){
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch('http://127.0.0.1:5555/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
  };
    return (
        <div>
       <nav className="navbar navbar-expand-lg navbar-light navbar-color">
        <a className="navbar-brand" href="#">
          <h2 className="ms-3 text-color ">Pawfect Match</h2>
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
  <ul className="navbar-nav custom-nav">
    <li className="nav-item">
      <a className="nav-link d-flex justify-content-center" href="#">
        My Pets
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link d-flex justify-content-center" href="#">
        Create a Pet
      </a>
    </li>
    <li className="nav-item ">
  <button type="submit" className="btn btn-primary logout-btn" onClick={handleLogout}>
    Log Out <FontAwesomeIcon icon={faRightToBracket} />
  </button>
</li>

  </ul>
</div>

        </nav>


        </div>

    )
}

export default LoggedNav