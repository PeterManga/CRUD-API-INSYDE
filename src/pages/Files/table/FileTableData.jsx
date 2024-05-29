import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
// import { useMemo, useState } from "react";
// import { } from "bootstrap-icons"
import { fetchFiles } from "../../../services/apiCalls";

const DISPLAY_COLUMN_SIZE = 20;


export const FileTableData = () => {

    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([])
    const colums = useMemo(() => [
        {
            Header: "Nombre",
            accesor: "nombre"
        }
    ], [])

    useEffect(() => {
        if ((!loading && data.length === 0) || (loading == false)) {
            fetchFiles()
                .then(result => {
                    setdata(result);
                    console.log(data)
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(true));
        }
        c
    }, [data, loading]);
    


    return ({colums, data})
}