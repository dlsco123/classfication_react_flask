import React, { useState, useEffect,useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from 'axios';

function Header() {
    const [nickname, setNickname] = useState("");
    const [profile, setProfile] = useState('default.png');

    const TokenEmail = localStorage.getItem("email");

    const token = useMemo(() => ({ email: TokenEmail }), [TokenEmail]);
    const [logIn, setLogIn] = useState(false);
  

  useEffect(() => {
    axios.post("http://localhost:3000/allmember", token)
        .then((response) => {
            setNickname(response.data.nickname); 
            setProfile(response.data.profile);               
        })
        .catch((error) => {
            console.error(error);
        });
  }, [token]);

  useEffect(() => {
    const logInUser = JSON.parse(localStorage.getItem("login"));
    if (logInUser && logInUser.nickname) {
      setLogIn(true);
      setNickname(logInUser.nickname);
    }
  }, []);

  return (
    <Navbar bg="light" expand="lg" style={{ padding: "0.5rem 1rem" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src="/gpt_logo.png"
              style={{
                width: "4vw",
                marginRight: "1rem",
              }}
              alt="GPT Logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavDropdown
              title="GYMS"
              id="gyms-dropdown"
              style={{ marginLeft: "5vw" }}
            >
              <NavDropdown.Item as={Link} to="/gyms">
                GYMS
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/trainers">
                TRAINERS
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="STORE"
              id="INFORMATION-dropdown"
              style={{ marginLeft: "5vw" }}
            >              
              <NavDropdown.Item as={Link} to="/charge">
                CHARGE
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/payCoin">
                PAYCOIN
              </NavDropdown.Item>
            </NavDropdown>            
          </Nav>
          <Nav className="ms-auto" style={{ marginTop: "-3rem" }}>
          {logIn ? (
        <>
          <Nav.Link
            as={Link}
            to="/mypage"
            className="nav-link"
            style={{ fontSize: "0.9rem" }}
          >
            <Link to="/mypage"><img alt="프로필이미지" src={`http://localhost:3000/images/${profile}`}
                    style={{cursor: "pointer"}}
                    width="20px"
                    height="20px"/>
            </Link>
            {nickname}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/logout"
            className="nav-link"
            style={{ fontSize: "0.9rem" }}
          >
            LOGOUT
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link
            as={Link}
            to="/login"
            className="nav-link"
            style={{ fontSize: "0.9rem" }}
          >
            LOGIN
          </Nav.Link>
        </>
      )}
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;