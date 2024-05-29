import React from "react";
import { Button } from "react-bootstrap";

export default function PaginationTable({ table }) {
    return (
        <div className="container d-flex align-items-center gap-2 col-md-8 justify-content-center  pagination sticky-bottom" style={{ overflow: "auto" }}>
            <Button variant="success" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                Primera página
            </Button>
            <Button variant="success" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Anterior página
            </Button>
            <span>
                Página{' '}
                <strong>
                    {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </strong>
            </span>
            <Button variant="success" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Siguiente página
            </Button>
            <Button variant="success" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                Última página
            </Button>
        </div>
    );
}