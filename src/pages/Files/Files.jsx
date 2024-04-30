import React, { useEffect, useState } from "react";
import { fetchFiles } from '../../services/apiCalls';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import './Files.css'
import {  useNavigate } from "react-router-dom";
import { UseNavigation } from "../../utils/NavigationUtil";

export const FilesPage = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    //Manejar el click en el botón crear archivo usando navidate evita que se recargue toda la aplicacion
    const handleNavigation = UseNavigation();

    useEffect(() => {
        if (!loading && files.length === 0) {
            setLoading(true);
            fetchFiles()
                .then(result => {
                    setFiles(result);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(false));
        }
    }, [files, loading]);

    return (
        <div>
            <Button variant="success" onClick={()=>handleNavigation('/addfile')}>Añadir Archvio</Button>
            {loading && <div>Cargando...</div>}
            {!loading && files.length === 0 && (
                <div>No se encontraron resultados de la búsqueda.</div>
            )}
            {files.length > 0 && (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Miniatura</th>
                            <th>Nombre</th>
                            <th>Ubicacion</th>
                            <th>Duracion</th>
                            <th>Playlists</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map(file => (
                            <tr key={file._id}>
                                <td><img src={file.datos.url.replace('.mp4','.jpg')} alt="imagen" /></td>
                                <td>{file.nombre}</td>
                                <td>{file.ubicacion}</td>
                                <td>{file.datos.duracion}</td>
                                <td>{file.playlist.length === 0 ? 'ninguna' : file.playlist}</td>
                                <td>
                                    <Button variant="info" onClick={()=>handleNavigation(`/files/${file._id}`)}>Ver ficha</Button>
                                    <Button variant="danger">Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

