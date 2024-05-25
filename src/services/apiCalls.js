import axios from 'axios'
/**
 * Obtiene todos los archivos de la base de datos
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

// Muestra todas las playlist disponibles
export const fetchPlaylists = async () => {
  try {
    const response = await axios.get(`${urlBase}/playlists`);
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

// Esta función nos permite crear un nuevo archivo y sumbir su contenido multimedia a la nube
export const CreateFile = async (ClientformData) => {
  try {
    // Creamos un objeto FormData
    const formData = new FormData();
    formData.append('nombre', ClientformData.nombre);
    formData.append('ubicacion', ClientformData.ubicacion);
    formData.append('descripcion', ClientformData.descripcion);
    formData.append('archivo', ClientformData.archivo);


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

// Esta función nos permite borrar un archivo mediante su identificador
export const DeleteFileById = async (id) => {
  try {
    const response = await axios.delete(`${urlBase}/file/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//Funcion para obtener todos los players
export const getPlayers = async () => {
  try {
    const response = await axios.get(`${urlBase}/players`)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Maneja el error o lanza una excepción
  }
}
// Esta función nos permite crear eventos
export const createEvent = async (playerId, newEvent) => {
  try {
    const formData = new FormData();
    formData.append('nombre', newEvent.title);
    formData.append('descripcion', newEvent.descripcion);
    formData.append('fechainicio', newEvent.dateStart);
    formData.append('fechafin', newEvent.dateEnd);
    formData.append('playlist', newEvent.playlist);
    formData.append('player', playerId)
    console.log(newEvent)
    const response = await axios.post(`${urlBase}/calendar/`, formData)
    return response
  } catch (error) {
    console.error(error);
  }

}

// Esta función nos permite actualizar los datos de un evento
export const updateEvent = async (eventoID, newEvent) => {
  try {
    const formData = new FormData();
    formData.append('nombre', newEvent.title);
    formData.append('descripcion', newEvent.descripcion);
    formData.append('fechainicio', newEvent.dateStart);
    formData.append('fechafin', newEvent.dateEnd);
    formData.append('playlist', newEvent.playlist);
    formData.append('player', playerId)
    const response = await axios.put(`${urlBase}/calendar/${eventoID}`, formData)
    return response
  } catch (error) {
    console.error(error);
  }

}

// Esta función nos permite borrar un evento del calendario mediante su identificador
export const DeleteCalendar = async (id) => {
  try {
    const response = await axios.delete(`${urlBase}/calendar/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getCalendars = async (id) => {
  try {
    const formData = new FormData();
    formData.append('player', id);
    const response = await axios.get(`${urlBase}/calendarplayer`, {
      params: {
        player: id
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Maneja el error o lanza una excepción
  }
}

// Esta función nos permite borrar una playlist mediante su identificador
export const DeletePlaylistById = async (id) => {
  try {
    const response = await axios.delete(`${urlBase}/playlist/${id}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Esta funcion nos permite modificar los datos de un archivo desde el f
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
//Esta es la funcion nos permite borrar una playlist del array playlist del archivo
export const DeleteFilePlaylist = async (deletedArchivo, playlistID, fileID) => {
  try {
    console.log(deletedArchivo.length)
    console.log(deletedArchivo)
    const formData = new FormData();
    formData.append('fileid', fileID)
    // Iterar sobre cada objeto en deletedArchivo y agregarlo como una cadena JSON en FormData
    if (deletedArchivo.length > 1) {
      deletedArchivo.forEach(obj => {
        formData.append('archivos', JSON.stringify(obj));
      });
    } else {
      formData.append('archivos', JSON.stringify(deletedArchivo))
    }
    const response = await axios.put(`${urlBase}/playlistdetails/${playlistID}/deleteFile`, formData)
    return response
  } catch (error) {
    console.error(error);
  }

}

//Esta es la funcion nos permite AÑADIR una playlist del array playlist del archivo
export const AddPlaylistFiles = async (id, fileId, fileName, duracion, playlistName) => {
  try {
    const formData = new FormData();
    formData.append('fileID', fileId);
    formData.append('filename', fileName);
    formData.append('duracion', duracion);
    formData.append('playlistname', playlistName)
    const response = await axios.put(`${urlBase}/playlistdetails/${id}/addFile`, formData)
    return response
  } catch (error) {
    console.error(error);
  }

}



// Esta función nos permite crear una nueva playlist
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

/**
* Realiza una solicitud para obtener los detalles de un archivo por su ID.
* @param {string} id - ID del archivo para la cual se solicitan los detalles.
* @returns {Promise} Promise que se resuelve con los datos de la respuesta.
*/
export const GetPlaylistByID = async (id) => {
  try {
    const response = await axios.get(`${urlBase}/playlist/${id}`)
    // console.log(JSON.stringify(response.data))
    return response.data;
  } catch (error) {

  }
}
