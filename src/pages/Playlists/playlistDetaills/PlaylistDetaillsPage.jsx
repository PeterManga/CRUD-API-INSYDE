import { useParams } from "react-router-dom";

export const PlaylistDetaillsPage = () => {
      // Obtener el parámetro 'id' de los parámetros de la URL usando useParams
      const { id } = useParams();
    return (
      <h1>Bienvenido a {id}</h1>
    )
}