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
    const [image, setImage] = useState();
    const [loadingImage, setLoadingImage] = useState(false); // 이미지 로딩 상태 추가

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
    }, [id, page]);

    const increasePage = () => {
        setPage(prevPage => prevPage + 1);
        setImage(undefined);
    };

    const decreasePage = () => {
        setPage(prevPage => prevPage - 1);
        setImage(undefined);
    };

    const AIimage = async (event) => {
        event.preventDefault();
        setLoadingImage(true); // 이미지 로딩 시작
        try {
            const response = await axios.post(`/api/texttoimage`, {
                "contentEn":ebook.contentEn
            });
            setImage(response.data.images[0].image); // 이미지 설정
            setLoadingImage(false); // 이미지 로딩 완료
        } catch (error) {
            alert('AI 이미지 생성에 실패했습니다.');            
            console.error(error);
            setLoadingImage(false); // 이미지 로딩 실패
        }
    }
    

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
                <div style={{ border: '2px solid black', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
                        <button onClick={AIimage} className="btn btn-success float-right margin-class">AI 이미지 생성</button>
                        {loadingImage ? <p>Image Loading...</p> : <img src={image} style={{width:'80%'}} alt="AI 생성 이미지"></img>}                        
                </div>
            </div>  
        </html> 
    );
}

export default EBooks;
