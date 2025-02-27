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
            setStatusCode(response.status);
        })
        .catch(error => {
            console.log(error);
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
            navigate(`/admin/adminsearch/${bookname}`);
        }
        else if (bookname == "") {
            alert("검색 결과가 없습니다.");
            console.log("검색창2:",bookname);
        }
    };
    
    if(statusCode === 403) {
        return <h2>관리자 권한이 없습니다!</h2>;
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
                        <h5 className="display-5" align="center">Admin Books List</h5>
                    </div>
                </div> 

                <form className="d-flex justify-content-center" onSubmit={handleSubmit} style={{borderBottom: '1px solid #dee2e6', paddingBottom: '1rem'}}>
                    <div className="row flex-nowrap">
                        <div className="col">
                            <input name="bookname" value={bookname} className="form-control" onChange={booknamechage} placeholder="Search" aria-label="Search" />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" type="submit">검색</button>
                        </div>
                    </div>
                </form>

                <div className="container">
                    <div className="row">
                        {books && books.map((book, index) => (
                            <div className="col-12 d-flex mb-4" key={book.id}
                                style={{
                                    borderBottom: index !== books.length - 1 ? '1px solid #dee2e6' : '', 
                                    paddingBottom: '1rem' 
                                }}
                            >
                                <div>
                                    <Link to={`/admin/adminbook/${book.id}`}>
                                        <br />
                                        <img src={book.imageurl} style={{width:'100%', padding: '0 15px 15px 0'}} alt={book.bookname} />
                                    </Link>
                                </div>
                                <div>
                                    <br />
                                    <Link to={`/admin/adminbook/${book.id}`}>
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
    );
}

export default Adminbooks;