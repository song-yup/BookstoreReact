import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Jumbotron } from "react-bootstrap";
import { useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";

function addBook() {
    return (
        <html>
            <head>
                <title>도서 등록</title>
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
                                    <li className="nav-item"><a className="nav-link" href="#">Join</a></li>
                                    <li><Link to="/login" className="nav-link" role="button">Log In</Link></li>
                                </ul>    
                            </div>
                        </Container>
                    </Nav>
                </header>   

                <Jumbotron> 
                    <Container>
                        <h1 className="display-3" align="center">도서 등록</h1>
                        <h5 className="display-5" align="center">Book Addition</h5>
                    </Container>
                </Jumbotron>
                <Container>
                    <legend>신규 도서 등록</legend>
                    <form modelAttribute="NewBook" onSubmit="#" className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                도서 ID
                            </label>
                            <Col md={3}>
                                <input path="bookId" className="form-control" />
                            </Col>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                도서명
                            </label>
                            <Col md={3}>
                                <input path="bookname" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                가격
                            </label>
                            <Col md={3}>
                                <input path="price" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">  
                                저자
                            </label>
                            <Col md={3}>
                                <input path="author" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                상세정보
                            </label>
                            <Col md={3}>
                                <textarea path="description" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                출판사
                            </label>
                            <Col md={3}>
                                <input path="publisher" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                분류
                            </label>
                            <Col md={3}>
                                <input path="classification" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                재고수
                            </label>
                            <Col md={3}>
                                <input path="unitsInStock" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                출판일
                            </label>
                            <Col md={3}>
                                <input path="releaseDate" className="form-control" />
                            </Col>                        
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                상태
                            </label>
                            <Col md={3}>
                                <input type="radio" name="condition" value="New" />New &nbsp;
                                <input type="radio" name="condition" value="Old" />Old &nbsp;
                                <input type="radio" name="condition" value="E-Book" />E-Book
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                도서이미지
                            </label>
                            <Col md={3}>
                                <input type="file" className="form-control" />
                            </Col>                            
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-offset-2 col-sm-10">
                                <input type="submit" className="btn btn-primary" value="등록" />
                            </div>
                        </div>
                    </form>                    
                </Container>


            </body>
        </html>
    )
}

export default addBook;