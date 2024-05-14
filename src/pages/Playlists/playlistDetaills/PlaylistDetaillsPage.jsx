import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddPlaylistFiles, GetPlaylistByID } from "../../../services/apiCalls";
import { fetchFiles } from "../../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import './PlaylistDetaillsPage.css'


export const PlaylistDetaillsPage = () => {
  // Obtener el parámetro 'id' de los parámetros de la URL usando useParams
  const { id } = useParams();

  //Hook para almacenar la información de la playlist seleccionada
  const [playlistDetaill, setPlayListDetaill] = useState([])
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const handleAddPlaylist = async (id, fileId, fileName, duracion, playlistName)=>{
    const result = await AddPlaylistFiles(id, fileId, fileName, duracion, playlistName)
    if (result) {
        // La eliminación fue exitosa, recargar la lista de archivos
        //setLoading(true);
    }
}
  useEffect(() => {
    if (loading && playlistDetaill.length == 0) {
      setLoading(false)
      GetPlaylistByID(id)
        .then((result) => {
          setPlayListDetaill(result);
        })
        .catch((error) => console.log("error fetching data:", error)),
        fetchFiles()
          .then(result => {
            setFiles(result);
            console.log(files)
          })
    }
  }, [playlistDetaill, loading])


  return (
    <div className="container-fluid">
      {loading && <div>cargando..</div>}
      {!loading && !playlistDetaill._id && (
        <div>No se encontrar resultados en la búsqueda</div>
      )}
      {
        playlistDetaill._id && (
          <div className='w-95 p-3 container bordered  shadow '>
            <div className='w-85 p-4 container text-bg-info cookieCard shadow-lg p-3 mb-5 bg-white rounded d-flex  justify-content-around sticky-top'>
              <p className="text-white text-uppercase h3">Nombre: {playlistDetaill.nombre}</p>
              <p className="text-white text-uppercase h3">duracion: {playlistDetaill.duracion} segundos </p>
             
            </div>
            {/* Si la playlist no tiene archivos, se mostrará el siguiente mensaje */}
            {playlistDetaill.archivos.length == 0 &&
              <div>
                No hay archivos
              </div>
            }
            {playlistDetaill.archivos.length >= 1 &&
              <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <Table className="table-bordered table-hover" responsive>
                  <thead className="text-center border-dark ">
                    <tr>
                      <th>Orden</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlistDetaill.archivos.map((file, index) => (
                      <tr className="align-middle text-center" key={file._id}>
                        <td name="index">{index + 1}</td>
                        <td name="nombre">{file.fileName}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            }
            {files.length > 0 && (
              <div className="col-12 col-lg-8 offset-0 offset-lg-2 shadow-lg p-5 bg-white rounded">
                <Table className="table-bordered table-hover" responsive >
                  <thead className="text-center border-dark ">
                    <tr>
                      <th>Miniatura</th>
                      <th>Nombre</th>
                      <th>Duración</th>
                      <th>añadir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr className="align-middle text-center" key={file._id}>
                        <td name="imagen"><img src={file.datos.url.replace('.mp4', '.jpg')} alt="imagen" className="img-fluname img-thumbnail bg-dark" /></td>
                        <td name="nombre">{file.nombre}</td>
                        <td name='duracion'>{file.datos.duracion.toFixed(2) + ' s'}</td>
                        {/* Muestra todas el nombre de las playlist a las que pertenece el archivo si este campo tiene una logitud superior a 0 */}
                        <td>
                          <Button variant="success" className="mb-2" name="addPlaylist" onClick={() => handleAddPlaylist(id, file._id, file.nombre, file.datos.duracion, playlistDetaill.nombre)}>+</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )
      }
    </div>
  )
}