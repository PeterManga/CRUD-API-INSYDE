import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import { CreateFile } from '../../../services/apiCalls';
import { useEffect, useState } from 'react';
import { fetchPlaylists } from '../../../services/apiCalls';


export const AddFiles = () => {
    const [playlist, setPlaylist] = useState([])
    const [isImage, setIsImage] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        duracion: 0,
        archivo: undefined,
        playlists: []

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        let imagen = selectedFile.type.includes("image")
        if (imagen) {
            setIsImage(true)
        }
        setFormData({
            ...formData,
            archivo: selectedFile,
        });
    };
    const handlePlaylistChange = (e) => {
        const { options } = e.target;
        const selectedPlaylists = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedPlaylists.push(options[i].value);
            }
        }
        setFormData({ ...formData, playlists: selectedPlaylists });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //Envia los dato del formulario al CreateFile
        CreateFile(formData)
            .then((response) => {
                console.log(response);
                //limpia el formulario
                setFormData({
                    nombre: '',
                    descripcion: '',
                    duracion: '',
                    duracion: '',
                    archivo: null,
                    playlist: ''
                });
                <div class="alert alert-success" role="alert">
                    Archivo creado correctamente
                </div>
            })
            .catch((error) => {
                console.error("Error añadir el archivo", error)
            });
    };

    useEffect(() => {
        fetchPlaylists()
            .then(result => {
                setPlaylist(result);
                console.log(result)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
        console.log(formData)
    }, [formData])


    return (
        <div className='container-fluid'>
            <div className='mt-5'>
                <Form className='w-75 p-3 container' onSubmit={handleSubmit} >
                    <legend className='text-center text-decoration-underline'>FORMULARIO PARA AÑADIR ARCHIVOS</legend>
                    <fieldset></fieldset>
                    <Form.Group className='mb-3' controlId='nombre'>
                        <Form.Label>Nombre del archivo</Form.Label>
                        <Form.Control type='text' value={formData.nombre} onChange={handleChange} name='nombre' required></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='descripcion'>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type='text' name='descripcion' value={formData.descripcion} onChange={handleChange} ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='ubicacion'>
                        <Form.Label>Ubicacion</Form.Label>
                        <Form.Control type='text' name='ubicacion' value={formData.ubicacion} onChange={handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='playlist'>
                        <Form.Label>Playlist</Form.Label>
                        <Form.Control as="select" name="playlist" multiple onChange={handlePlaylistChange}>
                            {playlist.map((playlist) =>
                                <option value={playlist._id} key={playlist._id} name='playlists'>{playlist.nombre}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    {isImage ? <Form.Group className='mb-3' controlId='duracion'>
                        <Form.Label>Duracion</Form.Label>
                        <Form.Control type='number' name='duracion' value={formData.duracion} onChange={handleChange} placeholder='Indique la duración en caso de ser una imagen' required min={1}></Form.Control>
                    </Form.Group> : ''}
                    <Form.Group className='mb-3' controlId='archivo'>
                        <Form.Label>Seleciona un archivo</Form.Label>
                        <Form.Control type='file' name='archivo' onChange={handleFileChange}></Form.Control>
                    </Form.Group>
                    <div className='row mt-5 '>
                        <Button type="submit" className='text-uppercase'>Crear archivo</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}