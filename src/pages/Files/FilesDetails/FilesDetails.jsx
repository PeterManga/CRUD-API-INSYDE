import { useParams } from 'react-router-dom'
import { GetFileById } from '../../../services/apiCalls'
import { useEffect, useState } from 'react'


export const FileDetailsPage = () => {

    // Obtener el parámetro 'id' de los parámetros de la URL usando useParams
    const { id } = useParams();

    //Hook para almacenar la información del archivo selecionado
    const [fileDetails, setFileDetails] = useState([]);
    const [loading, setLoading] = useState(false);


    //Este hook nos permite obtener la información del archivo cuando el componente se monta o el 'id' cambia
    useEffect(() => {
        if (!loading && fileDetails.length == 0) {
            setLoading(true);
            GetFileById(id)
                .then((resullt) => {
                    console.log(resullt);
                    setFileDetails(resullt);
                    console.log(fileDetails.length)
                })
                .catch((error) => console.error("error fetching data:", error))
                .finally(() => setLoading(false));
        }
    }, [id, loading]);
   
    return (
        <div>
            {loading && <div>cargando...</div>}
            {!loading && !fileDetails.nombre && (
                <div>No se encontrar resultados en la búsqueda</div>
            )}
            {fileDetails.nombre && (
                <div>
                    <p>{fileDetails.nombre}</p>
                </div>
            )}
        </div>

    )
}