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
                <div className="jumbotron" style={{ 
                    backgroundImage: 'url(https://contents.kyobobook.co.kr/display/[%EA%B5%90%EB%B3%B4%EB%AC%B8%EA%B3%A0eBook]%EB%B0%B0%EB%84%88%ED%82%A4%EB%93%9C_%EC%9D%B4%EB%B2%A4%ED%8A%B8_v4_03_8ccf3218f6cd44ddbda2f683900ed7b2.jpg)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat' 
                }}> 
                    <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '20px', borderRadius: '10px' }}>
                        <h1 className="display-3" align="right" style={{fontWeight: 'bold'}}>구매 목록</h1>
                        <h5 className="display-5" align="right" style={{fontWeight: 'bold'}}>Purchase List</h5>
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

                    {purchase && purchase.map((purchase) => (
                    <div key={purchase.id} className="table-container">
                        <table className="table table-hover">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                                <tr>
                                    <td><img src={purchase.imageUrl} style={{width:'100px',height:'175px'}} alt="이미지 없음" /><br/><strong>{purchase.bookname}</strong></td>
                                    <td>{purchase.price}원<br/><br/><hr />{purchase.quantity}권 <br/><br/> <hr /> ₩{purchase.price * purchase.quantity}</td>
                                    <td><br/><br/><br/><button className="btn btn-danger" onClick={() => refundbook(purchase.id)}>환불&raquo;</button></td>
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