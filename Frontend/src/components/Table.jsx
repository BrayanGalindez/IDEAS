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
    <div className="w3-container items-center justify-center min-h-screen mb-5">
      <h1 className="text-3xl font-bold text-center mt-4 ">
        Historial de transacciones
      </h1>
      <h1 className="text-3xl font-bold mb-4 mt-4">Filtro:</h1>
      <input
        className="border-color-bg  bg-gray-300 px-4 py-2 mb-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
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
          className="rounded-full px-3 py-2 mr-2 bg-color-button hover:bg-color-button-hover text-black"
          onClick={() => table.setPageIndex(0)}
        >
          Primera
        </button>
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-button hover:bg-color-button-hover text-black"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Anterior
        </button>
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-button hover:bg-color-button-hover text-black"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Siguiente
        </button>
        <button
          className="rounded-full px-3 py-2 mr-2 bg-color-button hover:bg-color-button-hover text-black"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima
        </button>
      </div>
    </div>
  );
}

export default Table;
