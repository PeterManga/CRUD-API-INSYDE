import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import { CreateFile } from '../../../services/apiCalls';
import { useState } from 'react';


export const AddFiles = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        duracion: 0,
        archivo: undefined

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        console.log(selectedFile)
        setFormData({
            ...formData,
            archivo: selectedFile,
        });
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
                    archivo: null
                });
                <div class="alert alert-success" role="alert">
                    Archivo creado correctamente
                </div>
            })
            .catch((error) => {
                console.error("Error añadir el archivo", error)
            });
    };

    return (
        <div className='border border-success'>
            <Form className='w-75 p-3' onSubmit={handleSubmit} >
                <legend>FORMULARIO PARA AÑADIR ARCHIVOS</legend>
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
                <Form.Group className='mb-3' controlId='duracion'>
                    <Form.Label>Duracion</Form.Label>
                    <Form.Control type='number' name='duracion' value={formData.duracion} onChange={handleChange} placeholder='Indique la duración en caso de ser una imagen' required></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='archivo'>
                    <Form.Label>Seleciona un archivo</Form.Label>
                    <Form.Control type='file' name='archivo' onChange={handleFileChange}></Form.Control>
                </Form.Group>
                <Button type="submit">Crear archivo</Button>
            </Form>
        </div>
    )
}