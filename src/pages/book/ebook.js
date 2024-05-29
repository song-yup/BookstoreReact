import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";

function EBook() {
    const { id } = useParams();
    const [book, setBook] = useState();
    const [ebook, setEBook] = useState();
    const [page, setPage] = useState(0);
    const [image, setImage] = useState();
    const [loadingImage, setLoadingImage] = useState(false);
    const [audioDownloadUrl, setAudioDownloadUrl] = useState(null);
    const [loadingAudio, setLoadingAudio] = useState(false);
    const audioRef = useRef(null);

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
        setAudioDownloadUrl(null);
        setLoadingAudio(false);
    };

    const decreasePage = () => {
        setPage(prevPage => prevPage - 1);
        setImage(undefined);
        setAudioDownloadUrl(null);
        setLoadingAudio(false);
    };

    const AIimage = async (event) => {
        event.preventDefault();
        setLoadingImage(true);
        try {
            const response = await axios.post(`/api/texttoimage`, {
                "contentEn":ebook.contentEn
            });
            setImage(response.data.images[0].image);
            setLoadingImage(false);
        } catch (error) {
            alert('표지에서는 AI 이미지 생성을 지원하지 않습니다.');            
            console.error(error);
            setLoadingImage(false);
        }
    }

    const AIspeech = async () => {    
        if (page === 0) {
            alert("표지에서는 AI 음성 읽어주기를 지원하지 않습니다.");
            return;
        }

        const postUrl = '/api/texttospeech';
        const postData = {
            "contentKo": ebook.contentKo
        };
    
        try {
            setLoadingAudio(true);
            const postResponse = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
    
            if (!postResponse.ok) {
                throw new Error('Network response was not ok ' + postResponse.statusText);
            }
    
            const postResult = await postResponse.json();
            const getUrl = postResult.result.speak_v2_url; 
    
            console.log(getUrl);
    
            const getHeaders = {
                'content-type': 'application/json',
                'Authorization': ' Bearer __pltDPKi4Mp65F8a9AEG93dFeRtZcJv7EeCbVzDoZoAU'
            };
    
            const checkStatus = async () => {
                const getResponse = await fetch(getUrl, { method: 'GET', headers: getHeaders });
    
                if (!getResponse.ok) {
                    throw new Error('Network response was not ok ' + getResponse.statusText);
                }
    
                const getResult = await getResponse.json();
                console.log('get방식 결과: ', getResult);
    
                if (getResult.result.status === 'done') {
                    const audioDownloadUrl = getResult.result.audio_download_url;
                    console.log('Audio Download URL:', audioDownloadUrl);

                    setAudioDownloadUrl(audioDownloadUrl);
                    
                } else {
                    console.log('Status가 done이 아닙니다. 다시 시도합니다...');
                    setTimeout(checkStatus, 5000);
                }
            };

            checkStatus();
    
        } catch (error) {
            console.error('Fetch error:', error);
            setLoadingAudio(false);
        }
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
                        : <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}} className='ebookcontent'>{ebook.contentKo}</pre>
                    }
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={decreasePage} disabled={page === 0} className="btn btn-primary">이전 페이지</button>
                        &nbsp;
                        <button onClick={increasePage} className="btn btn-primary">다음 페이지</button>
                    </div>

                    <br/>

                    <div>
                        {!loadingAudio && !audioDownloadUrl && (
                            <button onClick={AIspeech} className="btn btn-secondary">AI 음성 읽어주기</button>
                        )}
                        {loadingAudio && !audioDownloadUrl && <p>음성 파일 생성 중...</p>}
                        {audioDownloadUrl && (
                            <>
                                <audio ref={audioRef} src={audioDownloadUrl} controls style={{width: '100%'}}>
                                    Your browser does not support the audio element.
                                </audio>
                            </>
                        )}
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

export default EBook;
