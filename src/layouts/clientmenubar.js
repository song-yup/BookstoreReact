import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../pages/user/authcontext';

const Clientmenubar = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/books">SBS Book Market</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                isLoggedIn ? (
                                    <Nav.Link as="button" className='btn btn-danger' onClick={logout} >로그아웃</Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                                )
                            }
                            {/* <Nav.Link as={Link} to='/mypage'>마이 메뉴</Nav.Link> */}

                            {
                                isLoggedIn ? (
                                    <Nav.Link as={Link} to="/mypage" >마이 메뉴</Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/join">회원 가입</Nav.Link>
                                )
                            }

                            
                            <Nav.Link as={Link} to="/books/new">신간도서</Nav.Link>
                            <Nav.Link as={Link} to="/books/ranking">인기 도서 랭킹</Nav.Link>

                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="white-text">
                                    카테고리
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/외국어/books`}>외국어</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/소설/books`}>소설</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/시_에세이/books`}>시_에세이</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/경제_경영/books`}>경제_경영</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/유아(0~7세)/books`}>유아(0~7세)</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/어린이(초등)/books`}>어린이(초등)</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/인문/books`}>인문</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/자기계발/books`}>자기계발</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/역사_문화/books`}>역사_문화</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/가정_육아/books`}>가정_육아</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/건강/books`}>건강</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/정치_사회/books`}>정치_사회</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Clientmenubar;
