import React, { useEffect, useState } from "react";
import { fetchFiles } from '../../services/apiCalls';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { DeleteFileById } from "../../services/apiCalls";
//import './Files.css'
import { ShowAlert, showDeleteAlert } from "../../components/common/Alert";
import { UseNavigation } from "../../utils/NavigationUtil";

export const FilesPage = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    // const [deleteFile, setDeleteFile] = useState([])
    const [sortByName, setSortByname] = useState(false)
    //Manejar el click en el botón crear archivo usando navidate evita que se recargue toda la aplicacion
    const handleNavigation = UseNavigation();

    //Este handle nos permite eliminar un archivo 
    const handleDeleteFile = async (fileID) => {
        const result = await showDeleteAlert(DeleteFileById(fileID));
        if (result) {
            // La eliminación fue exitosa, recargar la lista de archivos
            setLoading(true);
        }
    }
    
    // Este método nos servirá para poder borrar múltiples archivos y luego guardar los cambios
    // const handleDeleteFilefromList = (fileID) => {
    //     const filteredFiles = files.filter((file) =>file._id != fileID)
    //     setFiles (filteredFiles)
    //  }
     
    
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
        if ((!loading && files.length === 0)||(loading==true)) {
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
                                    <td name="index">{index + 1}</td>
                                    <td name="imagen"><img src={file.datos.url.replace('.mp4', '.jpg')} alt="imagen" className="img-fluname img-thumbnail bg-dark" /></td>
                                    <td name="nombre">{file.nombre}</td>
                                    <td name="fecha">{new Date(file.createdAt).toLocaleDateString("es-es")}</td>
                                    <td name='duracion'>{file.datos.duracion}</td>
                                    {/* Muestra todas el nombre de las playlist a las que pertenece el archivo si este campo tiene una logitud superior a 0 */}
                                    <td name="playList" className="text">{file.playlist.length === 0 ? 'ninguna' : file.playlist.map(playlist => playlist.playlistName).join(', ')}</td>
                                    <td>
                                        <Button variant="info" className="mb-2" onClick={() => handleNavigation(`/files/${file._id}`)} name="verFicha">Ver ficha</Button>
                                        <Button variant="danger" onClick={() => handleDeleteFile(file._id)} name="delete">Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                )}
            </div>
            <div className="modal fade" arial-hidden='true'>
                <p>Hola</p>
            </div>
        </div>

    );
}

