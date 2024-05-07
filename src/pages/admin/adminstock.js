import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import style from '../cart/style.css';

function Adminstock() {
    const [books, setBooks] =useState([]);
    const stockurl = `/api/admin/stock`;
    
    useEffect(() => {
        axios.get(`${stockurl}`)
        .then(response => setBooks(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <html>
            <head>
                <title>Cart</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">재고 현황</h1>
                        <h5 className="display-5" align="center">Admin Stock Information</h5>
                    </div>
                </div>

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