import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Adminbooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [bookname, setBookname] = useState('');
    const [statusCode, setStatusCode] = useState(null);
    const url="/api/admin/books";

    useEffect(() => {
        axios.get(`${url}`)
        .then(response => {
            setBooks(response.data);
            setStatusCode(response.status); // 응답에서 상태 코드를 설정
        })
        .catch(error => {
            console.log(error);
            // 에러 응답에서 상태 코드가 존재하는 경우 설정
            if (error.response) {
                setStatusCode(error.response.status);
            }
        })
    }, []);
    
    const booknamechage = (event) => {
        setBookname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(bookname){
            console.log("검색창1:",bookname);
            navigate(`/books/search/${bookname}`);
        }
        else if (bookname == "") {
            alert("검색 결과가 없습니다.");
            console.log("검색창2:",bookname);
        }
    };
    
    if(statusCode === 403) {
        return <h3>권한이 없습니다!</h3>;
    }

    
    return (
        <html>
            <head>
                <title>관리자 도서 목록</title>
            </head>

            <body>

                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">관리자 도서 목록</h1>
                        <h5 className="display-5" align="center">Books List</h5>
                    </div>
                </div> 

            <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
                <div className="col-md-8">
                    <input name="bookname" value={bookname} className="form-control" onChange={booknamechage} placeholder="Search" aria-label="Search" />
                </div>
                    <button className="btn btn-primary" type="submit">검색</button>
            </form>

            <div className="container">
                <div className="row">
                    {books && books.map((book) => (
                        <div className="col-12 d-flex mb-4" key={book.id}>
                            <div>
                                <Link to={`/admin/adminbook/${book.id}`}>
                                    <br />
                                    <img src={book.imageurl} style={{width:'70%'}} alt={book.bookname} />
                                </Link>
                            </div>
                            <div>
                                <br />
                                <Link to={`/admin/adminbook/${book.id}`}>
                                    <h3>{book.bookname}</h3>
                                </Link>
                                <p>{book.author}</p>
                                {book.publisher} | {book.releasedate}
                                <p>₩{book.price}</p>
                                <p>{book.description.length > 100 ? book.description.slice(0, 100) + "..." : book.description}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            
            </body>
        </html>      
    );
}

export default Adminbooks;