import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {UseNavigation} from '../../utils/NavigationUtil'

function NavbarPanel() {
    const handleNavigation = UseNavigation();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => handleNavigation('/')}>Inicio</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => handleNavigation('/files')}>Archivos</Nav.Link>
                    <Nav.Link onClick={() => handleNavigation('/playlist')}>Playlist</Nav.Link>
                    <Nav.Link onClick={() => handleNavigation('/calendario')}>Calendario</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarPanel;