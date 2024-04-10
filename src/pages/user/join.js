import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Join() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const url="/api/joinProc";

    const onChange = (event) => {
        const { value, name } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const saveUser = async (e) => {
        e.preventDefault();
        await axios.post(`${url}`, user).then((res) => {
            alert('회원 가입이 완료되었습니다.');
            navigate("/login")
        }).catch((error) => {
            console.error("회원 가입에 실패했습니다:", error);
            alert('회원 가입에 실패했습니다');
        });
    };

    return (
        <html>
            <head>
                <title>도서 웹 쇼핑몰</title>
            </head>
            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">회원 가입</h1>
                        <h5 className="display-5" align="center">Join</h5>
                    </div>
                </div>

                <div className="container col-md-4">
                    <div className="text-center">
                        <h3 className="form-signin-heading">Please Create Your Accout</h3>
                    </div>
                    <form onSubmit={saveUser} className="form-horizontal">
                        <div className="form-group row">
                            UserName <input name="username" value={user.username} className="form-control" onChange={onChange} placeholder="User Nams" required />
                        </div>
                        <div className="form-group row">
                            비밀번호 <input type="password" name="password" value={user.password} className="form-control" onChange={onChange} placeholder="Password" required />
                        </div>
                        <div className="form-group row">
                            이메일 <input name="email" value={user.email} className="form-control" onChange={onChange} placeholder="E-Mail" required />
                        </div>
                        <div className="form-group row">
                            전화번호 <input name="phoneNum" value={user.phoneNum} className="form-control" onChange={onChange} placeholder="Phone Num" required />
                        </div>
                        <div className="form-group row">
                            주소 <input name="address" value={user.address} className="form-control" onChange={onChange} placeholder="Address" required />
                        </div>
                        <div className="form-group row">
                            <button class="btn btn-lg btn-success btn-block" type="submit">회원가입</button>                
                        </div>
                    </form>                    
                </div>


            </body>
        </html>
    )
}

export default Join;