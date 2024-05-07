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
            window.location.reload();
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
                
                <div className="container col-md-4">
                    <div className="text-center">
                        <h3 className="form-signin-heading">Add New Book</h3>
                    </div>
                    <form onSubmit={saveBook} className="form-horizontal">
                        <div className="form-group row">
                            도서명 <input name="bookname" value={book.bookname} onChange={onChange} className="form-control" placeholder="Book Name" /> 
                        </div>

                        <div className="form-group row">
                            가격 <input name="price" value={book.price} onChange={onChange} className="form-control" placeholder="Book Price" />
                        </div>

                        <div className="form-group row">
                            저자 <input name="author" value={book.author} onChange={onChange} className="form-control" placeholder="Book Author" />
                        </div>

                        <div className="form-group row">
                            상세정보 <textarea name="description" value={book.description} onChange={onChange} className="form-control" placeholder="Book Details" />
                        </div>

                        <div className="form-group row">
                            출판사 <input name="publisher" value={book.publisher} onChange={onChange} className="form-control" placeholder="Book Publisher" />
                        </div>

                        <div className="form-group row">
                            분류 <input name="category" value={book.category} onChange={onChange} className="form-control" placeholder="Book Classification" />                   
                        </div>

                        <div className="form-group row">
                            재고수 <input name="unitsinstock" value={book.unitsinstock} onChange={onChange} className="form-control" placeholder="Book Units In Stock" />                           
                        </div>

                        <div className="form-group row">
                            출판일 <input type="date" name="releasedate" value={book.releasedate} onChange={onChange} className="form-control" />                   
                        </div>
                        
                        <div className="form-group row">
                            <form onSubmit={saveImage} className="form-horizontal">
                                도서이미지 <input type="file" name="imageurl" value={book.imageurl} onChange={onChange} className="form-control" />                         
                            </form>
                        </div>

                        <br />

                        <div className="form-group row">
                            <button type="submit" className="btn btn-lg btn-primary btn-block">등록</button>
                        </div> 
                    </form>                    
                </div>
            </body>
        </html>
    )
}

export default AddBook;