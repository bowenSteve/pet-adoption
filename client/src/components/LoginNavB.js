import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function LoginNavB(){

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
            <li className="nav-item">
            
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default LoginNavB