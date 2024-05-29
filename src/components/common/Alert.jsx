import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export function ShowAlert(message, icon) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: message,
        icon: icon
    });
}

// Esta alerta nos permite manejar la eliminación de archivos
export async function showDeleteAlert(funcion) {
    const MySwal = withReactContent(Swal)
    return MySwal.fire({
        title: "¿Estás seguro?",
        text: "No será posible revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar"
    }).then((result) => {
        if (result.isConfirmed) {
            return funcion()
                .then(() => {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El archivo ha sido eliminado.",
                        icon: "success"
                    });
                    return true; // Indica que la eliminación fue exitosa
                })
                .catch(error => {
                    console.error("Error deleting file:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "No se pudo eliminar el archivo.",
                        icon: "error"
                    });
                    return false; // Indica que la eliminación falló
                });
        } else {
            return false; // El usuario canceló la eliminación
        }
    });
}