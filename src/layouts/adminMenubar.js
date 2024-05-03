import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from "react-bootstrap";
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";


const Adminmenubar = () => {      
    return (
            <header>
                <Nav className='navbar navbar-expand navbar-dark bg-dark'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <Link to="/admin/adminbooks"><a className="navbar-brand" style={{ color: 'white' }}>SBS Book Market</a></Link>
                        </div>
                        <div>
                            <ul className="navbar-nav mr-auto">

                                <li><Link to='/admin/books/add' className='nav-link' role='button'>도서 추가</Link></li>

                                <li><Link to='/admin/adminstock' className='nav-link' role='button'>재고 현황</Link></li>

                                <li><Link to='/admin/admincalculate' className='nav-link' role='button'>정산 메뉴</Link></li>

                            </ul>                            
                        </div>




                    </div>
                </Nav>
            </header>
    );
}

export default Adminmenubar;