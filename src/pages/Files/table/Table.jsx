import React, { useState, useEffect } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { FormCheck } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import "./table.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { DeleteFileById } from '../../../services/apiCalls';
import TableHeader from './TableHeader';
import { FuzzyFilter } from './Table.utils';
import PaginationTable from './Pagination';
import { showDeleteAlert } from '../../../components/common/Alert';
import { UseNavigation } from '../../../utils/NavigationUtil';
//Recibimos el fetch de datos con la props data
export default function ReactTable({ data, fetchData }) {



    const handleDeleteFile = async (fileID) => {
        const result = await showDeleteAlert(() => DeleteFileById(fileID));
        if (result){
            fetchData()
        }

    };
    const handleDeleteSelectedFiles = async () => {
        const selectedIds = table.getSelectedRowModel().flatRows.map(row => row.original._id);
        console.log(selectedIds)
        const result = await showDeleteAlert(async () => {
            const deletePromises = selectedIds.map(id => DeleteFileById(id));
            await Promise.all(deletePromises);
        });
        if (result) {
            fetchData(); // Llama a fetchData para recargar los datos después de eliminar todos los archivos seleccionados
        }
    };
    const handleNavigation = UseNavigation();


    //creamos las cabeceras
    const columns = React.useMemo(() => [
        {
            id: 'selection',
            header: ({ table }) => (
                <FormCheck
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    //Se marcará en la cabecera un signo '-' si hay una fila de la tabla seleccionada
                    //con ref accederemos al elemento dentro del dom y comprobaremos si hay una fila seleccionada
                    ref={el => {
                        if (el) {
                            el.indeterminate = table.getIsSomePageRowsSelected();
                        }
                    }}

                />
            ),


            cell: ({ row }) => (
                <FormCheck
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),

        },
        {
            header: '#',
            accessorFn: (row, i) => i + 1,
            id: 'index',

        },
        {
            header: 'Miniatura',
            id: 'miniatura',
            accessorFn: row => row.datos.url.replace('.mp4', '.jpg'),
            cell: info => <img src={info.getValue()} alt="miniatura" className='img-fluname img-thumbnail' />
        },
        {
            header: 'Nombre',
            id: 'nombre',
            accessorFn: row => row.nombre,
        },
        {
            header: 'Fecha Creación',
            id: 'fechaCreacion',
            accessorFn: row => new Date(row.createdAt).toLocaleDateString("es-es"),
        },
        {
            header: 'Duración',
            id: 'duracion',
            accessorFn: row => `${row.datos.duracion.toFixed(2)} s`,
        },
        {
            header: 'Playlists',
            id: 'playlists',
            accessorFn: row => row.playlist.length === 0 ? 'ninguna' : row.playlist.map(playlist => playlist.playlistName).join(', '),
        },
        {
            header: () => <Button className="bi bi-trash3 headerDelete btn-outline-danger" onClick={handleDeleteSelectedFiles}></Button>,
            id: 'delete',
            cell: ({ row }) => (
                <div>
                    <Button
                        className="bi bi-trash3 eliminar btn-outline-danger"
                        onClick={() => handleDeleteFile(row.original._id)}
                    ></Button>
                    <Button
                        className="bi bi-eye editar btn-outline-info"
                        onClick={() => handleNavigation(`/files/${row.original._id}`)}
                    ></Button>
                </div>

            ),
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(), //Nos permite obtener las cabeceras
        getSortedRowModel: getSortedRowModel(), //Permite ordenar cabeceras
        getFilteredRowModel: getFilteredRowModel(), //Nos permite filtrar datos 
        getPaginationRowModel: getPaginationRowModel(),//Nos permite añadir paginacion a la tabla
        filterFns: {
            fuzzy: FuzzyFilter, //lo que buscamos tiene que coincidir con un dato
        },
        globalFilterFn: FuzzyFilter,
        enableRowSelection: true //Permite que podamos seleccionar las filas

    });
    // const [tabla, setTabla] = useState([]);
    // useEffect(() => {
    //     if (!loading) {
    //         setloading(true)
    //     }
    // }, [table, loading]); 

    return (
        <div className="container">
            <Form.Group className='mb-4 offset-md-8 col-md-2' controlId='filter'>
                <Form.Control type='text' name='filter' onChange={(e) => table.setGlobalFilter(e.target.value)} placeholder='Buscar...'></Form.Control>
            </Form.Group>
            <div className="d-flex flex-column gap-2  flex-grow-1">
                <div className="d-flex align-items-center justify-content-center tableContainer container">
                    <table style={{ overflow: "auto" }}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHeader key={header.id} header={header} />
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}
                                    // Cuando selecciones una celda el color de la fila marcada cambiará
                                    style={{
                                        background: row.getIsSelected() ? '#32CD32' : 'white',
                                        color: row.getIsSelected() ? 'white' : 'black'
                                    }}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        {/* <tfoot>
                            {table.getFooterGroups().map(footerGroup => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.footers.map(footer => (
                                        <td key={footer.id}>
                                            {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tfoot> */}
                    </table>

                </div>
            </div>
            <PaginationTable table={table} />
        </div>

    );
}
