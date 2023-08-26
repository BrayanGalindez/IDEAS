import UserProfile from "../components/UserProfile";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Importa Axios
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ConfirmTransfer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Agregar estado para almacenar los datos cargados
    const [transferData, setTransferData] = useState(null);

    const {
        selectedCard,
        formattedRecipient,
        formattedAmount,
        numerosDeTarjetas,
        name,
        lastname,
        nameReceiver,
        lastNameReceiver,
    } = location.state;

    // Usar useEffect para cargar los datos desde location.state
    useEffect(() => {
        if (location.state) {
            setTransferData(location.state);
        }
    }, [location.state]);
    const handleTransfer = async () => {
        const jwtToken = localStorage.getItem("jwtToken");
        try {
            // Verificar si se cargaron los datos correctamente
            if (!transferData) {
                // console.error("Error: Datos de transferencia no cargados");
                return;
            }
            // Realizar la solicitud POST al backend con los datos necesarios
            const response = await axios.post(
                "https://ideas-backend.vercel.app/api/transactions",
                {
                    monto: transferData.amount, // Convertir a número
                    tarjeta_origen: transferData.selectedCard,
                    tarjeta_destino: transferData.recipient,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            if (response.status === 200) {
                const { saldo } = response.data;
                // console.log(response);
                // Si la respuesta de la API es exitosa, redirigir al componente CompletedTransaction
                // console.log("Transferencia realizada:");
                // console.log("Tarjeta seleccionada:", transferData.selectedCard);
                // console.log("Monto:", transferData.amount);
                // console.log("Destinatario:", transferData.recipient);
                navigate("/completed", {
                    state: {
                        amount: transferData.amount,
                        formattedRecipient: transferData.formattedRecipient,
                        nameReceiver,
                        lastNameReceiver,
                        currentAmount: saldo,
                    },
                });
            }
        } catch (error) {
            // console.error("Error en la solicitud de transacción:", error);
            if (error.response) {
                // console.log("Detalles del error:", error.response.data);
            }
        }
    };

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className="flex flex-col items-center justify-center min-h-screen mt-16">
                <h1 className="text-2xl font-normal m-5">
                    Confirmar transacción
                </h1>

                {/* Mostrar la tarjeta seleccionada */}
                <UserProfile
                    card={selectedCard}
                    nombre={name}
                    numerosDeTarjetas={numerosDeTarjetas}
                    apellido={lastname}
                />

                {/* Mostrar los detalles de la transacción */}
                <form className="flex flex-col w-full max-w-sm m-7">
                    <div className="mb-4 flex flex-col">
                        <label className="text-xl font-[Open Sans] mb-2">
                            Monto:
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                            type="text"
                            value={formattedAmount}
                            readOnly // Hacer el campo de destinatario de solo lectura
                        />
                    </div>
                    <div className="mb-2 flex flex-col">
                        <label className="text-xl font-[Open Sans] mb-2">
                            Destinatario:
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                            type="text"
                            value={formattedRecipient} // Usar "formattedRecipient" para mostrar el valor formateado
                            readOnly // Hacer el campo de destinatario de solo lectura
                        />
                    </div>
                    <div className="my-5">
                        <button
                            type="button"
                            className="w-full bg-transparent border-2 border-black opacity-60 bg-opacity-60 hover:opacity-100 text-black font-[Open Sans] px-6 py-2 rounded-md"
                            onClick={() => {
                                navigate("/transfer");
                            }}
                        >
                            Volver
                        </button>
                        <br />
                        <button
                            type="button"
                            className="w-full bg-color-button hover:bg-color-button-hover text-black font-[Open Sans] px-6 py-2 rounded-md mt-4"
                            onClick={handleTransfer}
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ConfirmTransfer;
