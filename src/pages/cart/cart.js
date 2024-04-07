import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Cart() {
    const [cart, setCart] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const carturl = `/api/cart`;
    const alldeletecarturl = `/api/books/all/cart`;
    
    useEffect(() => {
        axios.get(`${carturl}`)
        .then(response => setCart(response.data))
        .catch(error => console.log(error))
    }, []);

    const deleteAllCart = async () => {
        try {
            await axios.delete(`${alldeletecarturl}`);
            alert('장바구니에 있는 모든 책들이 삭제되었습니다.');
        } catch (error) {
            alert('장바구니에 있는 모든 책들을 삭제하는데 실패했습니다.');
        }
    }

    const deleteOneCart = async (id) => {
        try {
            await axios.delete(`/api/books/${id}/cart`);
            setCart(cart.filter(cart => cart.bookId !== id));
            // alert('해당 책을 장바구니에 삭제하였습니다.');
            window.location.reload();
        }
        catch (error) {
            alert('해당 책을 장바구니에서 삭제할 수 없습니다.');
            window.location.reload();
        }
    }

    const purchase = async (id) => {
        try {
            await axios.post(`/api/books/${id}/purchase`, {
                "quantity":1,
                "bookId":id
            });
            alert('해당 책을 구매하였습니다.');
            await deleteOneCart(id);
            window.location.reload();
        }
        catch (error) {
            alert('해당 책 구매를 실패하였습니다.');
        }
    }

    const handleSelectBook = (bookId) => {
        if (selectedBooks.includes(bookId)) {
            setSelectedBooks(selectedBooks.filter(id => id !== bookId));
        } else {
            setSelectedBooks([...selectedBooks, bookId]);
        }
    }

    const purchaseSelectedBooks = async (event) => {
        event.preventDefault();
        try {
            await Promise.all(selectedBooks.map(bookId => 
                axios.post(`/api/books/${bookId}/purchase`, {
                    "quantity":1,
                    "bookId":bookId
                })
            ));

            selectedBooks.forEach(bookId => {
                deleteOneCart(bookId);
            })

            setSelectedBooks([]); // 구매 후 선택 초기화
            alert('선택한 책을 모두 구매했습니다.');
        } catch (error) {
            alert('책 구매를 실패하였습니다.');
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
                            <button className="btn btn-success float-right" onClick={purchaseSelectedBooks}>주문하기</button>
                        </form>                        
                    </div>
                    {cart && cart.map((cart) => (
                    <div key={cart.id}>
                        <table className="table table-hover">
                            <tr>
                                <th>도서ID</th>
                                <th>도서이름</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>작가</th>
                                <th>출판사</th>
                                <th>도서이미지</th>
                            </tr>
                            <tr>
                                <td><input type="checkbox" onChange={() => handleSelectBook(cart.bookId)} checked={selectedBooks.includes(cart.bookId)} /></td>
                                <th>{cart.bookId}</th>
                                <th>{cart.bookname}</th>
                                <th>{cart.price}</th>
                                <th>{cart.quantity}</th>
                                <th>{cart.author}</th>
                                <th>{cart.publisher}</th>
                                <th><img src={cart.imageUrl} style={{width:'25%'}}></img></th>
                                <th><button className="btn btn-danger" onClick={() => deleteOneCart(cart.bookId)}>삭제</button></th>
                                <th><button className="btn btn-success" onClick={() => purchase(cart.bookId)}>구매</button></th>
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