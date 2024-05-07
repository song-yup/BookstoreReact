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
    const [cartQuantity, setCartQuantity] = useState(1);
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [bookid, setBookid] = useState(1);

    const increaseQuantity = () => {
      setCartQuantity(prevQuantity => prevQuantity + 1);
    };
  
    const decreaseQuantity = () => {
      setCartQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

    const increasePurchaseQuantity = () => {
        setPurchaseQuantity(prevQuantity => prevQuantity + 1);
      };
    
    const decreasePurchaseQuantity = () => {
        setPurchaseQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
    };

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

    const cart = async () => {
        const isConfirmed = window.confirm("장바구니에 " + cartQuantity + "권을 추가하시겠습니까?");

        if(isConfirmed) {
           try {
            await axios.post(`/api/books/${id}/cart`, {
                "quantity": cartQuantity,
                "bookId":id
            });
            alert("장바구니에 " + cartQuantity  + "권을 추가하였습니다.");
            window.location.reload();
            } catch (error) {
                console.error(error)
                alert('장바구니 추가에 실패했습니다. 로그인이 필요한 서비스 입니다.');
                navigate('/login');
            } 
        }
        else {
            window.location.reload();
        }
    }


    const purchase = async () => { 
        const isConfirmed = window.confirm(purchaseQuantity + "권을 바로 구매하시겠습니까?");

        if(isConfirmed) {
            try {
                await axios.post(`/api/books/${id}/purchase`, {
                    "quantity": purchaseQuantity,
                    "bookId": id
                });
                alert(purchaseQuantity + "권을 구매하였습니다.");
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert('구매목록 추가에 실패했습니다. 로그인이 필요한 서비스 입니다.');
                navigate('/login');
            }  
        }
        else {
            window.location.reload();
        }
        
    };

    const createcomment = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/books/${id}/comments`, {
                "bookId": id,
                "content": newcomment
            })
            alert('댓글이 작성되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error(error)
            alert('댓글 작성에 실패했습니다. 로그인이 필요한 서비스 입니다.');
            navigate('/login');
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
            console.error("현재 id: "+id + "현재 commentid : " + editingCommentId)
            alert('댓글 수정에 실패했습니다.');
            window.location.reload();
        }
    };

    const cancelComment = () => {
        setEditingContent(comment.content);
        window.location.reload();
    }
    
    
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
                        <div className="col-md-4" align="center">
                            <img src={book.imageurl} style={{width:'100%'}}></img>
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
                                                <div className="d-flex">
                                                    <div className="col-sm-5">
                                                        <input value={editingContent} onChange={(e) => setEditingContent(e.target.value)} className="form-control"/>
                                                    </div>
                                                    <div className="float-righ">  
                                                        <button className="btn btn-success" onClick={() => saveComment(comment.id)}>저장</button> 
                                                        &nbsp;
                                                        <button className="btn btn-secondary" onClick={cancelComment}>취소</button>
                                                    </div>
                                                </div>

                                                {/* <button className="btn btn-success" onClick={() => saveComment(comment.id)}>저장</button> */}
                                            </>
                                        ) : (
                                            <>
                                                {comment.content}
                                                <div className="float-right">
                                                    <button className="btn btn-success" onClick={() => startEdit(comment)}>수정 &raquo;</button>              
                                                    &nbsp;
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

                            <b>댓글 작성</b>
                            <form onSubmit={createcomment} className="form-horizontal">
                                <div className="d-flex">
                                    <div className="col-sm-5">
                                        <input name="content" value={newcomment} onChange={(e) => setNewcomment(e.target.value)} className="form-control" placeholder="댓글을 입력하세요"/>
                                    </div>
                                    <div className="col-sm-2">  
                                        <button type="submit" className="btn btn-primary">등록</button>      
                                    </div>
                                </div>                                         
                            </form>

                            <br />
                            <br />
                            <br />

                            <div>
                                <label htmlFor="cartQuantity">장바구니 수량 선택 : </label>
                                <div>
                                    <button 
                                        onClick={decreaseQuantity} 
                                        className="btn btn-secondary" 
                                        style={{margin: '0 10px'}}
                                        disabled={cartQuantity === 1} // 1일 때 버튼 비활성화
                                    >
                                        -
                                    </button>
                                    <span>{cartQuantity}</span>
                                    <button 
                                        onClick={increaseQuantity} 
                                        className="btn btn-secondary" 
                                        style={{margin: '0 10px'}}
                                    >
                                        +
                                    </button>
                                    <button className="btn btn-success" onClick={cart}>장바구니에 추가 &raquo;</button>
                                </div>
                                
                            </div>

                            <br />
                            
                            <div>
                                <label htmlFor="purchaseQuantity">구매 수량 선택 : </label>
                                <div>
                                    <button 
                                        onClick={decreasePurchaseQuantity} 
                                        className="btn btn-secondary" 
                                        style={{margin: '0 10px'}}
                                        disabled={purchaseQuantity === 1} // 1일 때 버튼 비활성화
                                    >
                                        -
                                    </button>
                                    <span>{purchaseQuantity}</span>
                                    <button 
                                        onClick={increasePurchaseQuantity} 
                                        className="btn btn-secondary" 
                                        style={{margin: '0 10px'}}
                                    >
                                        +
                                    </button>
                                    <button className="btn btn-danger" onClick={purchase}>바로 구매하기 &raquo;</button>
                                </div>
                            </div>
                            
                            <br />
                            <br />

                            {/* <Link to={`/books`} className="btn btn-secondary">도서목록 &raquo;</Link>
                            <Link to={`/cart`} className="btn btn-warning">장바구니 &raquo;</Link> */}

                        </div>
                    </div>
                </div>
            </body>
        </html>        
    )
}

export default Book;