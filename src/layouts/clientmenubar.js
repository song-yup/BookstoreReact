import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../pages/user/authcontext';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Clientmenubar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate(); // useNavigate 사용하여 navigate 함수 생성

    const handleLogout = () => {
        logout(); // 로그아웃 함수 호출
        navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    }

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
                                    <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
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

                            
                            <Nav.Link as={Link} to="/books/new">신간 도서</Nav.Link>
                            <Nav.Link as={Link} to="/books/ranking">인기 도서</Nav.Link>
                            <Nav.Link as={Link} to="/books/ebooks">E-Books</Nav.Link>

                            <NavDropdown title="카테고리">
                                    <NavDropdown.Item as={Link} to={`/외국어/books`}>외국어</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/소설/books`}>소설</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/시_에세이/books`}>시_에세이</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/경제_경영/books`}>경제_경영</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/유아(0~7세)/books`}>유아(0~7세)</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/어린이(초등)/books`}>어린이(초등)</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/인문/books`}>인문</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/자기계발/books`}>자기계발</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/역사_문화/books`}>역사_문화</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/가정_육아/books`}>가정_육아</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/건강/books`}>건강</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={`/정치_사회/books`}>정치_사회</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Clientmenubar;
