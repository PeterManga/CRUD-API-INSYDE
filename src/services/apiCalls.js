import axios from 'axios'
/**
 * Obtiene la URL de la imagen del ingrediente proporcionado.
 * @returns {Promise} Promise que se resuelve con la URL de la imagen.
 */
const urlBase = 'http://localhost:3000'
export const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/files');
    //console.log(JSON.stringify(response.data));
    return response.data; // Devuelve los datos para su uso en React
  } catch (error) {
    console.log(error);
    throw error; // Maneja el error o lanza una excepción para que lo maneje el componente que llama a fetchFiles
  }
}

export const fetchPlaylists = async () => {
  try {
    const response = await axios.get('http://localhost:3000/playlists');
    return response.data; // Devuelve los datos para su uso en React
  } catch (error) {
    console.log(error);
    throw error; // Maneja el error o lanza una excepción
  }
}
/**
* Realiza una solicitud para obtener los detalles de un archivo por su ID.
* @param {string} id - ID del archivo para la cual se solicitan los detalles.
* @returns {Promise} Promise que se resuelve con los datos de la respuesta.
*/
export const GetFileById = async (id) => {
  try {
    const response = await axios.get(`${urlBase}/file/${id}`)
    //console.log(JSON.stringify(response.data))
    return response.data;
  } catch (error) {

  }
}


export const CreateFile = async (ClientformData) => {
  try {
    // Creamos un objeto FormData
    const formData = new FormData();
    formData.append('nombre', ClientformData.nombre);
    formData.append('ubicacion', ClientformData.ubicacion);
    formData.append('descripcion', ClientformData.descripcion);
    formData.append('archivo', ClientformData.archivo);
    formData.append('playlists', ClientformData.playlists);

    // Enviamos la solicitud utilizando axios.post con el objeto FormData
    const response = await axios.post(`${urlBase}/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Es importante establecer el tipo de contenido como 'multipart/form-data' para enviar archivos
      }
    });
    return response;

  } catch (error) {
    console.error(error);
  }
};

export const DeleteFileById = async (id) => {
  try {
    const response = await axios.delete(`${urlBase}/file/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const DeletePlaylistById = async (id) => {
  try {
    const response = await axios.delete(`${urlBase}/playlist/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const UpdatePlaylist = async (id, ClientformData, changes) => {
  try {
    // Creamos un objeto FormData
    const formData = new FormData();
    formData.append('nombre', ClientformData.nombre);
    formData.append('ubicacion', ClientformData.ubicacion);
    formData.append('descripcion', ClientformData.descripcion);
    formData.append('playlists', ClientformData.playlists);
    if (changes) {
      formData.append('duracion', ClientformData.datos.duracion);
      formData.append('operacion', changes)
    }

    console.log(changes)
    const response = await axios.put(`${urlBase}/file/${id}`, formData)
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const DeleteFilePlaylist = async (id, playlistId) => {
  try {
    const formData = new FormData();
    formData.append('playlist', playlistId);
    const response = await axios.put(`${urlBase}/filedetaills/${id}`, formData)
    return response
  } catch (error) {
    console.error(error);
  }

} 
export const CreatePlaylist = async (ClientformData) => {
  try {
    const formData = new FormData();
    formData.append('nombre', ClientformData.nombre);
    formData.append('descripcion', ClientformData.descripcion);
    const response = await axios.post(`${urlBase}/playlist/`, formData)
    return response
  } catch (error) {
    console.error(error);
  }

}
