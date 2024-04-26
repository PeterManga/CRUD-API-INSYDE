import { useEffect, useState } from "react";
import { fetchData } from '../services/apiCalls'
// import { useParams } from 'react-router-dom'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";


const FilesPage = () => {

    const [loading, setLoading] = useState(false);
    const [criteria, setCriteria] = useState("")
    const [files, setFiles] = useState([])

    // Si la lista de de archivos está vacia llamamos a  esta función para obtener todos los archivos
    useEffect(() => {
        if (files.length == 0 && !loading) {
            fetchData()
                .then(result => {
                    //crear una lista con todos los archivos
                    setFiles(result)
                })
                // .catch(console.error( error))
                .finally(() => setLoading(false));
        }
    }, [files, loading])

    return (
        <div>
            {loading && <div>Cargando...</div>}

            {!loading && files.length === 0 && (
                <div>No se encontraron resultados de la búsqueda.</div>
            )}
            {files.length > 0 && (
                <Table responsive>
                    <thead>
                        <th>Nombre</th>
                        <th>Ubicacion</th>
                        <th>Duracion</th>
                        <th rowSpan={2}>Actions</th>
                    </thead>
                    <tbody>
                    {files.map(file => (
                            <tr key={file._id} >
                                <td>{file.nombre}</td>
                                <td>{file.ubicacion}</td>
                                <td>{file.datos.duracion}</td>
                                <Button className="--bs-primary">Ver ficha</Button>
                                <Button variant="danger">Eliminar</Button>

                            </tr>
                        ))}
                    </tbody>
                </Table>

            )}
        </div>
    )
}

export default FilesPage