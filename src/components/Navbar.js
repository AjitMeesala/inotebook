import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  const Navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("authToken");
    Navigate("/login");
    props.showAlert("User logged out successfully.", "success");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active': ''}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active': ''}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          { !localStorage.getItem("authToken") ? <form className="d-flex" role="search">
            <Link to="/login" className="btn btn-primary" role="button" >Login</Link>
            <Link to="/signup" className="btn btn-primary mx-2" role="button" >Signup</Link>
          </form> : <button className="btn btn-primary" onClick={handleClick}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
