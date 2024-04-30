import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import { CreateFile } from '../../../services/apiCalls';


export const AddFiles = () => {
    return (
        <div className='border border-success'>
            <Form className='w-75 p-3' action={CreateFile(FormData)} >
                <legend>INFOTOOLS</legend>
                <fieldset></fieldset>
                <Form.Group className='mb-3' controlId='nombre'>
                   <Form.Label>Nombre del archivo</Form.Label>
                   <Form.Control type='text'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='descripcion'>
                   <Form.Label>Descripcion</Form.Label>
                   <Form.Control type='text'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='ubicacion'>
                   <Form.Label>Ubicacion</Form.Label>
                   <Form.Control type='text'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='duracion'>
                   <Form.Label>Duracion</Form.Label>
                   <Form.Control type='number'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='archivo'>
                   <Form.Label>Seleciona un archivo</Form.Label>
                   <Form.Control type='file'></Form.Control>
                </Form.Group>
                <Button type="submit">Crear archivo</Button>
            </Form>
        </div>
    )
}