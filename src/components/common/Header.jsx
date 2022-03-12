import React from "react";
import styled from "styled-components";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const HeaderStyle = styled.div`
  width: 100%;
  z-index: 1;
  position: relative;

  .navbar {
    background: #222222 !important;
    min-height: 70px;

    .brand {
      a {
        text-decoration: none;
        display: flex;
        justify-content: center;
        text-align: center;
        font-family: "Black Ops One";
        font-size: 1.5rem;
        color: #fff;
      }
    }
  }

  .links {
    .link.active {
      color: #fff !important;
      background: #0099ff !important;
    }

    .link {
      text-decoration: none;
      color: #fff;
      background: #2d3642;
      padding: 0.7em 0.4em;
      height: 100%;
      border-radius: 5px;
      transition: 0.7s;

      :hover {
        background: #222;
      }
    }

    @media (max-width: 992px) {
      margin-top: 30px;
      margin-bottom: 30px;

      .link {
        padding-top: 0.7em;
        padding-bottom: 0.7em;
        text-align: center;
      }
    }
  }
`;
function Header() {
  return (
    <HeaderStyle>
      {" "}
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="my-nav"
      >
        <Container>
          <Navbar.Brand className="brand">
            <Link to="/">Markdown blog</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto links gap-3 justify-content-end w-100 ">
              <NavLink to="/" className={"link"}>
                Home
              </NavLink>
              <NavLink to="/articles" className={"link"}>
                Articles
              </NavLink>
              <NavLink to="/new" className={"link"}>
                Create Article
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderStyle>
  );
}

export default Header;
