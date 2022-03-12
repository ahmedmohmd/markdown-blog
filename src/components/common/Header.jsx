import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../../styles/header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      {" "}
      <Navbar
        className={styles.navbar}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand className={styles.brand}>
            <Link to="/">Markdown blog</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className={
                styles.links + " me-auto gap-3 justify-content-end w-100 "
              }
            >
              <NavLink to="/" className={styles.link}>
                Home
              </NavLink>
              <NavLink to="/articles" className={styles.link}>
                Articles
              </NavLink>
              <NavLink to="/new" className={styles.link}>
                Create Article
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
