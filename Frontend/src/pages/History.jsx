import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
//import datahistory from "./dataHistory/datahistory.json";
import axios from "axios"; // Importa la librería Axios

const API = "https://ideas-backend.vercel.app/api/"; // Nombre de la Api

function History() {
    const [transaction, setTransaction] = useState([]);

    //Creo una funcion para traer el historial de transacciones del usuario
    const getHistory = () => {
        //Creo 3 variables para los datos del localStorage
        const data = localStorage.getItem("userData");
        const userData = JSON.parse(data);
        const token = localStorage.getItem("jwtToken");
        axios
            .get(`${API}transactions?id=${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status == 200) {
                    setTransaction(response.data);
                } else {
                    console.error(
                        "Error: No se encontraron datos de la transaccion "
                    );
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        getHistory();
    }, []);

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
        <div className="m-[200px]">
            <h1 className="text-2xl font-normal text-center mb-6">
                Historial de transacciones
            </h1>
            <div className="w-full table-fixed ">
                <div className="">
                    {transaction.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="border-y-2 flex justify-around"
                        >
                            <div>
                                <p className="px-4 py-3 text-lg">
                                    {transaction.fecha}
                                </p>
                                <p className="px-4 py-3 text-lg">
                                    {transaction.tarjeta_origen}
                                </p>
                            </div>
                            <div className="justify-end">
                                <div className="px-4 py-3 flex items-center text-2xl">
                                    {
                                        renderStatusIconAndMessage(
                                            transaction.descripcion
                                        ).icon
                                    }
                                    <span className="ml-10 text-lg">
                                        {
                                            renderStatusIconAndMessage(
                                                transaction.descripcion
                                            ).message
                                        }
                                    </span>
                                </div>
                                <p className="px-4 py-3 text-lg text-right">
                                    ${transaction.monto}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick=""
                className="font-[Open Sans] text-black bg-color-button hover:bg-color-button-hover rounded-md px-6 py-2 mt-10 w-80 block mx-auto"
                type="submit" // Agrega el tipo de botón "submit"
            >
                Nueva transacción
            </button>
        </div>
    );
}

export default History;
