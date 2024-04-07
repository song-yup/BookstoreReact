import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


function Mypage() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [user, setUser] = useState(); // 초기값을 빈 배열 대신 null로 설정
    const [comments, setComments] = useState([]);

    const showmycomment = async () => {
        try {
            const response = await axios.get(`/api/mypage/comments`);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/mypage`, {
                    method: 'GET', // 메소드 명시
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
        showmycomment();
    }, []);
  
    if(!user) {
        return <div>User Not Found!</div>;
    }

    const logout = async () => {
        try {
            await axios.post(`/logout`);
            alert('로그아웃 되었습니다.');
            navigate("/login"); 
        } catch (error) {
            console.error("로그아웃에 실패했습니다:", error);
            alert('로그아웃에 실패했습니다.');
        }
    }

    const deleteUser = async () => {
        // confirm 함수를 사용하여 사용자에게 확인을 요청합니다.
        const isConfirmed = window.confirm("회원 탈퇴를 하시겠습니까?");
    
        // 사용자가 확인을 누른 경우에만 삭제 요청을 진행합니다.
        if (isConfirmed) {
            try {
                await axios.delete(`api/mypage`);
                alert('삭제되었습니다.');
                navigate("/books")
            } catch (error) {
                console.error("삭제에 실패했습니다:", error);
                navigate("/mypage");
                alert('삭제에 실패했습니다.');
            }
        }
        else {
            window.location.reload();
        }
        // 사용자가 취소를 누른 경우, 삭제 요청을 진행하지 않습니다.
    }
    
    const updateUser =  async () => {
        const isConfirmed = window.confirm("회원 수정를 하시겠습니까?");
        if(isConfirmed) {

        }   else {
            window.location.reload();
        }

    }

    // const showmycomment = async () => {
    //     try {
    //         const response = await axios.get(`/api/mypage/comments`);
    //         setComments(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


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
                    <div className="text-center">
                        <h3 className="form-signin-heading">Check My Account</h3>
                    </div>

                    <form>
                        <button type="button" className="btn btn-danger" onClick={logout}>로그아웃</button>
                    </form>
        
                    <div className="form-group row">
                        고객 ID : {user.username}
                    </div>

                    <div className="form-group row">
                        전화 번호 : {user.phoneNum}
                    </div>

                    <div className="form-group row">
                        e-mail : {user.email}
                    </div>

                    <div className="form-group row">
                        주소 : {user.address}
                    </div>

                    <div>
                        <h2>내가 작성한 댓글</h2>
                        <ul>
                            {showmycomment && comments && comments.map((comment) => (
                                <li key={comment.id}>{comment.bookname}: {comment.content}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <Link to={`/mypage/update`} className="btn btn-success" onClick={() => updateUser()} role="button">회원수정 &raquo;</Link>
                    <Link to={`/mypage/delete`} className="btn btn-danger"  onClick={() => deleteUser()} role="button">회원탈되 &raquo;</Link>
                    <Link to={`/cart`} className="btn btn-secondary" role="button">장바구니 &raquo;</Link> 
                    <Link to={`/purchase`} className="btn btn-secondary" role="button">구매목록 &raquo;</Link> 
                </div>

            </body>
        </html>

    );
}

export default Mypage;
