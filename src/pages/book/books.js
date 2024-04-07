import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Books() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [bookname, setBookname] = useState('');
    const url="http://localhost:8080/api/books";

    useEffect(() => {
        axios.get(`${url}`)
        .then(response => setBooks(response.data))
        .catch(error => console.log(error))
    }, []);

    const booknamechage = (event) => {
        setBookname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        if(bookname){
            console.log("검색창1:",bookname);
            navigate(`/books/search/${bookname}`); // useNavigate를 사용하여 프로그래매틱 네비게이션
        }
        else if (bookname == "") {
            alert("검색 결과가 없습니다.");
            console.log("검색창2:",bookname);
            window.location.reload();
        }
    };
    
    return (
        <html>
            <head>
                <title>도서 목록</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">도서 목록</h1>
                        <h5 className="display-5" align="center">Books List</h5>
                    </div>
                </div> 

            <form className="d-flex" onSubmit={handleSubmit}>
                <input name="bookname" value={bookname} className="form-control me-2" onChange={booknamechage}  placeholder="Search" aria-label="Search" />
                <button className="btn btn-Secondary" type="submit">검색</button>
            </form>

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

export default Books;