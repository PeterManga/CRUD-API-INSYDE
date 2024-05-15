import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddPlaylistFiles, DeleteFilePlaylist, GetPlaylistByID } from "../../../services/apiCalls";
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


  useEffect(() => {
    if ((loading && playlistDetaill.length == 0) || (loading)) {
      setLoading(false)
      GetPlaylistByID(id)
        .then((result) => {
          setPlayListDetaill(result);
          console.log(playlistDetaill)
        })
        .catch((error) => console.log("error fetching data:", error)),
        fetchFiles()
          .then(result => {
            setFiles(result);
            // console.log(files)
          })
    }

  }, [playlistDetaill, loading])


  const handleAddPlaylist = async (id, fileId, fileName, duracion, playlistName) => {
    const result = await AddPlaylistFiles(id, fileId, fileName, duracion, playlistName)
    if (result) {
      // La eliminación fue exitosa, recargar la lista de archivos
      setLoading(true);
    }
  }

  //Manejo del drag and drop
  //Comienzo del drag and drop
  const handleDragStar = (e, index) =>{
    e.dataTransfer.setData('index', index.toString())
  }
  //Finalizacion del drag and drop
  const handlerDragOVer = (e) => {
    e.preventDefault();
  }

 const handleDrop = (e) =>{
    const dropIndex = e.target.getAttribute('data-index');
    const dragIndex = e.dataTransfer.getData('index');
    
    // Los archivos reordenados serán una copia de los archivos de la playlist
    const reOrderedArchivos= [...playlistDetaill.archivos];
    const draggedItem = reOrderedArchivos[dragIndex]

    reOrderedArchivos.splice(dragIndex, 1);
    reOrderedArchivos.splice(dropIndex, 0, draggedItem)

    //reasignamos el array de archivos odenados a los datos de la playlist
    setPlayListDetaill({
      ...playlistDetaill,
      archivos: reOrderedArchivos
    })
  }

  //Manejo eliminacion de file.playlist
  const handleDeleteplaylist = async (index, fileID)=>{
    let playlistID = id
    let deletedArchivo = [...playlistDetaill.archivos]
    deletedArchivo.splice(index, 1)
    const result = await DeleteFilePlaylist(deletedArchivo, playlistID, fileID)
    if (result) {
        // La eliminación fue exitosa, recargar la lista de archivos
        setLoading(true);
    }
    
    // setPlayListDetaill({
    //   ...playlistDetaill,
    //   archivos: deleteArchivo
    // })
      
}
  //Renderizado condicional
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
              <p className="text-white text-uppercase h3">duración: {playlistDetaill.duracion} seg. </p>

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
                  <thead className="text-center border-jkdark ">
                    <tr>
                      <th>Orden</th>
                      <th colSpan={2}>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlistDetaill.archivos.map((file, index) => (
                      <tr className="align-middle text-center" key={file._id} draggable onDragStart={(e)=>handleDragStar(e,index)} onDragOver={handlerDragOVer} onDrop={handleDrop}>
                        <td name="index">{index + 1}</td>
                        <td name="nombre">{file.fileName}</td>
                        <td className="w-10"><Button variant="danger" onClick={() => handleDeleteplaylist( index, file.archivoId)} name="delete">x</Button></td>
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