import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";

function EBooks() {
    const { id } = useParams();
    const [book, setBook] = useState();
    const [ebook, setEBook] = useState();
    const [page, setPage] = useState(0);

    useEffect(() => {
        if(id) {
            const url = `/api/books/${id}`;
            const ebookurl = `/api/ebook/${id}/${page}`;

            axios.get(`${url}`)
            .then(response => setBook(response.data))
            .catch(error => console.log(error));

            axios.get(`${ebookurl}`)
            .then(response => setEBook(response.data))
            .catch(error => console.log(error));
        }
    }, [id, page]); // 페이지 변화에 따라 useEffect를 다시 실행하도록 page를 의존성 배열에 추가합니다.

    // 페이지 증가 함수
    const increasePage = () => {
        setPage(prevPage => prevPage + 1);
    };

    // 페이지 감소 함수
    const decreasePage = () => {
        setPage(prevPage => prevPage - 1);
    };

    if(!book || !ebook ) {
        return <h2>E-Book Loading...</h2>
    }

    return (
        <html> 
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand>SBS Book Market</Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
            <div>
                <div style={{ border: '2px solid black', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
                    {
                        page === 0
                        ? <img src={ebook.contentKo} alt="E-Book Image" style={{width:'40%'}} />
                        : <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>{ebook.contentKo}</pre>
                    }
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={decreasePage} disabled={page === 0} className="btn btn-primary">이전 페이지</button>
                        &nbsp;
                        <button onClick={increasePage} className="btn btn-primary">다음 페이지</button>
                    </div>
                </div>
            </div>  
        </html> 
    );
}

export default EBooks;