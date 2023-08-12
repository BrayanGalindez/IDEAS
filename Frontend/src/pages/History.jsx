import { FaTimesCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
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
                    icon: <FaChevronUp className="text-green-500" />,
                    message: "Realizada",
                };
            case "Recibida":
                return {
                    icon: <FaChevronDown className="text-blue-500" />,
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
        <div className="my-40">
            <h1 className="text-2xl font-normal text-center m-16">
                Historial de transacciones
            </h1>
            <div className="xl:w-[800px] sm:w-[500px]  table-fixed justify-center mx-auto">
                <div className="">
                    {transaction.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="border-y-2 flex justify-between"
                        >
                            <div className="w-full">
                                <p className="px-4 py-3 text-lg">
                                    {transaction.fecha}
                                </p>
                                <p className="px-4 py-3 text-lg">
                                    {transaction.tarjeta_origen}
                                </p>
                            </div>
                            <div className="justify-end">
                                <div className="px-4 py-3 flex items-center text-2xl w-full ">
                                    <div className="text-start">
                                        {
                                            renderStatusIconAndMessage(
                                                transaction.descripcion
                                            ).icon
                                        }
                                    </div>
                                    <span className="ml-10 text-lg text-right">
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

            <Link to="/transfer">
                <button className="font-[Open Sans] text-black bg-color-button hover:bg-color-button-hover rounded-md px-6 py-4 m-12 w-80 block mx-auto">
                    Nueva transacción
                </button>
            </Link>
        </div>
    );
}

export default History;
