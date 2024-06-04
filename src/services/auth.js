import axios from 'axios'
/**
 * Obtiene todos los archivos de la base de datos
 * @returns {Promise} Promise que se resuelve con la URL de la imagen.
 */
const urlBase = 'https://api-insyde.vercel.app/'
export const loginRequest = async (user) => axios.post(`${urlBase}/login`, user, {
            withCredentials: true // Permite el envío de cookies en la solicitud
        });
export const verifyToken = async () => {
    try {
      const response = await axios.get(`${urlBase}/verify`);
      return response.data; // Devuelve los datos para su uso en React
    } catch (error) {
      console.log(error);
      throw error; // Maneja el error o lanza una excepción para que lo maneje el componente que llama a fetchFiles
    }
  }
  
