import React from "react"
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import { ShowAlert } from "../../../components/common/Alert";
import { CreatePlaylist } from "../../../services/apiCalls";

export const AddPlaylist = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        //Envia los dato del formulario al CreateFile
        CreatePlaylist(formData)
            .then((response) => {
                ShowAlert('Playlist creada', 'success');
                console.log(response)
                //limpia el formulario
                setFormData({
                    nombre: '',
                    descripcion: ''
                });

            })
            .catch((error) => {
                ShowAlert('error en la solicitud', 'error')
                console.error("Error añadir el archivo", error)
            });
    };
    return (
        <div className="container-fluid ">
            <div className="mt-5">
                <Form className="w-75 p-3 container shadow-lg p-3 mb-5 bg-white rounded"  onSubmit={handleSubmit}>
                    <legend className="text-center pb-5 text-decoration-underline text-uppercase">formulario para la creacion de playlist</legend>
                    <fieldset className="border border-success border-5 p-5 ">
                    <Form.Group className='mb-3' controlId='nombre'>
                        <Form.Label className="nombre">Nombre de la Playlist</Form.Label>
                        <Form.Control type='text' name='nombre' required value={formData.nombre} onChange={handleChange} ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='descripcion'>
                        <Form.Label>Descripcion de la Playlist</Form.Label>
                        <Form.Control type='text' name='descripcion' value={formData.descripcion} onChange={handleChange} ></Form.Control>
                    </Form.Group>
                    <div className='row mt-5 '>
                        <Button type="submit" className='text-uppercase btn-success' id='CreateFile'>Crear Playlist</Button>
                    </div>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}