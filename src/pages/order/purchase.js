import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import style from '../cart/style.css';

function Purchase() {
    const [purchase, setPurchase] = useState([]);
    const carturl = `/api/purchase`;

    useEffect(() => {
        axios.get(`${carturl}`)
        .then(response => setPurchase(response.data))
        .catch(error => console.log(error))
    }, []);

    const refundbook = async (id) => {
        const isConfirmed = window.confirm("해당 책을 환불하시겠습니까?");

        if(isConfirmed) {
            try {
                await axios.delete(`/api/books/${id}/purchase`);
                alert('해당 책을 환불하였습니다.');
                window.location.reload();
            }
            catch (error) {
                alert('해당 책을 구매목록에서 삭제(환불)할 수 없습니다.');
            }            
        }
        
        else {
            window.location.reload();
        }
    }

    return (
        <html>
            <head>
                <title>Purchase</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">구매 목록</h1>
                        <h5 className="display-5" align="center">Purchase List</h5>
                    </div>
                </div>

                <div className="container">
                    <div>
                        <form>
                            <Link to={`/cart`} className="btn btn-primary float-right" role="button">장바구니 &raquo;</Link> 
                        </form>
                        <br />
                        <br />
                    </div>

                    <div className="container">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>도서이미지</th>
                                    <th>도서이름</th>
                                    <th>가격</th>
                                    <th>수량</th>
                                    <th>작가</th>
                                    <th>출판사</th>
                                    <th>총 가격</th>
                                    <th>환불</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchase && purchase.map((purchase) => (
                                <tr key={purchase.id}>
                                    <td><img src={purchase.imageUrl} style={{width:'50%'}} alt="이미지 없음"></img></td>
                                    <td>{purchase.bookname}</td>
                                    <td>₩{purchase.price}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.author}</td>
                                    <td>{purchase.publisher}</td>
                                    <td>₩{purchase.price * purchase.quantity}</td>
                                    <td><button className="btn btn-danger" onClick={() => refundbook(purchase.id)}>환불&raquo;</button></td>
                                </tr>
                                ))}   
                            </tbody>
                        </table>
                    </div>

                </div>
            </body>
        </html>
    )
}

export default Purchase;