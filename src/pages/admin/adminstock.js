import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import style from '../cart/style.css';

function Adminstock() {
    const navigate = useNavigate();
    const [bookname, setBookname] = useState('');
    const [books, setBooks] =useState([]);
    const stockurl = `/api/admin/stock`;
    
    useEffect(() => {
        axios.get(`${stockurl}`)
        .then(response => setBooks(response.data))
        .catch(error => console.log(error))
    }, []);

    const booknamechage = (event) => {
        setBookname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(bookname){
            console.log("검색창1:",bookname);
            navigate(`/admin/adminsearchstock/${bookname}`);
        }
        else if (bookname == "") {
            alert("검색 결과가 없습니다.");
            console.log("검색창2:",bookname);
        }
    };

    return (
        <html>
            <head>
                <title>Cart</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">관리자 재고 현황</h1>
                        <h5 className="display-5" align="center">Admin Stock Information</h5>
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>도서이미지</th>
                                <th>도서이름</th>
                                <th>재고수</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {books && books.map((book) => (
                            <tr key={book.id}>
                                <td><img src={book.imageurl} style={{width:'35%'}}></img></td>
                                <td>{book.bookname}</td>
                                <td>{book.unitsinstock}</td>
                            </tr>
                            ))}                            
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    )
}

export default Adminstock;