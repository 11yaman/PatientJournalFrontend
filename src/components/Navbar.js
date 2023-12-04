import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const Navbar = ({ title = "Patient Journal System" }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {user.role === "PATIENT" && (
                  <li className="nav-item">
                    <Link to="/myinfo" className="nav-link">
                      My Info
                    </Link>
                  </li>
                )}
                {user.role === "EMPLOYEE" && (
                  <>
                  <li className="nav-item">
                      <Link to="/employee" className="nav-link">
                        Employee
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/messages/active" className="nav-link">
                        Messages
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/patients/all" className="nav-link">
                        All patients
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item" onClick={handleLogout}>
                  <button className="btn btn-danger">Log out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;