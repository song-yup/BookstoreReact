import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

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
                        <h5 className="display-5" align="center">Calculate Menu</h5>
                    </div>
                </div>

                <div className="container">
                    {purchases && purchases.map((purchase) => (
                    <div key={purchase.id}>
                        <table className="table table-hover">
                            <tr>
                                <th>고객 ID</th>
                                <th>도서 이름</th>
                                <th>도서 수량</th>
                                <th>도서 가격</th>
                            </tr>
                            <tr>
                                <td>{purchase.username}</td>
                                <td>{purchase.bookname}</td>
                                <td>{purchase.quantity}</td>
                                <td>₩{purchase.price}</td>
                            </tr>
                        </table>
                    </div>                        
                    ))}
                    <div className="container">
                        <tr>
                            <th>총 가격 &nbsp;&nbsp;</th>
                            <td>₩ {totalprice}</td>
                        </tr>    
                    </div>    
                </div>
            </body>
        </html>
    )
}

export default Admincalculate;