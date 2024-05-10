import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import DaumPostcode from "react-daum-postcode"; // Daum 주소 검색 컴포넌트를 import
import './post.css';

function UpdateUser() {
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

    const [showPost, setShowPost] = useState(false);

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
                    const addressParts = data.address.split(', '); // 콤마와 공백으로 주소를 나눕니다.
                    if(addressParts.length > 1) {
                        setDetailAddress(addressParts[1]); // 상세 주소 설정
                        data.address = addressParts[0]; // 주소 설정
                    }
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

        setShowPost(false); // 주소를 선택한 후에는 모달을 숨김
    };



    const editUser = async (e) => {
        e.preventDefault();
        const finalUser = {
            ...user,
            address: `${user.address}, ${detailAddress}`.trim(),
        };
        await axios.patch(`${url}`, finalUser).then((res) => {
            alert('수정되었습니다');
            navigate("/mypage")
        }).catch((error) => {
            console.error("수정에 실패했습니다:", error);
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
                                <label className="col-sm-6 control-label">
                                    <h3> <span className="badge badge-info">{user.username}</span> </h3>
                                </label>
                            </div>
                        </div>

                        <div className="form-group row">
                            전화번호
                                <input name="phoneNum" value={user.phoneNum} onChange={onChange} className="form-control" />
                            {errors.phoneNum && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.phoneNum}
                                </div>
                            )}                        
                        </div>

                        <div className="form-group row">
                            e-mail
                                <input name="email" value={user.email} onChange={onChange} className="form-control" />
                            {errors.email && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.email}
                                </div>
                            )}                                 
                        </div>

                        <div className="form-group row">
                            주소
                                <input name="address" value={user.address} readOnly onClick={() => setShowPost(true)} className="form-control" />
                                {showPost && <div className="form-group row"><DaumPostcode onComplete={completeAddress} className="post-modal" /></div>}
                            {errors.address && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.address}
                                </div>
                            )}                          
                        </div>

                        <div className="form-group row">
                            상세 주소
                                <input name="address" value={detailAddress} onChange={onChange} className="form-control" />
                            {errors.address && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.address}
                                </div>
                            )}                          
                        </div>  

                        <div className="form-group row">
                            새 비밀번호
                                <input type="password" name="password" onChange={onChange} className="form-control" placeholder="New Password" />
                            {errors.password && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.password}
                                </div>
                            )}                           
                        </div>  

                        <div className="form-group row">
                                <button type="submit" className="btn btn-lg btn-success btn-block">수정</button>
                        </div>
                    </form>
                    <div className="form-group row">
                            <button className="btn btn-lg btn-secondary btn-block" onClick={() => canceledit()}>취소</button>
                    </div>

                </div>          
            </body>
        </html>

      );
    }
    export default UpdateUser;