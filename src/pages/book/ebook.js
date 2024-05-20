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
    const [loadingImage, setLoadingImage] = useState(false);
    const [audioDownloadUrl, setAudioDownloadUrl] = useState(null); // 음성 파일 URL 상태 추가

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
    };

    const decreasePage = () => {
        setPage(prevPage => prevPage - 1);
        setImage(undefined);
        setAudioDownloadUrl(null);
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

    const AIspeech = async () => {    
        if (page === 0) {
            alert("표지에서는 AI 음성 읽어주기를 지원하지 않습니다.");
            return;
        }

        const postUrl = '/api/texttospeech';
        const postData = {
            "contentKo": ebook.contentKo // 이 부분에서 ebook.contentKo는 해당 변수에 할당된 텍스트 컨텐츠를 사용합니다. 
        };
    
        try {
            // POST 요청 보내기
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
            // 생성된 URL을 가져옴: 이 부분을 수정하여 speak_v2_url을 사용
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
    
                    // 음성 파일 URL 상태 업데이트
                    setAudioDownloadUrl(audioDownloadUrl);
                    
                } else {
                    console.log('Status가 done이 아닙니다. 다시 시도합니다...');
                    setTimeout(checkStatus, 5000); // 5초 후에 다시 시도
                }
            };

            // 최초 체크 실행
            checkStatus();
    
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const playAudio = (url) => {
        const audio = new Audio(url);
        audio.play();
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
                    <div>
                        <button onClick={AIspeech} className="btn btn-secondary float-right margin-class">AI 음성 읽어주기</button>
                        {audioDownloadUrl && (
                            <button onClick={() => playAudio(audioDownloadUrl)} className="btn btn-secondary float-right margin-class">
                                음성 재생
                            </button>
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

export default EBooks;
