import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useAuth } from './authcontext';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // 상태 관리를 위한 useState 훅 사용
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 입력 필드 변경 이벤트 핸들러
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();

    const axiosConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const axiosBody = {
      username: username,
      password: password,
    };

    axios.post(`/loginProc`, qs.stringify(axiosBody), axiosConfig)
    .then((response) => {
      if (response.data.includes("main page")) {
        console.log('로그인 성공:', response.data);
        alert('로그인 성공했습니다');
        login();
        navigate("/books");
        // window.location.reload();
      } else {
        console.error('로그인 실패: "main page" 문자열이 포함되어 있지 않습니다');
        alert('로그인 실패했습니다: 사용자 이름 또는 비밀번호가 일치하지 않습니다.');
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error('서버 에러:', error);
      alert('로그인 실패했습니다: 서버 에러가 발생했습니다.');
      window.location.reload();
    });
  };  


  return (
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
                    <input type="text" name="username" className="form-control" placeholder="User Name" required 
                        value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group row">
                    <input type="password" name="password" className="form-control" placeholder="PassWord" required 
                        value={password} onChange={handlePasswordChange} />   
                </div>
                <div className="form-group row">
                    <button className="btn btn-lg btn-success btn-block" type="submit">로그인</button>
                </div>                
            </form>
            
            <div className="form-group row">
                <Link to={'/join'} className="btn btn-lg btn-danger btn-block" role="button">회원가입</Link>
            </div>
        </div>
    </div>        
)
}


export default LoginForm;