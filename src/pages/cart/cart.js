import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.css';

function Cart() {
    const [cart, setCart] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    
    const carturl = `/api/cart`;

    useEffect(() => {
        axios.get(`${carturl}`)
        .then(response => setCart(response.data))
        .catch(error => console.log(error))
    }, []);

    const handleSelectBook = (cartId, bookId, quantity) => {
        const found = selectedBooks.find(item => item.cartId === cartId);
        if (found) {
            // 이미 선택된 항목이면 제거
            setSelectedBooks(selectedBooks.filter(item => item.cartId !== cartId));
        } else {
            // 새로 선택된 항목 추가
            setSelectedBooks([...selectedBooks, { cartId, bookId, quantity }]);
        }
    }

    const purchaseSelectedBooks = async (event) => {
        event.preventDefault();
        const isConfirmed = window.confirm("장바구니에서 선택된 상품을 구매 하시겠습니까?");
        
        if(isConfirmed) {
            try {
                // 구매 로직은 bookId와 quantity를 기반으로 유지
                await Promise.all(selectedBooks.map(({ bookId, quantity }) => 
                    axios.post(`/api/books/${bookId}/purchase`, {
                        quantity,
                        bookId
                    })
                ));
                
                // 선택된 cartId를 이용하여 장바구니에서 항목 제거
                await Promise.all(selectedBooks.map(({cartId}) => 
                    deleteOneCart(cartId)
                ));

                
                setSelectedBooks([]); // 구매 후 선택 초기화
                window.location.reload();
                alert('선택한 책을 모두 구매했습니다.');                
            } catch (error) {
                alert('책 구매를 실패하였습니다.');
            }
        } else {
            window.location.reload();
        }
    }
    

    const deleteAllCart = async () => {
        const isConfirmed = window.confirm("장바구니의 모든 상품을 삭제 하시겠습니까?");

        if (isConfirmed) {
            try {
                await axios.delete(`/api/books/all/cart`);
                alert('장바구니에 있는 모든 책들이 삭제되었습니다.');
            } catch (error) {
                alert('장바구니에 있는 모든 책들을 삭제하는데 실패했습니다.');
            }  
        }
        else {
            window.location.reload();
        }
    }

    const deleteOneCart = async (id) => {

        try {
            await axios.delete(`/api/books/${id}/cart`);
            setCart(cart.filter(cart => cart.id !== id));
            // window.location.reload();
        }
        catch (error) {
            alert('해당 책을 장바구니에서 삭제할 수 없습니다.');
        }            
        
    }

    const purchase = async (id, quantity) => {
        const isConfirmed = window.confirm("장바구니의 해당 상품을 구매 하시겠습니까?");

        if(isConfirmed) {
            try {
                await axios.post(`/api/books/${id}/purchase`, {
                    "quantity":quantity,
                    "bookId":id
                });
                alert('해당 책을 구매하였습니다.');
                await deleteOneCart(id);
            }
            catch (error) {
                alert('해당 책 구매를 실패하였습니다.');
            }            
        }
        else {
            window.location.reload();
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
                            <button className="btn btn-danger pull-left" onClick={() => deleteAllCart()}>전체삭제하기</button>
                            <Link to={`/purchase`} className="btn btn-primary float-right margin-class" role="button">구매목록&raquo;</Link>
                            <button className="btn btn-success float-right margin-class" onClick={purchaseSelectedBooks}>주문하기</button> 
                            
                        </form>                        
                        <br />
                        <br />
                    </div>
                    {cart && cart.map((cart) => (
                    <div key={cart.id}>
                        <table className="table table-hover">
                            <tr>
                                <th></th>
                                <th>도서이미지</th>
                                <th>도서이름</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>작가</th>
                                <th>출판사</th>
                                <th>총 가격</th>
                                <th>구매</th>
                                <th>삭제</th>
                            </tr>
                            <tr>
                                <td><input type="checkbox" onChange={() => handleSelectBook(cart.id, cart.bookId, cart.quantity)} checked={selectedBooks.some(item => item.cartId === cart.id)} /></td>
                                <td><img src={cart.imageUrl} style={{width:'50%'}} alt="이미지 없음"></img></td>
                                <td>{cart.bookname}</td>
                                <td>{cart.price}</td>
                                <td>{cart.quantity}</td>
                                <td>{cart.author}</td>
                                <td>{cart.publisher}</td>
                                <td>₩{cart.price * cart.quantity}</td>
                                <td><button className="btn btn-success" onClick={() => purchase(cart.bookId, cart.quantity)}>구매</button></td>
                                <td><button className="btn btn-danger" onClick={() => deleteOneCart(cart.id)}>삭제</button></td>
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