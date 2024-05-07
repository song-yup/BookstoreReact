import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Adminmenubar = () => {      
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/admin/adminbooks">SBS Book Market</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/admin/books/add'>도서 추가</Nav.Link>
                            <Nav.Link as={Link} to='/admin/adminstock'>재고 현황</Nav.Link>
                            <Nav.Link as={Link} to='/admin/admincalculate'>정산 메뉴</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Adminmenubar;
