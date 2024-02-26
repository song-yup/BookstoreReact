import React, { userState, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Jumbotron } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import bookData from './bookData.json';
import Book from "./book";

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(bookData.books);
    }, []);

    return (
        <html>
            <head>
                <title>도서 목록</title>
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
                    <h1 className="display-3" align="center">도서 목록</h1>
                    <h5 className="display-5" align="center">Books List</h5>
                </Container>
            </Jumbotron> 

            <Container>
                <Row align="center">
                    {books.map((book) => (
                        <Col md={4} key={book.id}>
                            <img src={require(`./${book.img}`)} style={{width:'60%'}} alt="이미지 없음"></img>
                            <h3>{book.name}</h3>
                            <p>{book.author}</p>
                            <br />
                            {book.publisher} | {book.releaseDate}
                            <br />
                            <br />
                            <p align="left">{book.description}</p>
                            <p>{book.unitPrice}원</p>
                            <Link to={`/books/book/${book.id}`} className="btn btn-Secondary" role="button">상세정보 &raquo;</Link>
                        </Col>
                        ))}
                    </Row>
                </Container>
            </body>
        </html>        
    )
}

export default Books;