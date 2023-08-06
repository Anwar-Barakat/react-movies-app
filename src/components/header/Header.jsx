import React from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    const navData = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "About", link: "/about" },
        { id: 3, name: "Contact", link: "/contact" },
        { id: 4, name: "Movies", link: "/movies" },
        { id: 5, name: "TV Series", link: "/tv" },
    ];
    return (
        <Navbar
            expand="lg"
            className="bg-body-tertiary header"
            bg="dark"
            data-bs-theme="dark"
        >
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1844/1844015.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        {navData.map((ele) => {
                            return (
                                <Nav.Link key={ele.id}>
                                    <Link to={ele.link}>{ele.name}</Link>
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
