import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './books.css';

function EBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [bookname, setBookname] = useState('');
    const url="/api/books/ebook";

    useEffect(() => {
        axios.get(`${url}`)
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
            navigate(`/books/search/${bookname}`);
        }
        else if (bookname == "") {
            alert("검색 결과가 없습니다.");
            console.log("검색창2:",bookname);
        }
    };

    const cart = async (book) => {
        const isConfirmed = window.confirm("장바구니에 1권을 추가하시겠습니까?");

        if (isConfirmed) {
            try {
                await axios.post(`/api/books/${book.id}/cart`, {
                    "quantity": 1,
                    "bookId": book.id
                });

                const isConfirmed2 = window.confirm("장바구니에 1권을 추가하였습니다. 장바구니로 이동하시겠습니까?");
                if (isConfirmed2) {
                    navigate("/cart");
                } else {
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
                alert('장바구니 추가에 실패했습니다. 로그인이 필요한 서비스 입니다.');
                navigate('/login');
            }
        } else {
            window.location.reload();
        }
    }

    const purchase = async (book) => {
        const isConfirmed = window.confirm("1권을 바로 구매하시겠습니까?");

        if (isConfirmed) {
            try {
                const response = await axios.post(`/payment/ready`, [{
                    "bookname": book.bookname,
                    "quantity": 1,
                    "price": book.price
                }]);

                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const paymentPageUrl = isMobile ? response.data.next_redirect_mobile_url : response.data.next_redirect_pc_url;

                window.location.href = paymentPageUrl;

                localStorage.setItem('purchasedBooks', JSON.stringify([{
                    "bookId": book.id,
                    "quantity": 1,
                    "bookname": book.bookname,
                    "price": book.price
                }]));

            } catch (error) {
                console.error(error);
                alert('구매목록 추가에 실패했습니다. 로그인이 필요한 서비스 입니다.');
                navigate('/login');
            }
        } else {
            window.location.reload();
        }
    };
    
    return (
        <html>
            <head>
                <title>도서 목록</title>
            </head>

            <body>
                <div className="jumbotron" style={{ 
                    backgroundImage: 'url(https://contents.kyobobook.co.kr/display/i_1624_450_ed5262a303f34baab514a37267ed18e1.png)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat' 
                }}> 
                    <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '20px', borderRadius: '10px' }}>
                        <h1 className="display-3" align="right" style={{fontWeight: 'bold'}}>EBooks</h1>
                        <h5 className="display-5" align="right" style={{fontWeight: 'bold'}}>EBooks List</h5>
                    </div>
                </div>

                <div className="container">
                        <div className="row">
                            {books && books.map((book) => (
                                <div className="col-12 d-flex mb-4" key={book.id}>
                                    <div className="card">
                                        <div className="row no-gutters">
                                            <div className="col-md-2">
                                                <Link to={`/books/book/${book.id}`}>
                                                    <img src={book.imageurl} className="card-img" alt={book.bookname} />
                                                </Link>
                                            </div>
                                            <div className="col-md-8">
                                                <Link to={`/books/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <div className="card-body">
                                                        <h3 className="card-title">{book.bookname}</h3>
                                                        <p className="card-text">{book.author}</p>
                                                        <p className="card-text">{book.publisher} | {book.releasedate}</p>
                                                        <h5 className="card-text">₩{book.price}</h5>
                                                        <p className="card-text" style={{ fontFamily: 'Cafe24Meongi-B-v1.0' }}>
                                                            {book.description.length > 100 ? book.description.slice(0, 100) + "..." : book.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <button className="btn btn-secondary card-button" onClick={() => cart(book)}>장바구니</button>
                                        <button className="btn btn-primary card-button" onClick={() => purchase(book)}>바로구매</button>
                                        {book.isNew && (
                                            <span className="badge badge-new">NEW</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
 
            </body>
        </html>    
    );
}

export default EBooks;