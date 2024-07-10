import { useNavigate, Link } from "react-router-dom";
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
        <Link className='link' to={"/logged"}><h2 className="ms-3 text-color">Pawfect Match</h2></Link>
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
        <Link className="link" to={"/CreatePet"}>Create a Pet</Link>
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