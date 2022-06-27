//* Imports
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logOut } from "../../services/userService";
import styles from "../../styles/header.module.scss";

//* Header JSX
function Header({ user }) {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <nav
        className={
          "navbar navbar-expand-lg navbar-dark bg-dark " + styles.navbar
        }
      >
        <div className="container">
          <div className={"navbar-brand " + styles.brand}>
            <Link to="/">Markdown blog</Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="responsive-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div
              className={
                styles.links +
                " navbar-nav me-auto gap-3 justify-content-end w-100"
              }
            >
              <NavLink to="/" className={"nav-link " + styles.link}>
                Home
              </NavLink>
              <NavLink to="/allArticles" className={"nav-link " + styles.link}>
                Articles
              </NavLink>

              {Object.keys(user).length > 1 ? (
                <React.Fragment>
                  <NavLink
                    to="/dashboard"
                    className={"nav-link " + styles.link}
                    onClick={() => {
                      setTimeout(() => {
                        navigate("/dashboard/userData");
                      }, 0);
                    }}
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/login"
                    onClick={async () => {
                      localStorage.removeItem("token");
                      await logOut();
                      window.location = "/login";
                    }}
                    className={"nav-link " + styles.link}
                  >
                    Logout
                  </NavLink>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavLink to="/register" className={"nav-link " + styles.link}>
                    Register
                  </NavLink>

                  <NavLink to="/login" className={"nav-link " + styles.link}>
                    Login
                  </NavLink>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
