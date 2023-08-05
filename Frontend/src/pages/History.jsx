import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
import { useEffect, useState } from 'react'
//import datahistory from "./dataHistory/datahistory.json";
import axios from "axios"; // Importa la librería Axios

const API = "https://ideas-backend.vercel.app/api/"; // Nombre de la Api

//Creo 3 variables para los datos del localStorage
const data = localStorage.getItem('userData'); 
const userData = JSON.parse(data)
const token = localStorage.getItem('jwtToken');

function History() {

  const [transaction, setTransaction] = useState([])

  //Creo una funcion para traer el historial de transacciones del usuario
  const getHistory = () => {
      axios.get(`${API}transactions?id=${userData.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if(response.status == 200){
              setTransaction(response.data);
            }else{
              console.error("Error: No se encontraron datos de la transaccion ");
            }
          })
          .catch(error => {
            console.error('Error:', error);
      });
  }

  useEffect(() => {
    getHistory();
  }, []);

  console.log(transaction);

  const renderStatusIconAndMessage = (status) => {
    switch (status) {
      case "Realizada":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          message: "Realizada",
        };
      case "Recibida":
        return {
          icon: <FaCircle className="text-blue-500" />,
          message: "Recibida",
        };
      case "Fallada":
        return {
          icon: <FaTimesCircle className="text-red-500" />,
          message: "Fallada",
        };
      default:
        return { icon: null, message: "Estado desconocido" };
    }
  };

  return (
    <div className="mt-10  mb-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Historial de transacciones
      </h1>
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left bg-gray-100">Fecha</th>
            <th className="px-4 py-3 text-left bg-gray-100">Origen</th>
            <th className="px-4 py-3 text-left bg-gray-100">Total</th>
            <th className="px-4 py-3 text-left bg-gray-100">Estado</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-3">{transaction.fecha}</td>
              <td className="border px-4 py-3">{transaction.tarjeta_origen}</td>
              <td className="border px-4 py-3">${transaction.monto}</td>
              <td className="border px-4 py-3 flex items-center">
                {renderStatusIconAndMessage(transaction.descripcion).icon}
                <span className="ml-2">
                  {renderStatusIconAndMessage(transaction.descripcion).message}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
