import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CreateFile } from '../../../services/apiCalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { changeUploading } from "../../../redux/notificacionSlice";
import { loginUser } from '../../../redux/userSlice';
import { ShowAlert } from '../../../components/common/Alert';
import { useRef } from 'react';



export const AddFiles = () => {
    const [isImage, setIsImage] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        duracion: '',
        archivo: '',
    });
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.notificacion.uploading);
    const fileInputRef = useRef(null);  // Referencia para el input file

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
            archivo: selectedFile || null,
        });
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(changeUploading({ uploading: true }));
        try {
            const response = await CreateFile(formData);
            console.log(response);
            ShowAlert('Archivo añadido', 'success');
            setFormData({
                nombre: '',
                descripcion: '',
                ubicacion: '',
                duracion: '',
                archivo: ''
            });
            fileInputRef.current.value = ''
        } catch (error) {
            ShowAlert('Error en la solicitud', 'error');
            console.error("Error al añadir el archivo", error);
        } finally {
            dispatch(changeUploading({ uploading: false }));
        }
    };



    return (
        <div className='container-fluid'>
            <div className='mt-5'>
                <Form className='w-75 p-5 container shadow-lg p-3 mb-5 bg-white rounded' onSubmit={handleSubmit}>
                    <legend className='text-center text-bg-info'>AÑADIR ARCHIVOS</legend>
                    <Form.Group className='mb-3' controlId='nombre'>
                        <Form.Label>Nombre del archivo</Form.Label>
                        <Form.Control type='text' value={formData.nombre} onChange={handleChange} name='nombre' required disabled={uploading} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='descripcion'>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type='text' name='descripcion' value={formData.descripcion} onChange={handleChange} disabled={uploading} />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='ubicacion'>
                        <Form.Label>Ubicacion</Form.Label>
                        <Form.Control type='text' name='ubicacion' value={formData.ubicacion} onChange={handleChange} disabled={uploading} />
                    </Form.Group>
                    {isImage && (
                        <Form.Group className='mb-3' controlId='duracion'>
                            <Form.Label>Duracion</Form.Label>
                            <Form.Control type='number' name='duracion' value={formData.duracion} onChange={handleChange} placeholder='Indique la duración en caso de ser una imagen' required min={1} disabled={uploading} />
                        </Form.Group>
                    )}
                    <Form.Group className='mb-3' controlId='archivo'>
                        <Form.Label>Seleciona un archivo</Form.Label>
                        <Form.Control type='file' name='archivo'  onChange={handleFileChange} disabled={uploading}  ref={fileInputRef} />
                    </Form.Group>
                    <div className='row mt-5'>
                        <Button type="submit" className='text-uppercase' id='CreateFile' disabled={uploading}>Crear archivo</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}