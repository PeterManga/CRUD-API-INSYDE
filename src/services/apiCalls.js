import axios from 'axios'
/**
 * Obtiene la URL de la imagen del ingrediente proporcionado.
 * @returns {Promise} Promise que se resuelve con la URL de la imagen.
 */
const urlBase = 'http://localhost:3000'
export const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/files');
      console.log(JSON.stringify(response.data));
      return response.data; // Devuelve los datos para su uso en React
    } catch (error) {
      console.log(error);
      throw error; // Maneja el error o lanza una excepción para que lo maneje el componente que llama a fetchData
    }
  }
