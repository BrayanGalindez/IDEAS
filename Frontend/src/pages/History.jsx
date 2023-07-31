import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
import datahistory from "./dataHistory/datahistory.json";
function History() {
  
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

  return (
    <div className="mt-10  mb-72">
      <h1 className="text-3xl font-[Open Sans] text-center mb-6">
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
          {datahistory.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-3">{transaction.date}</td>
              <td className="border px-4 py-3">{transaction.source}</td>
              <td className="border px-4 py-3">${transaction.total}</td>
              <td className="border px-4 py-3 flex items-center">
                {renderStatusIconAndMessage(transaction.status).icon}
                <span className="ml-2">
                  {renderStatusIconAndMessage(transaction.status).message}
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
