import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function Update() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    
    const { id } = useParams();
    const [book, setBook] = useState();

    useEffect(() => {
        if(id) {
            console.log(id);
            const bookurl = `/api/books/${id}`;
            axios.get(`${bookurl}`)
            .then(response => setBook(response.data))
            .catch(error => console.log(error));
        }
    }, [id]);

    if(!book) {
        return <div>Book Not Found!</div>;
    }

    const url = `/api/books/${id}`;

    const onChange = (event) => {
        const { value, name } = event.target;
        setBook({
          ...book,
          [name]: value,
        });
      };

      const editBook = async (e) => {
        e.preventDefault();
        await axios.patch(`${url}`, book).then((res) => {
            alert('수정되었습니다');
            navigate("/admin/adminbook/" + book.id)
        }).catch((error) => {
            console.error("수정에 실패했습니다:", error);
            alert('수정에 실패했습니다');
        });
      };
    
    return (
        <html>
            <head>
                <title>도서 편집</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">도서 편집</h1>
                        <h5 className="display-5" align="center">Book Edit</h5>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <form onSubmit={editBook} className="form-horizontal">
                            {/* <div className="form-group row">
                                <label className="col-sm-2 control-label">
                                    도서 ID
                                </label>
                                <div className="col-sm-6">
                                    <input name="id" value={book.id} onChange={onChange} className="form-control" />
                                </div>
                            </div> */}

                            <span className="badge badge-info">{book.id}</span>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    도서명
                                </label>
                                <div className="col-sm-6">
                                    <input name="bookName" value={book.bookname} onChange={onChange} className="form-control" />
                                </div>                            
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    가격
                                </label>
                                <div className="col-sm-6">
                                    <input name="price" value={book.price} onChange={onChange} className="form-control" />
                                </div>                            
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">  
                                    저자
                                </label>
                                <div className="col-sm-6">
                                    <input name="author" value={book.author} onChange={onChange} className="form-control" />
                                </div>                            
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    상세정보
                                </label>
                                <div className="col-sm-6">
                                    <textarea name="description" value={book.description} onChange={onChange} className="form-control" />
                                </div>                            
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    출판사
                                </label>
                                <div className="col-sm-6">
                                    <input name="publisher" value={book.publisher} onChange={onChange} className="form-control" />
                                </div>                            
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    분류
                                </label>
                                <div className="col-sm-6">
                                    <input name="category" value={book.category} onChange={onChange} className="form-control" />
                                </div>                           
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    재고수
                                </label>
                                <div className="col-sm-6">
                                    <input name="unitsinstock" value={book.unitsinstock} onChange={onChange} className="form-control" />
                                </div>                            
                            </div>

                            <div className="form-group row">
                                <label className="col sm-2 control-label">
                                    출판일
                                </label>
                                <div className="col-sm-6">
                                    <input type="date" name="releasedate" value={book.releasedate} onChange={onChange} className="form-control" />
                                </div>                        
                            </div>

                            {/* <div className="form-group row">
                                <label className="col-sm-2 control-label">
                                    도서이미지
                                </label>
                                <div className="col-sm-6">
                                    <input type="file" name="imageurl" value={book.imageurl} onChange={onChange} className="form-control" />
                                </div>                            
                            </div> */}

                            <div className="form-group row">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-primary">수정</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
            </body>
        </html>        
    )
}

export default Update;