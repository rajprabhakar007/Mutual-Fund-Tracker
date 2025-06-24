import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You are logged out!");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand bg-primary navbar-dark px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        <Link className="navbar-brand fs-4" to="/">MutualFundPro</Link>

        
        <div className="d-flex align-items-center gap-3">
          {token ? (
            <>
              <Link className="btn btn-outline-light" to="/saved">My Funds</Link>

              
              <div className="dropdown">
                <div
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer"
                  }}
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt=""
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                      className="rounded-circle"
                      style={{
                        width: "36px",
                        height: "36px",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-light text-primary d-flex justify-content-center align-items-center position-relative"
                      style={{
                        width: "36px",
                        height: "36px",
                        fontWeight: "bold"
                      }}
                    >
                      {getInitials(user?.name)}
                      <span
                        className="position-absolute"
                        style={{
                          bottom: -8,
                          right: -3,
                          fontSize: "10px",
                          color: "black"
                        }}
                      >
                      </span>
                    </div>
                  )}
                </div>

                <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="userMenu">
                  <li>
                    <button className="dropdown-item" onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light" to="/login">Login</Link>
              <Link className="btn btn-light text-primary" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
