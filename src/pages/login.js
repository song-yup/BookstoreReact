import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Jumbotron } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function LogIn() {
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
                        <h1 className="display-3" align="center">로그인</h1>
                        <h5 className="display-5" align="center">Log In</h5>
                    </Container>
                </Jumbotron>

                <div className="container col-md-4">
                        <div className="text-center">
                            <h3 className="form-signin-heading">Please Sign In</h3>
                        </div>
                        <form className="form-signin" action="#" method="POST">
                            <div className="form-group row">
                                <input type="text" name="username" className="form-control" placeholder="User Name" required />
                            </div>
                            <div className="form-group row">
                                <input type="password" name="password" className="form-control" placeholder="PassWord" required />   
                            </div>
                            <div className="form-group row">
                                <button className="btn btn-lg btn-success btn-block" action="#" type="submit">로그인</button>                            
                            </div>                
                        </form>
                </div>
            </body>
        </html>        
    )
}

export default LogIn;