import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Book() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [book, setBook] = useState();
    const [comment, setComment] = useState([]);
    const [newcomment, setNewcomment] = useState('')
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [bookid, setBookid] = useState(1);

    useEffect(() => {
        if(id) {
            const url = `http://localhost:8080/api/books/${id}`;
            const commenturl = `/api/books/${id}/comments`;

            axios.get(`${url}`)
            .then(response => setBook(response.data))
            .catch(error => console.log(error));

            
            axios.get(`${commenturl}`)
            .then(response => setComment(response.data))
            .catch(error => console.log(error));
        }
    }, [id]);

    if(!book) {
        return <div>Book Not Found!</div>;
    }

    const deleteBook = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/api/books/${id}`);
          alert('삭제되었습니다.');
          navigate("/books")
        } catch (error) {
          console.error("삭제에 실패했습니다:", error);
          alert('삭제에 실패했습니다.');
        }
    }

    const addCart = async (id) => {
        try {
            await axios.post(`/api/books/${id}/cart`, {
                // "userId":1,
                "quantity":1,
                "bookId":id
            })
            alert('장바구니에 추가되었습니다.');
        } catch (error) {
            console.error(error)
            alert('장바구니 추가에 실패했습니다.');
        }
    }

    const purchase = async () => { // id 파라미터 제거
        try {
            await axios.post(`/api/books/${id}/purchase`, {
                "quantity": purchaseQuantity, // 상태를 사용하여 quantity 설정
                "bookId": id
            });
            alert('구매목록에 추가되었습니다.');
        } catch (error) {
            console.error(error);
            alert('구매목록 추가에 실패했습니다.');
        }
    };

    const createcomment = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/books/${id}/comments`, {
                "bookId": id,
                "content": newcomment
            })
            alert('댓글이 추가되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error(error)
            alert('댓글 추가에 실패했습니다.');
        }
    }

    const deletecomment = async (id) => {
        try {
            await axios.delete(`/api/comments/${id}`);
            alert('댓글이 삭제되었습니다.');
            window.location.reload();
          } catch (error) {
            console.error("삭제에 실패했습니다:", error);
            alert('댓글 삭제에 실패했습니다.');
          }
    }

    const startEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    };

    const saveComment = async (id) => {
        try {
            await axios.patch(`/api/comments/${id}`, {
                "id" : editingCommentId,
                "bookId": bookid,
                "content": editingContent
            });
            alert('댓글이 수정되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error("현재 id: "+id + "현재 commentid : " +editingCommentId)
            alert('댓글 수정에 실패했습니다.');
        }
    };
    
    
    return (
        <html>
            <head>
                <title>도서 정보</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">도서 정보</h1>
                        <h5 className="display-5" align="center">Book Details</h5>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={book.imageurl} style={{width:'80%'}}></img>
                        </div>
                        
                        <div className="col-md-8">
                            <h3>{book.bookname}</h3>
                            <p>{book.description}</p>
                            <br />
                            <p><b>도서코드 : </b><span className="badge badge-info">{book.id}</span></p>
                            <p><b>저자</b> : {book.author}</p>
                            <p><b>출판사</b> : {book.publisher}</p>
                            <p><b>출판일</b> : {book.releasedate}</p>
                            <p><b>분류</b> : {book.category}</p>
                            <p><b>재고수</b> : {book.unitsinstock}</p>
                            <h4>₩{book.price}</h4>
                            <b>댓글</b>

                            <div>

                            {comment && comment.map((comment) => (
                                <div className="card" key={comment.id}>
                                    <div className="card-header">
                                        {comment.username}  
                                    </div>
                                    <div className="card-body">
                                        {editingCommentId === comment.id ? (
                                            <>
                                                <input value={editingContent} onChange={(e) => setEditingContent(e.target.value)} className="form-control"/>
                                                <button className="btn btn-success" onClick={() => saveComment(comment.id)}>저장</button>
                                            </>
                                        ) : (
                                            <>
                                                {comment.content}
                                                <div className="float-right">
                                                    <button className="btn btn-success" onClick={() => startEdit(comment)}>수정 &raquo;</button>              
                                                    <button className="btn btn-danger" onClick={() => deletecomment(comment.id)}>삭제 &raquo;</button>
                                                </div>
                                            </>
                                        )}
                                    </div>                           
                                </div>   
                            ))}                               
                            </div>

                            <br />

                            <b>댓글 작성</b>
                            <form onSubmit={createcomment} className="form-horizontal">
                            <div className="row">
                                <div className="col-sm-10">
                                    <input name="content" value={newcomment} onChange={(e) => setNewcomment(e.target.value)} className="form-control" placeholder="댓글을 입력하세요"/>
                                </div>
                                <div className="col-sm-2">  
                                    <button type="submit" className="btn btn-primary">등록</button>      
                                </div>                                         
                            </div>                    
                            </form>


                            <br />
                            <Link to={`/books/book/update/${book.id}`} className="btn btn-success" role="button">수정 &raquo;</Link>
                            <Link to={`/books/book/delete/${book.id}`} className="btn btn-danger"  onClick={() => deleteBook(book.id)} role="button">삭제 &raquo;</Link>

                            <br />
                            <br />

                            <button className="btn btn-success" onClick={() => addCart(book.id)}>장바구니에 추가 &raquo;</button>
                            
                            <div>
                                <label htmlFor="purchaseQuantity">수량 선택 : </label>
                                <select 
                                    id="purchaseQuantity"
                                    value={purchaseQuantity} 
                                    onChange={e => setPurchaseQuantity(e.target.value)} 
                                    className="form-control" 
                                    style={{width: 'auto', display: 'inline-block', margin: '0 10px'}}
                                >
                                    {[...Array(10).keys()].map(n => (
                                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                                    ))}
                                </select>
                                <button className="btn btn-danger" onClick={purchase}>바로 구매하기 &raquo;</button>
                            </div>
                            
                            <br />
                            <br />

                            <Link to={`/books`} className="btn btn-secondary">도서목록 &raquo;</Link>
                            <Link to={`/cart`} className="btn btn-warning">장바구니 &raquo;</Link>

                        </div>
                    </div>
                </div>
            </body>
        </html>        
    )
}

export default Book;