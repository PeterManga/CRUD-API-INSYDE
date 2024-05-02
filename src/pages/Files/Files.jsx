import React, { useEffect, useState } from "react";
import { fetchFiles } from '../../services/apiCalls';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//import './Files.css'
import { UseNavigation } from "../../utils/NavigationUtil";

export const FilesPage = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [deleteFile, setDeleteFile] = useState([])

    //Manejar el click en el botón crear archivo usando navidate evita que se recargue toda la aplicacion
    const handleNavigation = UseNavigation();

    const handleDeleteFile = (fileID, fetchIndex) => {
        setDeleteFile([...deleteFile, fileID])
        console.log(fetchIndex)
        setFiles(files.slice(0, fetchIndex))
    }

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

        console.log(deleteFile)
    }, [files, loading, deleteFile]);

    return (
        <div className="container-fluid">
            <div>
                <div className="row mt-4 mb-4 sticky-top">
                    <div className=" col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <Button variant="success" onClick={() => handleNavigation('/addfile')}>Añadir Archvio</Button>
                        </div>
                    </div>
                </div>
                {loading && <div>Cargando...</div>}
                {!loading && files.length === 0 && (
                    <div>No se encontraron resultados de la búsqueda.</div>
                )}
                {files.length > 0 && (
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <Table className="table-bordered" responsive >
                        <thead className="text-center">
                            <tr>
                                <th>#</th>
                                <th>Miniatura</th>
                                <th>Nombre</th>
                                <th>Ubicacion</th>
                                <th>Duracion</th>
                                <th>Playlists</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr className="align-middle" key={file._id}>
                                    <td >{index + 1}</td>
                                    <td><img src={file.datos.url.replace('.mp4', '.jpg')} alt="imagen" className="img-fluid img-thumbnail bg-dark" /></td>
                                    <td>{file.nombre}</td>
                                    <td>{file.ubicacion}</td>
                                    <td>{file.datos.duracion}</td>
                                    <td className="text">{file.playlist.length === 0 ? 'ninguna' : file.playlist}</td>
                                    <td>
                                        <Button variant="info" className="mb-2" onClick={() => handleNavigation(`/files/${file._id}`)}>Ver ficha</Button>
                                        <Button variant="danger" onClick={() => handleDeleteFile(file._id, index)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                )}
            </div>
            <div className="modal fade">
                <p>Hola</p>
            </div>
        </div>

    );
}

