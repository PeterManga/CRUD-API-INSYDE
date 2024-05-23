import { useState } from "react";
import { getPlayers } from "../../services/apiCalls";
import { UseNavigation } from "../../utils/NavigationUtil";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
export const PlayerPage = () => {
    //hooks de estado
    const [loading, setLoading] = useState(false);
    const [player, setPlayer] = useState([])

    const handleNavigation = UseNavigation();

    //hook ussEffect
    useEffect(() => {
        console.log(player)
        if ((!loading && player.length === 0) || (loading == true)) {
            getPlayers()
                .then(result => {
                    setPlayer(result);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(false));
        }
        console.log(player)

    }, [loading, player]);

    return (
        <div className="container-fluid">
            {loading && <div>Cargando...</div>}
            {loading && player.length === 0 && (
                <div>No se encontraron resultados de la búsqueda.</div>
            )}
            {player.length>0&&(
                <div className="col-12 col-lg-8 offset-0 offset-lg-2 shadow-lg p-3 mb-5 bg-white rounde">
                    <Table className="table-bordered table-hover" responsive >
                        <thead className="text-center border-dark ">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>altura</th>
                                <th>Anchura</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {player.map((player, index)=>(
                                <tr className="align-middle text-center" key={player._id}>
                                    <td name="index">{index+1}</td>
                                    <td name="nombre">{player.nombre}</td>
                                    <td name="altura">{player.altura}</td>
                                    <td name="anchura">{player.anchura}</td>
                                    <td className="d-grid">
                                        <Button variant="info" name="verPlaylist">Administrar player</Button>
                                        <Button variant="success" className="m-1" name="calendario" onClick={() => handleNavigation(`/calendar/${player._id}`)}>Calendario</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}