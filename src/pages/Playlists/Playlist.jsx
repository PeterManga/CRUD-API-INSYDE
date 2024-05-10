import React, { useEffect, useState } from "react";
import { DeletePlaylistById, fetchPlaylists } from "../../services/apiCalls";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UseNavigation } from "../../utils/NavigationUtil";
import { showDeleteAlert } from "../../components/common/Alert";

export const PlaylistPage = () =>{

    //hooks de estado
    const [loading, setLoading] = useState(false);
    const [playlists, setplaylists] = useState([]);

    const handleNavigation = UseNavigation();
    const handleDeleteplaylist = async (playlistId) =>{
        const result = await showDeleteAlert(()=> DeletePlaylistById(playlistId))
        if (result){
            setLoading(true)
        }
    }

    //hook ussEffect
    useEffect(() => {
        if ((!loading && playlists.length === 0)||(loading==true)) {
            setLoading(true);
            fetchPlaylists()
                .then(result => {
                    setplaylists(result);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(false));
        }        
        
    }, [playlists, loading]);


    return(
        <div className="container-fluid">
            <div>
                <div className="row mt-4 mb-4 sticky-top">
                    <div className=" col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <Button variant="success" onClick={() => handleNavigation('/addplaylist')}>Crear Playlist   </Button>
                        </div>
                    </div>
                </div>
                {loading && <div>Cargando...</div>}
                {!loading && playlists.length === 0 && (
                    <div>No se encontraron resultados de la búsqueda.</div>
                )}
                {playlists.length > 0 && (
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <Table className="table-bordered table-hover" responsive >
                        <thead className="text-center border-dark ">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Duración</th>
                                <th>Fecha creacion</th>
                                <th>Nº Archivos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlists.map((playlist, index) => (
                                <tr className="align-middle text-center" key={playlist._id}>
                                    <td name="index">{index + 1}</td>
                                    <td name="nombre">{playlist.nombre}</td>
                                    <td name="duracion">{playlist.duracion.toFixed(2)+' s'}</td>
                                    <td name="fecha">{new Date(playlist.createdAt).toLocaleDateString("es-es")}</td>
                                    <td name="archivos">{playlist.archivos.length === 0 ? ' 0' : playlist.archivos.length}</td>
                                    <td className="d-grid">
                                        <Button variant="info"  onClick={() => handleNavigation(`/playlist/${playlist._id}`)} name="verPlaylist">Administrar playlist</Button>
                                        <Button variant="danger" className="m-1" onClick={() => handleDeleteplaylist(playlist._id)} name="delete">Eliminar</Button>
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
    )
}