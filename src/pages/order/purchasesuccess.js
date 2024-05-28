import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../cart/style.css';
import axios from 'axios';

function Purchasesuccess () {
    const [user, setUser] = useState(null);
    const [purchasedBooks, setPurchasedBooks] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/mypage`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if(response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('서버로부터 사용자 정보를 가져오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('사용자 정보 요청 중 에러 발생:', error);
            }
        };

        const sendPurchaseData = async (book) => {
            try {
                const url = book.cartId 
                    ? `/api/books/${book.bookId}/${book.cartId}/purchase`
                    : `/api/books/${book.bookId}/purchase`;
                    
                const payload = {
                    bookId: book.bookId,
                    quantity: book.quantity,
                };

                if (book.cartId) {
                    payload.cartId = book.cartId;
                }

                const response = await axios.post(url, payload);

                if (!response.status === 200) {
                    console.error('구매 정보를 서버에 전송하는데 실패했습니다.');
                }
            } catch (error) {
                console.error('구매 정보 전송 중 에러 발생:', error);
            }
        };

        fetchUser();

        const storedPurchasedBooks = localStorage.getItem('purchasedBooks');
        
        if (storedPurchasedBooks) {
            const parsedPurchasedBooks = JSON.parse(storedPurchasedBooks);
            setPurchasedBooks(parsedPurchasedBooks);

            parsedPurchasedBooks.forEach(book => {
                sendPurchaseData(book);
            });
        }

        console.log(storedPurchasedBooks);

        return () => {
            localStorage.removeItem('purchasedBooks');
        };
    }, []);

    if (!user) {
        return <h2>No User Information...</h2>;
    }

    return (
        <div>
            <head>
                <title>Purchase Success</title>
            </head>

            <body>
                <div className="jumbotron" style={{ 
                    backgroundImage: 'url(https://contents.kyobobook.co.kr/display/i_1624_450_2_a540b652c3f241ef8a7d45740ac7696c.jpg)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat' 
                }}> 
                    <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '20px', borderRadius: '10px' }}>
                        <h1 className="display-3" align="right" style={{fontWeight: 'bold'}}>구매 완료</h1>
                        <h5 className="display-5" align="right" style={{fontWeight: 'bold'}}>Purchase Success</h5>
                    </div>
                </div>                

                <div className="container">
                    <div className="text-center">
                        <h3>구매가 완료되었습니다. 감사합니다.</h3>
                    </div>
                    
                    <div className="table-container">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>구매자</th>
                                    <th>배송지</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{user.username}</td>
                                    <td>{user.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {purchasedBooks.length > 0 && (
                        <div className="table-container">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>도서명</th>
                                        <th>수량</th>
                                        <th>가격</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasedBooks.map((book, index) => (
                                        <tr key={index}>
                                            <td>{book.bookname}</td>
                                            <td>{book.quantity} 권</td>
                                            <td>{book.price} 원</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </body>
        </div>
    );
}

export default Purchasesuccess;
