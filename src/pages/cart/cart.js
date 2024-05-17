import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.css';

function Cart() {
    const [cart, setCart] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

    useEffect(() => {
        axios.get(`/api/cart`)
        .then(response => setCart(response.data))
        .catch(error => console.log(error))
    }, []);

    const handleSelectBook = (cartId, bookId, quantity, bookname, price, userId) => {
        const found = selectedBooks.find(item => item.cartId === cartId);
        if (found) {
            // 이미 선택된 항목이면 제거
            setSelectedBooks(selectedBooks.filter(item => item.cartId !== cartId));
        } else {
            // 새로 선택된 항목 추가
            setSelectedBooks([...selectedBooks, { cartId, bookId, quantity, bookname, price, userId }]);
        }
    }

    const purchaseSelectedBooks = async (event) => {
        event.preventDefault();

        const isConfirmed = window.confirm("장바구니에서 선택된 상품을 구매 하시겠습니까?");
        
        if(isConfirmed) {
            try {
                    const response = await Promise.all(selectedBooks.map(({ bookname, quantity, price}) =>
                        axios.post(`/payment/ready`, {
                            bookname,
                            quantity,
                            price
                        })
                    ));

                    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    const paymentPageUrl = isMobile ? response[0].data.next_redirect_mobile_url : response[0].data.next_redirect_pc_url;

                    window.location.href = paymentPageUrl;  

                    await Promise.all(selectedBooks.map(({ cartId, bookId, quantity }) => 
                        axios.post(`/api/books/${bookId}/purchase`, {
                            cartId,
                            quantity,
                            bookId
                        }))
                    );

                    // 결제 완료 후 처리를 위해 필요한 정보를 로컬 저장소에 저장
                    localStorage.setItem('purchasedBooks', JSON.stringify(selectedBooks));
                    
                    await Promise.all(selectedBooks.map(({ cartId }) => 
                        axios.delete(`/api/books/${cartId}/cart`,{
                            cartId
                        }))
                    );

                    setSelectedBooks([]);
                    setCart([]);

            } catch (error) {
                alert('책 구매를 실패하였습니다.');
                console.log(error);
            }
        } else {
            window.location.reload();
        }
    }

    // const purchase = async (cartId, bookId, quantity) => {
    //     try {
    //         await axios.post(`/api/books/${bookId}/purchase`, {
    //             cartId,
    //             bookId,
    //             quantity
    //         });
    //         deleteOneCart(cartId);
    //     }
    //     catch (error) {
    //         alert('해당 책 구매를 실패하였습니다.');
    //     }            
    // }    

    const deleteAllCart = async () => {
        const isConfirmed = window.confirm("장바구니의 모든 상품을 삭제 하시겠습니까?");

        if (isConfirmed) {
            try {
                await axios.delete(`/api/books/all/cart`);
                alert('장바구니에 있는 모든 책들이 삭제되었습니다.');
                window.location.reload();
            } catch (error) {
                alert('장바구니에 있는 모든 책들을 삭제하는데 실패했습니다.');
            }  
        }
        else {
            window.location.reload();
        }
    }

    const deleteOneCart = async (cartId) => {
        try {
            const response = await axios.delete(`/api/books/${cartId}/cart`);
            // window.location.reload();
        }
        catch (error) {
            alert('해당 책을 장바구니에서 삭제할 수 없습니다.');
        }            
        
    }
    
    return (
        <html>
            <head>
                <title>Cart</title>
            </head>
            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">장바구니</h1>
                        <h5 className="display-5" align="center">My Cart</h5>
                    </div>
                </div>

                <div className="container">
                    <div>
                        <form>
                            <button className="btn btn-danger pull-left" onClick={() => deleteAllCart()}> 전체 비우기</button>
                            <Link to={`/purchase`} className="btn btn-primary float-right margin-class" role="button">구매목록&raquo;</Link>
                            <button className="btn btn-success float-right margin-class" onClick={purchaseSelectedBooks}>주문하기</button> 
                        </form>                        
                        <br />
                        <br />
                    </div>
                    {cart && cart.map((cart) => (
                    <div key={cart.id} className="table-container">
                        <table className="table table-hover">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th><button className="btn btn-outline-danger" onClick={() => deleteOneCart(cart.id)}>X</button></th>
                                </tr>                                
                            <tr>
                                <td><br/><br/><br/><br/><input type="checkbox" onChange={() => handleSelectBook(cart.id, cart.bookId, cart.quantity,cart.bookname, cart.price, cart.userId)} checked={selectedBooks.some(item => item.cartId === cart.id)} /></td>
                                <td><Link to={`/books/book/${cart.bookId}`}><img src={cart.imageUrl} style={{width:'100px',height:'175px'}} alt="이미지 없음" /></Link><br/><Link to={`/books/book/${cart.bookId}`}><strong>{cart.bookname}</strong></Link><br/><br/> </td>
                                <td>{cart.price}원 <br/><br/>  <hr />{cart.quantity}권<br/><br/>  <hr />₩{cart.price * cart.quantity}</td>
                            </tr>                    
                        </table>
                    </div>                        
                    ))}
                </div>
            </body>
        </html>
    )
}

export default Cart;