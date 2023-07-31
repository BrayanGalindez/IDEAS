import { useMemo } from "react";
// import { DateTime } from 'luxon'

import mData from "../pages/dataHistory/datahistory.json"
import Table from "../components/Table.jsx";
function History2() {
  const data = useMemo(() => mData, []);
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    {
      header: "Fecha",
      accessorKey: "date",
      footer: "Fecha",
    },
    {
      header: "Origen",
      accessorKey: "source",
      footer: "Origen",
    },
    {
      header: "Total",
      accessorKey: "total",
      footer: "Total",
    },
    {
      header: "Estado",
      accessorKey: "status",
      footer: "Estado",
    }
  ];
  return (
    <>
      <h1 className="text-3xl font-[Open Sans] text-center mt-2">
        Historial de transacciones
      </h1>
      <Table data={data} columns={columns} />
    </>
  )
}

export default History2