import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function NewBooks() {
    const [books, setBooks] = useState([]);
    const url="/api/books/new";

    useEffect(() => {
        axios.get(`${url}`)
        .then(response => setBooks(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <html>
            <head>
                <title>도서 목록</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">신간 도서 목록</h1>
                        <h5 className="display-5" align="center">New Books List</h5>
                    </div>
                </div> 

                <div className="container">
                    <div className="row">
                        {books && books.map((book, index) => (
                            <div className="col-12 d-flex mb-4" key={book.id}
                                style={{
                                    borderBottom: index !== books.length - 1 ? '1px solid #dee2e6' : '', // 마지막 항목에는 선을 추가하지 않습니다.
                                    paddingBottom: '1rem' // 구분선과 컨텐츠 사이에 공간을 추가합니다.
                                }}
                            >
                                <div>
                                    <Link to={`/books/book/${book.id}`}>
                                        <br />
                                        <img src={book.imageurl} style={{width:'100%', padding: '0 15px 15px 0'}} alt={book.bookname} />
                                    </Link>
                                </div>
                                <div>
                                    <br />
                                    <Link to={`/books/book/${book.id}`}>
                                        <h3>{book.bookname}</h3>
                                    </Link>
                                    <p>{book.author}</p>
                                    {book.publisher} | {book.releasedate}
                                    <br />
                                    <br />
                                    <p><h5>₩{book.price}</h5></p>
                                    <br />
                                    <p>{book.description.length > 100 ? book.description.slice(0, 100) + "..." : book.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            
            </body>
        </html>        
    )
}

export default NewBooks;