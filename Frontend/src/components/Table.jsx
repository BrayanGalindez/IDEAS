import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
function Table({ data, columns }) {
  // Función para renderizar el contenido de la celda de la columna "Status"

  const renderStatusIconAndMessage = (status) => {
    switch (status) {
      case "realizada":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          message: "Realizada",
        };
      case "recibida":
        return {
          icon: <FaCircle className="text-blue-500" />,
          message: "Recibida",
        };
      case "fallada":
        return {
          icon: <FaTimesCircle className="text-red-500" />,
          message: "Fallada",
        };
      default:
        return { icon: null, message: "Estado desconocido" };
    }
  };
  // Función para renderizar la celda de estado
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div className="w3-container">
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
        {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-theme text-white"
          onClick={() => table.setPageIndex(0)}
        >
          Primera
        </button>
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-theme text-white"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Anterior
        </button>
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-theme text-white"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Siguiente
        </button>
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-theme text-white"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima
        </button>
      </div>
    </div>
  );
}

export default Table;
