import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Purchase() {
    const [purchase, setPurchase] = useState([]);
    const carturl = `/api/purchase`;
    // const alldeletecarturl = `/api/books/all/cart`;
    
    useEffect(() => {
        axios.get(`${carturl}`)
        .then(response => setPurchase(response.data))
        .catch(error => console.log(error))
    }, []);

    // const deleteAllCart = async () => {
    //     try {
    //         await axios.delete(`${alldeletecarturl}`, {
    //             "userId":1,
    //         })
    //         alert('장바구니에 있는 모든 책들이 삭제되었습니다.');
    //     } catch (error) {
    //         console.error(error)
    //         alert('장바구니에 있는 모든 책들을 삭제하는데 실패했습니다.');
    //     }
    // }

    const refundbook = async (id) => {
        try {
            await axios.delete(`/api/books/${id}/purchase`);
            alert('해당 책을 구매목록에서 삭제(환불)하였습니다.');
            window.location.reload();
        }
        catch (error) {
            alert('해당 책을 구매목록에서 삭제(환불)할 수 없습니다.');
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
                    {purchase && purchase.map((purchase) => (
                    <div key={purchase.id}>
                        <table className="table table-hover">
                            <tr>
                                <th>도서ID</th>
                                <th>도서이름</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>작가</th>
                                <th>출판사</th>
                                <th>도서이미지</th>
                            </tr>
                            <tr>
                                <th>{purchase.bookId}</th>
                                <th>{purchase.bookname}</th>
                                <th>{purchase.price}</th>
                                <th>{purchase.quantity}</th>
                                <th>{purchase.author}</th>
                                <th>{purchase.publisher}</th>
                                <th><img src={purchase.imageUrl} style={{width:'25%'}}></img></th>
                                <th><button className="btn btn-danger" onClick={() => refundbook(purchase.id)}>삭제</button></th>
                            </tr>
                        </table>
                    </div>                        
                    ))}
                </div>
            
            </body>
        </html>
    )
}

export default Purchase;