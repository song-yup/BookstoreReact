import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useParams,BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Searchbooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const { bookname }= useParams();


    useEffect(() => {
        axios.get(`/api/books/search/${bookname}`)
        .then(response => {
            if(response.data.length ===  0) {
                alert("검색 결과가 없습니다.");
                navigate("/books");
            }
            else {
                console.log("받아오는 값:",response.data,"검색어:", bookname)
                setBooks(response.data)
            }
        })
        .catch(error => console.log(error))
    }, [bookname, navigate]);

    return (
        <html>
            <head>
                <title>도서 목록</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">검색 도서 목록</h1>
                        <h5 className="display-5" align="center">Search Book List</h5>
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

export default Searchbooks;