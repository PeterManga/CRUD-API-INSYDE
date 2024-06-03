import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UseNavigation } from '../../utils/NavigationUtil';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const MySwal = withReactContent(Swal);

function NavbarPanel() {
  const { isAuthenticated, logout } = useAuth(); // Obtener isAuthenticated y logout del contexto
  const handleNavigation = UseNavigation();
  const uploading = useSelector((state) => state.notificacion.uploading);

  useEffect(() => {
    if (uploading) {
      MySwal.fire({
        position: "top-end",
        toast: true,
        width: 200,
        height: 200,
        title: 'Subiendo archivo',
        text: 'Por favor, espere...',
        icon: 'info',
        allowOutsideClick: true,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    } else {
      Swal.close();
    }
  }, [uploading]);

  return (
    <div className='container-fluid'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => handleNavigation('/')}>Inicio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigation('/files')}>Archivos</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/playlist')}>Playlist</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/player')}>Player</Nav.Link>
            <div className=''>
              {isAuthenticated ? (
                <Nav.Link onClick={() => { logout(); handleNavigation('/login'); }}>Logout</Nav.Link>
              ) : (
                <Nav.Link onClick={() => handleNavigation('/login')}>Login</Nav.Link>
              )}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarPanel;
