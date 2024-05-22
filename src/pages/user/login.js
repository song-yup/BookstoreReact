import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useAuth } from './authcontext';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const axiosConfig = axios.create ({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      withCredentials: true,
    });

    const axiosBody = {
      username: username,
      password: password,
    };

    const url = "/loginProc"

    await axios.post(`${url}`,qs.stringify(axiosBody), axiosConfig)
    .then((response) => {
      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        alert('로그인 성공했습니다');
        login();
        navigate("/books");

      } 
    })
    .catch((error) => {
      console.error('서버 에러:', error );
      alert('로그인 실패했습니다: 사용자 이름 또는 비밀번호가 일치하지 않습니다.');
      window.location.reload();
    });
  };

  return (
    <html>
      <head>
          <title>로그인</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body>
        <div>
          <div className="jumbotron"> 
            <div className="container">
              <h1 className="display-3" align="center">로그인</h1>
              <h5 className="display-5" align="center">Log In</h5>
            </div>
        </div>

        <div className="container col-md-4">
            <div className="text-center">
                <h3 className="form-signin-heading">Please Sign In</h3>
            </div>
            
            <form className="form-signin" onSubmit={handleSubmit}>
                <div className="form-group row">
                      <input type="text" name="username" className="form-control" placeholder="User Name" 
                      value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group row">
                    <input type="password" name="password" className="form-control" placeholder="PassWord"  
                    value={password} onChange={handlePasswordChange} />   
                </div>
                <div className="form-group row">
                    <button className="btn btn-lg btn-success btn-block" type="submit">로그인</button>
                </div>                
            </form>
        </div>
    </div>
    </body>        
  </html>
  )
}


export default LoginForm;