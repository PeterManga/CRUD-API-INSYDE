import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Dropdown, DropdownMenu } from "react-bootstrap";

export default function TableHeader({ header }) {
  
    

    return (
        <th
            key={header.id}
            colSpan={header.colSpan}
            style={{...header.column.getIsPinned()!==false&&{backgroundColor:"rgb(1, 126, 35)", border: "1px solid white"}}}
            
        >
            <div className="container" >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {/* Menú que contiene métodos para ordena o fijar cabeceras */}
                <Dropdown className="menu">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {/* <i class="bi bi-three-dots-vertical"></i> */}

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={header.column.getToggleSortingHandler()}>
                            {header.column.getIsSorted() ? "Orden: des" : "Orden: asc"}
                        </Dropdown.Item>
                        {header.column.getIsPinned()!=="left"&&(<Dropdown.Item onClick={() => header.column.pin("left")}>Fijar: izquierda</Dropdown.Item>)}
                        {header.column.getIsPinned()!=="right"&&(<Dropdown.Item onClick={() => header.column.pin("right")}>Fijar: derecha</Dropdown.Item>)}
                        {header.column.getIsPinned()!==false&&(<Dropdown.Item onClick={() => header.column.pin(false)}>Quitar fijado</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                {/* muestra una flex arriba/abajo segun el orden el que estemos ordenando */}
                {header.column.getIsSorted()==='asc'&& <i className="bi bi-arrow-up"></i>}
                {header.column.getIsSorted()==='desc' && <i className="bi bi-arrow-down"></i>}
            </div>

        </th>


    );
}
