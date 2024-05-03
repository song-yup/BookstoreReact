import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

function AddBook() {
    const navigate = useNavigate(); 
    const [book, setBook] = useState(
        {
            "id":""
        }
    );

    const url="/api/books";

    const onChange = (event) => {
        const { value, name } = event.target;
        setBook({
          ...book,
          [name]: value,
        });
      };

      const saveBook = async (e) => {
        e.preventDefault();
        await axios.post(`${url}`, book).then((res) => {
            alert('등록되었습니다');
            navigate("/admin/adminbooks")
        }).catch((error) => {
            console.error("등록에 실패했습니다:", error);
            alert('등록에 실패했습니다');
        });
      };

      const saveImage = async (e) => {
        e.preventDefault();
        await axios.post(`/api/upload`).then((res) => {
            alert("이미지가 등록되었습니다.");
        }).catch((error) => {
            alert("이미지 등록에 실패하였습니다.");
        })
      };

    return (
        <html>
            <head>
                <title>도서 등록</title>
            </head>

            <body>
                <div className="jumbotron"> 
                    <div className="container">
                        <h1 className="display-3" align="center">도서 등록</h1>
                        <h5 className="display-5" align="center">Book Addition</h5>
                    </div>
                </div>
                
                <div className="container">
                    <legend>신규 도서 등록</legend>
                    <form onSubmit={saveBook} className="form-horizontal">

                        {/* <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                도서 ID
                            </label>
                            <div className="col-sm-3">
                                <input name="id" value={book.id} onChange={onChange} className="form-control" />
                            </div>
                        </div> */}
                        
                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                도서명
                            </label>
                            <div className="col-sm-3">
                                <input name="bookname" value={book.bookname} onChange={onChange} className="form-control" />
                            </div>                             
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                가격
                            </label>
                            <div className="col-sm-3">
                                <input name="price" value={book.price} onChange={onChange} className="form-control" />
                            </div>                             
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">  
                                저자
                            </label>
                            <div className="col-sm-3">
                                <input name="author" value={book.author} onChange={onChange} className="form-control" />
                            </div>                             
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                상세정보
                            </label>
                            <div className="col-sm-5">
                                <textarea name="description" value={book.description} onChange={onChange} className="form-control" />
                            </div>                             
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                출판사
                            </label>
                            <div className="col-sm-3">
                                <input name="publisher" value={book.publisher} onChange={onChange} className="form-control" />
                            </div>                             
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                분류
                            </label>
                            <div className="col-sm-3">
                                <input name="category" value={book.category} onChange={onChange} className="form-control" />
                            </div>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                재고수
                            </label>
                            <div className="col-sm-3">
                                <input name="unitsinstock" value={book.unitsinstock} onChange={onChange} className="form-control" />
                            </div>                            
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                출판일
                            </label>
                            <div className="col-sm-3">
                                <input type="date" name="releasedate" value={book.releasedate} onChange={onChange} className="form-control" />
                            </div>                         
                        </div>
                        
                        <form onSubmit={saveImage} className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-sm-2 control-label">
                                도서이미지
                            </label>
                            <div className="col-sm-7">
                                <input type="file" name="imageurl" value={book.imageurl} onChange={onChange} className="form-control" />
                            </div>                            
                        </div>
                        </form>

                        <div className="form-group row">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary">등록</button>
                            </div>
                        </div>
                        
                    </form>                    
                </div>
            </body>
        </html>
    )
}

export default AddBook;