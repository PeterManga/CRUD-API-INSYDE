import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPlaylistByID } from "../../../services/apiCalls";
import { fetchFiles } from "../../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import './PlaylistDetaillsPage.css'


export const PlaylistDetaillsPage = () => {
  // Obtener el parámetro 'id' de los parámetros de la URL usando useParams
  const { id } = useParams();

  //Hook para almacenar la información de la playlist seleccionada
  const [playlistDetaill, setPlayListDetaill] = useState([])
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  //Manejadores del modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <div className='w-95 p-3 container bordered  shadow'>
            <div className='w-85 p-4 container text-bg-info cookieCard shadow-lg p-3 mb-5 bg-white rounded d-flex  justify-content-around'>
              <p className="text-white text-uppercase h3">Nombre: {playlistDetaill.nombre}</p>
              <p className="text-white text-uppercase h3">duracion: {playlistDetaill.duracion} segundos </p>
              {/* <div className="d-block" >
                <p>{playlistDetaill.descripcion}</p>
              </div> */}
            </div>
            <div className="row mt-4 mb-4 sticky-top">
              <div className=" col-md-4 offset-md-4">
                <div className="d-grid mx-auto">
                  <Button variant="success" onClick={handleShow} >Añadir Archvio</Button>
                </div>
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir Archivo</Modal.Title>
              </Modal.Header>
              <Modal.Body>Selecciona un archivo para que sea añadido a la playlist!</Modal.Body>
              <select name="" id=""></select>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Guardar Cambios
                </Button>
              </Modal.Footer>
            </Modal>
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
                      <th>#</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playlistDetaill.archivos.map((file, index) => (
                      <tr className="align-middle text-center" key={file._id}>
                        <td name="index">{index + 1}</td>
                        <td name="nombre">{file.nombre}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            }
          </div>
        )
      }
    </div>
  )
}