import axios from 'axios'
/**
 * Obtiene la URL de la imagen del ingrediente proporcionado.
 * @returns {Promise} Promise que se resuelve con la URL de la imagen.
 */
const urlBase = 'http://localhost:3000'
export const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/files');
    console.log(JSON.stringify(response.data));
    return response.data; // Devuelve los datos para su uso en React
  } catch (error) {
    console.log(error);
    throw error; // Maneja el error o lanza una excepción para que lo maneje el componente que llama a fetchFiles
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
    console.log(JSON.stringify(response.data))
    return response.data;
  } catch (error) {

  }
}

export const CreateFile = async (ClientformData) => {
  try {
    // Se crea un objeto FormData que enviaremos al servidor
    console.log(ClientformData)
    const response = await axios.postForm(`${urlBase}/file`, {
      nombre: ClientformData.nombre,
      ubicacion: ClientformData.ubicacion,
      descripcion: ClientformData.descripcion,
      archivo: ClientformData.archivo
    }, {
      headers: {
        'Content-Type': 'multipart/form-data' // Es importante establecer el tipo de contenido como 'multipart/form-data' para enviar archivos
      }
    })
    console.log(response)
    return response

  } catch (error) {
    console.error(error)
  }
}