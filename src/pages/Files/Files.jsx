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
    const [sortByName, setSortByname] = useState(false)
    //Manejar el click en el botón crear archivo usando navidate evita que se recargue toda la aplicacion
    const handleNavigation = UseNavigation();

    const handleDeleteFile = (fileID) => {
       const filteredFiles = files.filter((file) =>file._id != fileID)
       setFiles (filteredFiles)
    }
    
    //Manejar ordenar por nombre
    const toggleSortByName =() =>{
        setSortByname(prevState => !prevState)
    }
    //Este método nos permite ordenar el array original sin alterarlo, nos devuelve otro array
    const sortedFiles = sortByName 
    ?files.toSorted((a,b)=>{
        return a.nombre.localeCompare(b.nombre)
    }) 
    : files

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
                        <Table className="table-bordered table-hover" responsive >
                        <thead className="text-center border-dark ">
                            <tr>
                                <th>#</th>
                                <th>Miniatura</th>
                                <th onClick={toggleSortByName}>{sortByName? 'Nombre ⬇':'Nombre'}</th>
                                <th>Fecha Creacion</th>
                                <th>Duracion</th>
                                <th>Playlists</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFiles.map((file, index) => (
                                <tr className="align-middle" key={file._id}>
                                    <td >{index + 1}</td>
                                    <td><img src={file.datos.url.replace('.mp4', '.jpg')} alt="imagen" className="img-fluid img-thumbnail bg-dark" /></td>
                                    <td>{new Date(file.createdAt).toLocaleDateString("es-es")}</td>
                                    <td>{file.nombre}</td>
                                    <td>{file.datos.duracion}</td>
                                    {/* Muestra todas el nombre de las playlist a las que pertenece el archivo si este campo tiene una logitud superior a 0 */}
                                    <td className="text">{file.playlist.length === 0 ? 'ninguna' : file.playlist.map(playlist => playlist.playlistName).join(', ')}</td>
                                    <td>
                                        <Button variant="info" className="mb-2" onClick={() => handleNavigation(`/files/${file._id}`)}>Ver ficha</Button>
                                        <Button variant="danger" onClick={() => handleDeleteFile(file._id)}>Eliminar</Button>
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

