import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Jumbotron } from "react-bootstrap";
import { useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import bookData from './bookData.json';

function Book() {
    const { id } = useParams();
    const [book, setBook] = useState();

    useEffect(() => {
        const selectedBook = bookData.books.find((book) => book.id === id);
        setBook(selectedBook);
    }, [id]);

    if(!book) {
        return <div>Book NOt Found!</div>;
    }

    return (
        <html>
            <head>
                <title>도서 정보</title>
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
                        <h1 className="display-3" align="center">도서 정보</h1>
                        <h5 className="display-5" align="center">Book Details</h5>
                    </Container>
                </Jumbotron>

                <Container>
                    <Row>
                        <Col md={4}>
                            <img src={require(`./${book.img}`)} style={{width:`80%`}}></img>
                        </Col>
                        
                        <Col md={8}>
                            <h3>{book.name}</h3>
                            <p>{book.description}</p>
                            <br />
                            <p><b>도서코드 : </b><span className="badge badge-info">{book.id}</span></p>
                            <p><b>저자</b> : {book.author}</p>
                            <p><b>출판사</b> : {book.publisher}</p>
                            <p><b>출판일</b> : {book.releaseDate}</p>
                            <p><b>분류</b> : {book.classification}</p>
                            <p><b>재고수</b> : {book.unitsInStock}</p>
                            <h4>30000원</h4>
                            <br />
                        </Col>
                    </Row>
                </Container>
            </body>
        </html>        
    )
}

export default Book;