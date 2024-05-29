import React, { useEffect, useState } from "react";
import { fetchFiles } from '../../services/apiCalls';
import Button from "react-bootstrap/Button";
import { UseNavigation } from "../../utils/NavigationUtil";
import ReactTable from "./table/Table";

export const FilesPage = () => {
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const handleNavigation = UseNavigation();

    const fetchData = async () => {
        try {
            const data = await fetchFiles();
            setFiles(data);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className="container-fluid  ">
            <div>
                <div className="row mt-4 mb-4 sticky-top">
                    <div className=" col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <Button variant="success" onClick={() => handleNavigation('/addfile')}>Añadir Archivo</Button>
                        </div>
                    </div>
                </div>
                {loading && <div>Cargando...</div>}
                {!loading && files.length === 0 && (
                    <div>No se encontraron resultados de la búsqueda.</div>
                )}
                {files.length > 0 && (
                    <div className="row shadow-lg bg-red rounded  d-flex align-content-center justify-content-center">
                        {/* Enviamos a la tabla los datos obtenidos de la api */}
                        <ReactTable data={files} fetchData={fetchData} />
                    </div>
                )}
            </div>
        </div>
    );
}
