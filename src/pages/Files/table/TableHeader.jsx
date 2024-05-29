import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Dropdown, DropdownMenu } from "react-bootstrap";

export default function TableHeader({ header }) {
    const isSorted = header.column.getIsSorted();
    const isAsc = isSorted === "asc"; // Comprueba si el ordenamiento es ascendente
    const isDesc = isSorted === "desc"; // Comprueba si el ordenamiento es descendente

    return (
        <th
            key={header.id}
            colSpan={header.colSpan}
        >
            <div className="container d-flex gap-1" >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {/* Menú que contiene métodos para ordena o fijar cabeceras */}
                <Dropdown className="menu">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {/* <i class="bi bi-three-dots-vertical"></i> */}

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={header.column.getToggleSortingHandler()}>
                            {isDesc ? "Orden: des" : "Orden: asc"}
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Fijar: derecha</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Fijar: izquierda</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* muestra una flex arriba/abajo segun el orden el que estemos ordenando */}
                {isAsc && <i className="bi bi-arrow-up"></i>}
                {isDesc && <i className="bi bi-arrow-down"></i>}
            </div>

        </th>


    );
}
