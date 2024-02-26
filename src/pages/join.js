import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Jumbotron } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Join() {
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
                        <h1 className="display-3" align="center">회원 가입</h1>
                        <h5 className="display-5" align="center">Join</h5>
                    </Container>
                </Jumbotron>

                <div className="container col-md-4">
                    <div className="text-center">
                        <h3 className="form-signin-heading">Please Create Your Accout</h3>
                    </div>
                    <form modelAttribute="member" className="form-signin" action="#" method="POST">
                        <div className="form-group row">
                            ID <input type="text" name="username" className="form-control" placeholder="User ID" required />
                        </div>
                        <div className="form-group row">
                            비밀번호 <input type="password" name="password" className="form-control" placeholder="Password" required />
                        </div>
                        <div className="form-group row">
                            고객 성명 <input type="text" name="name" className="form-control" placeholder="User Name" required />
                        </div>
                        <div className="form-group row">
                            전화번호 <input type="text" name="phonenum" className="form-control" placeholder="Phone Num" required />
                        </div>
                        <div className="form-group row">
                            <input type="radio" name="authority" value="ROLE_ADMIN" />Admin &nbsp;
                            <input type="radio" name="authority" value="ROLE_USER" />User 
                        </div>
                        <div className="form-group row">
                            <label for="enabled">회원 가입에 동의 하십니까?
                            <br />
                            <input type="checkbox" id="enabled" name="enabled" required />동의함
  				            <br />
                            </label>
                        </div>
                        <div className="form-group row">
                            <button class="btn btn-lg btn-success btn-block" type="submit">회원가입</button>                
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                        </div>
                    </form>                    
                </div>


            </body>
        </html>
    )
}

export default Join;