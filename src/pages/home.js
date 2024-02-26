import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Jumbotron } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
    return (
        <html>
            <head>
                <title>도서 웹 쇼핑몰</title>
            </head>
            <body>
                <header>
                    <Nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Container>
                            <Navbar header>
                                <a className="navbar-brand" style={{ color: 'white' }}>Book Market</a>
                            </Navbar>
                            <div>
                                <ul className="navbar-nav mr-auto">
                                    <li><Link to="/home" className="nav-link" role="button">Home</Link></li>
                                    <li><Link to="/books" className="nav-link" role="button">Books</Link></li>
                                    <li><Link to="/add" className="nav-link" role="button">Add Book</Link></li>
                                    <li className="nav-item"><a className="nav-link" href="#">Cart</a></li>
                                    <li className="nav-item"><a className="nav-link" href="#">My Page</a></li>
                                    <li><Link to="/join" className="nav-link" role="button">Join</Link></li>
                                    <li><Link to="/login" className="nav-link" role="button">Log In</Link></li>
                                </ul>    
                            </div>
                        </Container>
                    </Nav>
                </header>   

                <Jumbotron> 
                    <Container>
                        <h1 className="display-3" align="center">도서 웹 쇼핑몰</h1>
                        <h5 className="display-5" align="center">Welcome to BookMarket</h5>
                    </Container>
                </Jumbotron>

                <Container>
                    <h4 className="display-4" align="center">Welcome to Web Shopping Mall!</h4>
                </Container>
            </body>
        </html>        
    )
}

export default Home;