import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddPlaylistFiles, DeleteFilePlaylist, GetPlaylistByID, fetchFiles, updatePlaylistFiles } from "../../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import PaginationTable from "../../../components/common/Pagination";
import { FuzzyFilter } from "../../../components/common/Table.utils";
import './PlaylistDetaillsPage.css';

export const PlaylistDetaillsPage = () => {
  const { id } = useParams();
  const [playlistDetaill, setPlayListDetaill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [searchTermPlaylist, setSearchTermPlaylist] = useState('');
  const [searchTermFiles, setSearchTermFiles] = useState('');
  const [isOrderChanged, setIsOrderChanged] = useState(false);

  useEffect(() => {
    if ((loading && playlistDetaill.length === 0) || loading) {
      setLoading(false);
      GetPlaylistByID(id)
        .then((result) => {
          setPlayListDetaill(result);
        })
        .catch((error) => console.log("error fetching data:", error));
      fetchFiles()
        .then(result => {
          setFiles(result);
        })
    }
  }, [playlistDetaill, loading]);

  const handleAddPlaylist = async (id, fileId, fileName, duracion, playlistName) => {
    const result = await AddPlaylistFiles(id, fileId, fileName, duracion, playlistName);
    if (result) {
      setLoading(true);
    }
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    const dropIndex = e.target.getAttribute('data-index');
    const dragIndex = e.dataTransfer.getData('index');
    const reOrderedArchivos = [...playlistDetaill.archivos];
    const draggedItem = reOrderedArchivos[dragIndex];
    reOrderedArchivos.splice(dragIndex, 1);
    reOrderedArchivos.splice(dropIndex, 0, draggedItem);
    console.log(reOrderedArchivos)
    setPlayListDetaill({
      ...playlistDetaill,
      archivos: reOrderedArchivos
    });
    setIsOrderChanged(true);
  }

  const handleDeleteplaylist = async (index, fileID) => {
    const deletedArchivo = [...playlistDetaill.archivos];
    deletedArchivo.splice(index, 1);
    const result = await DeleteFilePlaylist(deletedArchivo, id, fileID);
    if (result) {
      setLoading(true);
    }
  }
//Guardar el cambio de orden de los archivos de la playlist
  const handleSaveOrder = async () => {
    // Implementa la lógica para guardar el nuevo orden en la API
    console.log(playlistDetaill.archivos)
    let files = playlistDetaill.archivos
    const result = await updatePlaylistFiles(id, files)
    setIsOrderChanged(false);
    if (result) {
      setLoading(true);
    }
  }

  //Definir las columas de la primera tabla
  const playlistColumns = [
    {
      header: 'Orden',
      accessorFn: (row, i) => i + 1,
      id: 'orden'
    },
    {
      header: 'Nombre',
      accessorKey: 'fileName',
      id: 'nombre',
    },
    {
      header: 'Acciones',
      id: 'acciones',
      cell: ({ row }) => (
        <Button variant="danger" onClick={() => handleDeleteplaylist(row.index, row.original.archivoId)} name="delete">x</Button>

      )
    }
  ];

  //Definir las columas de la segunda tabla
  const filesColumns = [
    {
      header: 'Miniatura',
      accessorKey: 'datos.url',
      id: 'miniatura',
      cell: info => <img src={info.getValue().replace('.mp4', '.jpg')} alt="imagen" className="img-fluid img-thumbnail bg-dark" />
    },
    {
      header: 'Nombre',
      accessorKey: 'nombre',
      id: 'nombre'
    },
    {
      header: 'Duración',
      accessorKey: 'datos.duracion',
      id: 'duracion',
      cell: info => `${info.getValue().toFixed(2)} s`
    },
    {
      header: 'Añadir',
      id: 'añadir',
      cell: ({ row }) => (
        <Button variant="success" className="mb-2" name="addPlaylist" onClick={() => handleAddPlaylist(id, row.original._id, row.original.nombre, row.original.datos.duracion, playlistDetaill.nombre)}>+</Button>
      )
    }
  ];

  const playlistTable = useReactTable({
    data: playlistDetaill.archivos || [],
    columns: playlistColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      fuzzy: FuzzyFilter,
    },
    globalFilterFn: FuzzyFilter,
    state: {
      globalFilter: searchTermPlaylist,
    }
  });

  const filesTable = useReactTable({
    data: files,
    columns: filesColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      fuzzy: FuzzyFilter,
    },
    globalFilterFn: FuzzyFilter,
    state: {
      globalFilter: searchTermFiles,
    }
  });

  return (
    <div className="container-fluid">
      {loading && <div>Cargando...</div>}
      {!loading && !playlistDetaill._id && (
        <div>No se encontraron resultados en la búsqueda.</div>
      )}
      {
        playlistDetaill._id && (
          <div className='w-95 p-3 container bordered shadow'>
            <div className='w-85 p-4 container text-bg-info cookieCard shadow-lg p-3 mb-5 bg-white rounded d-flex justify-content-around sticky-top'>
              <p className="text-white text-uppercase h3">Nombre: {playlistDetaill.nombre}</p>
              <p className="text-white text-uppercase h3">Duración: {playlistDetaill.duracion} seg.</p>
              {isOrderChanged && <Button variant="primary" onClick={handleSaveOrder}>Guardar</Button>}
            </div>
            {playlistDetaill.archivos.length === 0 && <div>No hay archivos</div>}
            {playlistDetaill.archivos.length >= 1 && (
              <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                <Form.Group className='mb-4' controlId='filter'>
                  <Form.Control type='text' name='filter' onChange={(e) => setSearchTermPlaylist(e.target.value)} placeholder='Buscar...' />
                </Form.Group>
                <Table className="table-bordered table-hover" responsive>
                  <thead className="text-center border-jkdark">
                    {playlistTable.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} onClick={() => header.column.toggleSorting()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : ''}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {playlistTable.getRowModel().rows.map(row => (
                      <tr
                        className="align-middle text-center"
                        key={row.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, row.index)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        data-index={row.index}
                      >

                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}

                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            {files.length > 0 && (
              <div className="fileTable col-12 col-lg-8 offset-0 offset-lg-2 shadow-lg">
                <Form.Group className='mb-4' controlId='filterFiles'>
                  <Form.Control type='text' name='filter' onChange={(e) => setSearchTermFiles(e.target.value)} placeholder='Buscar...' />
                </Form.Group>
                <Table className="table-bordered table-hover" responsive>
                  <thead className="text-center border-dark">
                    {filesTable.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} onClick={() => header.column.toggleSorting()}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : ''}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {filesTable.getRowModel().rows.map(row => (
                      <tr className="align-middle text-center" key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}

                      </tr>
                    ))}
                  </tbody>
                </Table>
                <PaginationTable table={filesTable} className="" />
              </div>
            )}
          </div>

        )
      }
    </div>
  );
}
