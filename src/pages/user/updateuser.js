import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/mypage`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // 요청 헤더에 Content-Type 명시
                        // 필요하다면 인증 토큰 등을 여기에 추가
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
        fetchUser();
    }, []);

    if(!user) {
        return <div>User Not Found!</div>;
    }
    
    const url = `/api/mypage`;

    const onChange = (event) => {
        const { value, name } = event.target;
        setUser({
          ...user,
          [name]: value,
        });
      };

      const editUser = async (e) => {
        e.preventDefault();
        await axios.patch(`${url}`, user).then((res) => {
            alert('수정되었습니다');
            navigate("/mypage")
        }).catch((error) => {
            console.error("수정에 실패했습니다:", error);
            alert('수정에 실패했습니다');
        });
      };

      const canceledit = () => {
        navigate("/mypage");
    }

      return (
        <html>
            <head>
                <title>회원 정보</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">마이 메뉴</h1>
                        <h5 className="display-5" align="center">My Menu</h5>
                    </div>
                </div>

                <div className="container col-md-4">
                    <form onSubmit={editUser} className="form-horizontal">
                        <div className="text-center">
                            <h2 className="form-signin-heading">Update My Account</h2>
                        </div>
                        <hr />

                        <div className="container col-md-8">
                            <div className="text-center">
                                <h3>
                                    <label className="col-sm-6 control-label">
                                        User ID
                                    </label>   
                                </h3>
                                <label className="col-sm-6 control-label">
                                    <h4> <span className="badge badge-info">{user.username}</span> </h4>
                                </label>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                전화번호
                            </label>
                            <div className="col-sm-6">
                                <input name="phoneNum" value={user.phoneNum} onChange={onChange} className="form-control" />
                            </div>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                e-mail
                            </label>
                            <div className="col-sm-6">
                                <input name="email" value={user.email} onChange={onChange} className="form-control" />
                            </div>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                주소
                            </label>
                            <div className="col-sm-6">
                                <input name="address" value={user.address} onChange={onChange} className="form-control" />
                            </div>                            
                        </div>  

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                비밀번호
                            </label>
                            <div className="col-sm-6">
                                <input type="password" name="password" onChange={onChange} className="form-control" />
                            </div>                            
                        </div>  

                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-lg btn-success btn-block">수정</button>
                            </div>
                        </div>
                    </form>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button className="btn btn-lg btn-secondary btn-block" onClick={() => canceledit()}>취소</button>
                        </div>                        
                    </div>

                </div>          
            </body>
        </html>

      );
    }
    export default UpdateUser;