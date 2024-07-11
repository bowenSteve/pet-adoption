import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';


function LoggedNav(){
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
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
       <nav className="navbar navbar-expand-lg custom-navcolor ">
        <a className="navbar-brand" href="#">
        <Link className='link' to={"/logged"}><h2 className="ms-3 main-text-color">Pawfect Match</h2></Link>
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
  <ul className="navbar-nav custom-nav d-flex justify-content-center align-items-center">
      <li className="nav-item">
        <Link className="nav-link btn link main-text-color logout-btn d-flex justify-content-center align-items-center" to="/user_adoptions">
          My Pets
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link btn link main-text-color logout-btn d-flex justify-content-center align-items-center" to="/CreatePet">
          Rehome
        </Link>
      </li>
      <li className="nav-item">
        <button type="submit" className="btn btn-primary logout-btn d-flex justify-content-center align-items-center" onClick={handleLogout}>
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