import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import DaumPostcode from "react-daum-postcode"; // Daum 주소 검색 컴포넌트를 import
import style from'./post.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Join() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        phoneNum: "",
        address: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: "",
        phoneNum: "",
        address: ""
    });

    const [detailAddress, setDetailAddress] = useState("");
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
    
    const url="/api/joinProc";

    const onChange = (event) => {
        const { value, name } = event.target;
        if (name === "detailAddress") { // 상세 주소 처리
            setDetailAddress(value);
        } else {
            setUser({
                ...user,
                [name]: value,
            });
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const completeAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setUser({
            ...user,
            address: fullAddress,
        });
        setShowModal(false);
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const saveUser = async (e) => {
        e.preventDefault();
        const finalUser = {
            ...user,
            address: `${user.address}, ${detailAddress}`.trim(),
        };
        await axios.post(`${url}`, finalUser).then((res) => {
            alert('회원 가입이 완료되었습니다.');
            navigate("/login")
        }).catch((error) => {
            console.error("회원 가입에 실패했습니다:", error);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                // 서버로부터 받은 오류 메시지를 해당 필드에 맞게 설정
                setErrors({
                    username: errorData.username || "",
                    password: errorData.password || "",
                    email: errorData.email || "",
                    phoneNum: errorData.phoneNum || "",
                    address: errorData.address || ""
                });
            } else {
                setErrors({
                    username: "아이디가 이미 존재합니다.",
                    password: "",
                    email: "",
                    phoneNum: "",
                    address: ""
                });
            }
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
                        <h2 className="form-signin-heading">Please Create Your Accout</h2>
                    </div>
                    <hr />
                    
                    <form onSubmit={saveUser} className="form-horizontal">
                        <div className="form-group row">
                            UserName <input name="username" value={user.username} className="form-control" onChange={onChange} placeholder="User Name" />
                        </div>
                        {errors.username && (
                        <div className="alert alert-danger" role="alert">
                            {errors.username}
                        </div>
                        )}
                        
                        <div className="form-group row">
                            비밀번호 <input type="password" name="password" value={user.password} className="form-control" onChange={onChange} placeholder="Password" />
                        </div>
                        {errors.password && (
                        <div className="alert alert-danger" role="alert">
                            {errors.password}
                        </div>
                        )}
                        
                        <div className="form-group row">
                            이메일 <input name="email" value={user.email} className="form-control" onChange={onChange} placeholder="E-Mail" />
                        </div>
                        {errors.email && (
                        <div className="alert alert-danger" role="alert">
                            {errors.email}
                        </div>
                        )}
                        
                        <div className="form-group row">
                            전화번호 <input name="phoneNum" value={user.phoneNum} className="form-control" onChange={onChange} placeholder="Phone Num" />
                        </div>
                        {errors.phoneNum && (
                        <div className="alert alert-danger" role="alert">
                            {errors.phoneNum}
                        </div>
                        )}
                        
                        {/* <div className="form-group row">
                            주소 <input name="address" value={user.address} className="form-control" readOnly onClick={() => setShowPost(true)} placeholder="Address" />
                            {showPost && <div className="form-group row"><DaumPostcode className="modal_body" onComplete={completeAddress} /></div>}
                        </div>
                        {errors.address && (
                        <div className="alert alert-danger" role="alert">
                            {errors.address}
                        </div>
                        )} */}

                        <div className="form-group row">
                            주소
                            <input name="address" value={user.address} className="form-control" readOnly placeholder="Address" />
                            <div className="col-md-12" align="center"> <br />
                                <Button variant="primary" onClick={handleShow}>
                                    주소검색
                                </Button>                                
                            </div>
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>주소 검색</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <DaumPostcode onComplete={completeAddress} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        취소
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        <div className="form-group row">
                            상세 주소 <input name="detailAddress" value={detailAddress} className="form-control" onChange={onChange} placeholder="Detail Address" />
                        </div>
                        {errors.address && (
                        <div className="alert alert-danger" role="alert">
                            {errors.address}
                        </div>
                        )}

                        <div className="form-group row">
                            <button className="btn btn-lg btn-success btn-block" type="submit">회원가입</button>                
                        </div>
                        
                    </form>                    
                </div>
            </body>
        </html>
    )
}

export default Join;