import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchPlaylists } from '../../../services/apiCalls';

const EventForm = ({ show, handleClose, handleFormSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [playlist, setplaylist] = useState([])

    const handleSubmit = () => {
        handleFormSubmit({ title, descripcion, dateStart, dateEnd });
        setTitle('');
        setDescripcion('');
        setDateStart('');
        setDateEnd('');
        handleClose();
    };

    useEffect(() => {
        if (!loading) {
            fetchPlaylists()
                .then(result => {
                    setplaylist(result)

                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(true));
        }
        console.log(playlist)
    }, [loading])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Título del Evento</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción del Evento</Form.Label>
                        <Form.Control type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formDateStart">
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control type='date' value={dateStart} onChange={(e) => setDateStart(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDateEnd">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type='date' value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Playlists</Form.Label>
                        <Form.Control as="select" name="playlist">
                            {playlist.map((playlist) =>
                                <option value={playlist._id} key={playlist._id} name='playlists'>{playlist.nombre}</option>
                            )}
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Crear Evento
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventForm;
