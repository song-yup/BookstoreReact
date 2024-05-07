import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import style from '../cart/style.css';

function Admincalculate() {
    const [purchases, setPurchases] =useState([]);
    const [totalprice, setTotalprice] = useState([]);
    const calculateurl = `/api/admin/calculate`;
    const totalcalculateurl = `/api/admin/total`;
    
    useEffect(() => {
        axios.get(`${calculateurl}`)
        .then(response => setPurchases(response.data))
        .catch(error => console.log(error))

        axios.get(`${totalcalculateurl}`)
        .then(response => setTotalprice(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <html>
            <head>
                <title>Admin Calculate</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">정산 메뉴</h1>
                        <h5 className="display-5" align="center">Admin Calculate Menu</h5>
                    </div>
                </div>

                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>고객 ID</th>
                                <th>도서 이름</th>
                                <th>도서 수량</th>
                                <th>도서 가격</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {purchases && purchases.map((purchase) => (
                            <tr key={purchase.id}>
                                <td>{purchase.username}</td>
                                <td>{purchase.bookname}</td>
                                <td>{purchase.quantity}</td>
                                <td>₩{purchase.price}</td>
                            </tr> 
                            ))}                           
                        </tbody>
                    </table>    
                </div>
                <hr />
                    <div className="container" align="center">
                        <div className="text-center">
                                <strong>총 가격 &nbsp;&nbsp;</strong>
                                ₩{totalprice}                           
                        </div>
                    </div>    
            </body>
        </html>
    )
}

export default Admincalculate;