import { useEffect, useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchPlaylists } from '../../../services/apiCalls';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)


const EventForm = ({ show, handleClose, handleFormSubmit, eventDetails, handleDelete }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(eventDetails?.nombre || '');
    const [descripcion, setDescripcion] = useState(eventDetails?.descripcion || '');
    const [dateStart, setDateStart] = useState(eventDetails ? new Date(eventDetails.fechaInicio).toISOString().slice(0, 16) : '');
    const [dateEnd, setDateEnd] = useState(eventDetails ? new Date(eventDetails.fechaFin).toISOString().slice(0, 16) : '');
    const [playlist, setPlaylist] = useState(eventDetails?.playlist || []);
    const [allPlaylists, setAllPlaylists] = useState([]);

    const handleSubmit = () => {
        handleFormSubmit({ title, descripcion, dateStart, dateEnd, playlist });
        handleClose();
    };

    const handlePlaylistChange = (e) => {
        const selectedPlaylists = Array.from(e.target.selectedOptions, option => option.value);
        setPlaylist(prev => [...prev, selectedPlaylists]);
    };


    useEffect(() => {
        if (!loading) {
            fetchPlaylists()
                .then(result => {
                    setAllPlaylists(result);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(true));
        }
        if (eventDetails) {
            setTitle(eventDetails.nombre);
            setDescripcion(eventDetails.descripcion);
            setDateStart(new Date(eventDetails.fechaInicio));
            setDateEnd(new Date(eventDetails.fechaFin));
            setPlaylist(eventDetails.playlist);
        }
        else{
            setTitle('');
            setDescripcion('');
            setDateStart('');
            setDateEnd('');
            setPlaylist([]);
        }
        console.log(eventDetails)
    }, [loading, eventDetails])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{eventDetails ? "Editar Evento" : "Crear Evento"}</Modal.Title>            </Modal.Header>
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
                        <br />
                        <DatePicker
                            selected={dateStart}
                            onChange={(date) => setDateStart(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            className="form-control"
                            locale="es"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDateEnd">
                        <Form.Label>Fecha Fin</Form.Label>
                        <br />
                        <DatePicker
                            selected={dateEnd}
                            onChange={(date) => setDateEnd(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            className="form-control"
                            locale="es"
                        />
                    </Form.Group>
                    <Form.Group className='mt-3 mb-5'>
                        <Form.Label>Playlists Seleccionadas</Form.Label>
                        <div className=' overflow-auto h-auto mt-3 mb-5'>
                            {playlist.map((id, index) => (
                                <span key={index} className="mx-1 bg-success" variant="success">{id}</span>
                            ))}
                        </div>
                        <Form.Control as="select" name="playlist" onChange={handlePlaylistChange}>
                            {allPlaylists.map((pl) => (
                                <option value={pl._id} key={pl._id} name='playlists'>
                                    {pl.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                {eventDetails && (
                    <>
                        {/* Elmina el evento y cierra el formulario */}
                        <Button variant="danger" onClick={() => handleDelete(eventDetails._id).then(handleClose)}>
                            Eliminar Evento
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Guardar Cambios
                        </Button>
                    </>
                )}
                {!eventDetails && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Crear Evento
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default EventForm;
