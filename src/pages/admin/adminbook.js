import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Adminbook() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [book, setBook] = useState();
    const [comment, setComment] = useState([]);
    const [newcomment, setNewcomment] = useState('')
    const [cartQuantity, setCartQuantity] = useState(1);
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [bookid, setBookid] = useState(1);

    useEffect(() => {
        if(id) {
            const url = `/api/books/${id}`;
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
        return <h2>Book Loading...</h2>
    }

    const deleteBook = async (id) => {
        const isConfirmed = window.confirm("책을 삭제 하시겠습니까?");

        if(isConfirmed) {
            try {
            await axios.delete(`/api/books/${id}`);
            alert('삭제되었습니다.');
            navigate("/admin/adminbooks")
            } catch (error) {
            console.error("삭제에 실패했습니다:", error);
            alert('삭제에 실패했습니다.');
            window.location.reload();
            }            
        }
        else {
            window.location.reload();
        }

    }

    const deletecomment = async (id) => {
        const isConfirmed = window.confirm("댓글을 삭제 하시겠습니까?");

        if(isConfirmed) {
            try {
            await axios.delete(`/api/comments/${id}`);
            alert('댓글이 삭제되었습니다.');
            window.location.reload();
          } catch (error) {
            console.error("삭제에 실패했습니다:", error);
            alert('댓글 삭제에 실패했습니다.');
            window.location.reload();
          }
        }
        else {
            window.location.reload();
        }
        
    }

    return (
        <html>
            <head>
                <title>관리자 도서 정보</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">관리자 도서 정보</h1>
                        <h5 className="display-5" align="center">Admin Book Details</h5>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4" align="center">
                            <img src={book.imageurl} style={{width:'80%'}}></img>
                        </div>
                        
                        <div className="col-md-8" align="center">
                            <h3>{book.bookname}</h3>
                            <br />
                            <p><b>도서코드 : </b><span className="badge badge-info">{book.id}</span></p>
                            <p><b>저자</b> : {book.author}</p>
                            <p><b>출판사</b> : {book.publisher}</p>
                            <p><b>출판일</b> : {book.releasedate}</p>
                            <p><b>분류</b> : {book.category}</p>
                            <p><b>재고수</b> : {book.unitsinstock}</p>
                            <h4>₩{book.price}</h4>
                            <p>{book.description}</p>
                        </div>

                        <div className="col-md-10">

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
                                                {/* <input value={editingContent} onChange={(e) => setEditingContent(e.target.value)} className="form-control"/> */}
                                                {/* <button className="btn btn-success" onClick={() => saveComment(comment.id)}>저장</button> */}
                                            </>
                                        ) : (
                                            <>
                                                {comment.content}
                                                <div className="float-right">
                                                    {/* <button className="btn btn-success" onClick={() => startEdit(comment)}>수정 &raquo;</button>               */}
                                                    <button className="btn btn-danger" onClick={() => deletecomment(comment.id)}>삭제 &raquo;</button>
                                                </div>
                                            </>
                                        )}
                                    </div>                           
                                </div>   
                            ))}             
                                {comment.length === 0 && (
                                    <div className="alert alert-info" role="alert">
                                        작성된 댓글이 없습니다.
                                    </div>
                                )}                  
                            </div>

                            <br />

                            <br />
                            <Link to={`/books/book/update/${book.id}`} className="btn btn-success" role="button">책 수정 &raquo;</Link> &nbsp;
                            <Link to={`/books/book/delete/${book.id}`} className="btn btn-danger"  onClick={() => deleteBook(book.id)} role="button">책 삭제 &raquo;</Link>

                            <br />
                            <br />

                            <Link to={`/admin/adminbooks`} className="btn btn-secondary">도서목록 &raquo;</Link>
                            {/* <Link to={`/cart`} className="btn btn-warning">장바구니 &raquo;</Link> */}

                        </div>
                    </div>
                </div>
            </body>
        </html>        
    )
}

export default Adminbook;