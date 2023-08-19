import { useMemo } from "react";
// import { DateTime } from 'luxon'
import mData from "../pages/dataHistory/datahistory.json";
import Table from "../components/Table.jsx";
// import axios from "axios"; // Importa la librería Axios
// import { useState, useEffect } from "react";
function History2() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwtToken");
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   if (userData) {
  //     const userId = userData.id;

  //     axios
  //       .get(`https://ideas-backend.vercel.app/api/transactions?id=${userId}`, {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setData(response.data);
  //         } else {
  //           console.error("Error al obtener los datos de transacciones");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error de red:", error);
  //       });
  //   }
  // }, []);

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
    },
  ];
  return <Table data={data} columns={columns} />;
}

export default History2;
