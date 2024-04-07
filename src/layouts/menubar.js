import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from "react-bootstrap";
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../pages/user/authcontext';


const Menubar = () => {  
    const { isLoggedIn, logout } = useAuth();  
    
    return (
            <header>
                <Nav className='navbar navbar-expand navbar-dark bg-dark'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <Link to="/books"><a className="navbar-brand" style={{ color: 'white' }}>SBS Book Market</a></Link>
                        </div>
                    <div>
                        <ul className="navbar-nav mr-auto">
                            {/* <li><Link to="/login" className="nav-link" role="button">로그인</Link></li> */}
                            {
                                isLoggedIn ? (
                                <li><button className='btn btn-danger' onClick={logout}>로그아웃</button></li>
                                ) : (
                                    <Link to="/login" className="nav-link" role="button">로그인</Link>
                                )
                            }

                            <li><Link to='/mypage' className='nav-link' role='button'>마이 메뉴</Link></li>
                                                                
                            <li><Link to="/books/new" className="nav-link" role="button">신간도서</Link></li>

                            <li><Link to="/books/ranking" className="nav-link" role="button">인기 도서 랭킹</Link></li>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    카테고리
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/외국어/books`}>외국어</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/소설/books`}>소설</Dropdown.Item>
                                    <Dropdown.Item as={Link} to={`/시_에세이/books`}>시_에세이</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                                
                            <li><Link to="/books/add" className='nav-link' role='button'>도서 추가</Link></li>
                                
                        </ul>
                    </div>
                    </div>
                </Nav>
            </header>
    );
}

export default Menubar;