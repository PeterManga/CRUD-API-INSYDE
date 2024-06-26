import { useParams } from 'react-router-dom'
import { DeleteFilePlaylist, GetFileById } from '../../../services/apiCalls'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UpdatePlaylist } from '../../../services/apiCalls';
import { ShowAlert } from '../../../components/common/Alert';
import { UseNavigation } from '../../../utils/NavigationUtil';


export const FileDetailsPage = () => {

    // Obtener el parámetro 'id' de los parámetros de la URL usando useParams
    const { id } = useParams();

    //Hook para almacenar la información del archivo selecionado
    const [fileDetails, setFileDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [durationChanges, setDurationChanges] = useState();
    const [listPlaylist, setListPlaylist] = useState([])

    //Manejar el click en el botón crear archivo usando navidate evita que se recargue toda la aplicacion
    const handleNavigation = UseNavigation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFileDetails(
            { ...fileDetails, [name]: value }
        )
    }

    const handleDuracionChange = (e) => {
        const { value } = e.target;
        setFileDetails(prevState => ({
            ...prevState,
            datos: {
                ...prevState.datos,
                duracion: value
            }
        }));
    };

    const handleDeleteplaylist = async( id, playlistId)=>{
        const result = await DeleteFilePlaylist(id, playlistId)
        if (result) {
            // La eliminación fue exitosa, recargar la lista de archivos
            setLoading(true);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let changes = 0;
        durationChanges < fileDetails.datos.duracion ? changes = 1 : changes = -1
        console.log(changes)
        UpdatePlaylist(id, fileDetails, changes)
            .then((response) => {
                console.log(response);
                ShowAlert('Archivo añadido', 'success')
            })
            .catch((error) => {
                ShowAlert('Error en la solicitud', 'error')
                console.error('error al actualizar el archivo', error)
            })
    }


    //Este hook nos permite obtener la información del archivo cuando el componente se monta o el 'id' cambia
    useEffect(() => {
        if (!loading && fileDetails.length == 0) {
            setLoading(true);
            GetFileById(id)
                .then((resullt) => {
                    setFileDetails(resullt)
                    setDurationChanges(resullt.datos.duracion)
                    // setListPlaylist(fileDetails.playlist)
                })
                .catch((error) => console.error("error fetching data:", error))
                .finally(() => setLoading(false));
        }
        console.log(fileDetails)
    }, [loading, fileDetails]);

    return (
        <div>
            {loading && <div>cargando...</div>}
            {!loading && !fileDetails.nombre && (
                <div>No se encontrar resultados en la búsqueda</div>
            )}
            {fileDetails._id && (
                <div>
                    <Form className='w-75 p-3 container ' onSubmit={handleSubmit}>
                        <legend className='text-center text-decoration-underline'>FORMULARIO PARA EDITAR ARCHIVOS</legend>
                        <fieldset></fieldset>
                        <Form.Group className='mb-3' controlId='nombre'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type='text' value={fileDetails.nombre} name='nombre' required onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='descripcion'>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type='text' name='descripcion' value={fileDetails.descripcion} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='ubicacion'>
                            <Form.Label>Ubicacion</Form.Label>
                            <Form.Control type='text' name='ubicacion' value={fileDetails.ubicacion} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        {fileDetails.playlist.length>=1 &&(
                            <Form.Group className='mb-3 text-center' controlId='playlist'>
                            <Form.Label>Playlist</Form.Label>
                            <div className='d-flex gap-1 justify-content-center'>
                                {fileDetails.playlist.map((playlist) =>
                                    <div key={playlist.playlistId}>
                                        <Button className='btn btn-info' onClick={()=>handleNavigation(`/playlist/${playlist.playlistId}`)}  name='playlists'>{playlist.playlistName}</Button>
                                        {/* <Button className='btn btn-danger' onClick={()=>handleDeleteplaylist(id,playlist.playlistId)} >x</Button> */}
                                    </div>
                                )}
                            </div>
                        </Form.Group>
                        )}
                        <Form.Group className='mb-3' controlId='duracion'>
                            <Form.Label>Duración</Form.Label>
                            <Form.Control
                                type='number'
                                name='duracion'
                                value={fileDetails.datos.duracion}
                                onChange={handleDuracionChange}
                                disabled={fileDetails.datos.resource_type === 'video'} // Deshabilitar el campo para archivos de video
                            />
                            {fileDetails.datos.resource_type === 'image' && (
                                <Form.Text className="text-muted">
                                    La duración no se puede editar para VIDEOS.
                                </Form.Text>
                            )}
                        </Form.Group>

                        <div className='row mt-5 '>
                            <Button type="submit" className='text-uppercase' id='CreateFile' >Actualizar Archivo</Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>

    )
}
