import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


function Categorybooks() {
    const [books, setBooks] = useState([]);
    const { category } = useParams('');

    useEffect(() => {
        axios.get(`/api/${category}/books`)
        .then(response => setBooks(response.data))
        .catch(error => console.log(error))
    }, [category]);


    return (
        <html>
            <head>
                <title>도서 목록</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">카테고리별 도서 목록</h1>
                        <h5 className="display-5" align="center">Category Book List</h5>
                    </div>
                </div> 

            <div className="container">
                <div className="row" align="center">
                    {books && books.map((book) => (
                        <div className="col-md-4" key={book.id}>
                            <img src={book.imageurl} style={{width:'60%'}}></img>
                            <h4>{book.bookname}</h4>
                            <p>{book.author}</p>
                            {book.publisher} | {book.releasedate}
                            <p>₩{book.price}</p>
                            <Link to={`/books/book/${book.id}`} className="btn btn-Secondary" role="button">상세정보 &raquo;</Link>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
            
            </body>
        </html>        
    )
}

export default Categorybooks;