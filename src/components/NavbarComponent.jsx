import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarPanel(){
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Inicio</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Archivos</Nav.Link>
                    <Nav.Link href="#features">Playlist</Nav.Link>
                    <Nav.Link href="#pricing">Calendario</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarPanel;