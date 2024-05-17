import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import qs from 'qs';
import { useAuth } from "./authcontext";

function Mypage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(); 
    const [comments, setComments] = useState([]);
    const { isLoggedIn, logout } = useAuth();

    const [show, setShow] = useState(null);
    const handleClose = () => setShow(null);
    const handleShow = (modalType) => setShow(modalType);

    const [password, setPassword] = useState('');

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
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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
        return <h2>My Page Loading...</h2>
    }

    const deleteUser = async () => {
        const axiosConfig = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        const axiosBody = {
            username: user.username,
            password: password,
        };

        const url = "/loginProc"
        await axios.post(`${url}`,qs.stringify(axiosBody), axiosConfig)
        .then((response) => {
          if (response.status === 200) {
            axios.delete(`api/mypage`);
            alert('탈퇴가 완료 되었습니다.');
            logout();
            navigate("/login")
          } 
        })
        .catch((error) => {
          console.error('서버 에러:', error );
          alert('비밀번호가 틀렸습니다. 다시 시도해주세요.');
          window.location.reload();
        });
    }
    
    const updateUser =  async () => {
        const axiosConfig = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        const axiosBody = {
            username: user.username,
            password: password,
        };

        const url = "/loginProc"
        await axios.post(`${url}`,qs.stringify(axiosBody), axiosConfig)
        .then((response) => {
          if (response.status === 200) {
            navigate("/mypage/update");
          } 
        })
        .catch((error) => {
          console.error('서버 에러:', error );
          alert('비밀번호가 틀렸습니다. 다시 시도해주세요.');
          window.location.reload();
        });
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

                <div className="container col-md-6">
                    <div className="text-center">
                        <h3 className="form-signin-heading">Check My Account</h3>
                    </div>
                    <div className="text-center mt-4">
                        <p><strong>User ID</strong> : {user.username}</p>
                    </div>

                    <div className="text-center">
                        <p><strong>Phone Num</strong> : {user.phoneNum}</p>
                    </div>

                    <div className="text-center">
                        <p><strong>E-Mail</strong> : {user.email}</p>
                    </div>

                    <div className="text-center mb-4">
                        <p><strong>Address</strong> : {user.address}</p>
                    </div>


                    <div className="container">
                        <div className="text-center">
                            <h5><strong>내가 작성한 댓글</strong></h5>
                        </div>
                        <div className="text-center">
                            {showmycomment && comments && comments.map((comment) => (
                                <li key={comment.id}><Link to={`/books/book/${comment.bookId}`}>{comment.bookname}</Link>: {comment.content}</li>
                            ))}
                        </div>
                    </div>
                
                    <br />

                    <div className="container">
                        <div className="text-center">

                    <Button variant="success" onClick={() => handleShow('update')}>
                        회원 수정
                    </Button>
                    &nbsp;
                    {show === 'update' && (
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>비밀번호 확인</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="비밀번호를 입력하세요."
                                            autoFocus
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={updateUser}>
                                    확인
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    취소
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                        
                    <Button variant="danger" onClick={() => handleShow('delete')}>
                        회원 탈퇴
                    </Button>
                    &nbsp;
                    {show === 'delete' && (
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>비밀번호 확인</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="비밀번호를 입력하세요."
                                            autoFocus
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={deleteUser}>
                                    확인
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    취소
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}

                    <br />
                    <br />
                       
                    <Link to={`/cart`} className="btn btn-outline-primary" role="button">장바구니 &raquo;</Link> 
                    &nbsp;

                    <Link to={`/purchase`} className="btn btn-primary" role="button">구매목록 &raquo;</Link> 
                </div>
                </div>
                </div>
            </body>
        </html>

    );
}

export default Mypage;
