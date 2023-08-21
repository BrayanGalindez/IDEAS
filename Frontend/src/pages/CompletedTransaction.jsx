import { Link } from "react-router-dom";
import check from "../assets/check.svg";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Los meses en JavaScript son base 0
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
}
function CompletedTransaction() {
    const location = useLocation();
    const {
        amount,
        formattedRecipient,
        nameReceiver,
        lastNameReceiver,
        currentAmount,
    } = location.state;
    // console.log("amount:", amount);
    // console.log("formattedRecipient:", formattedRecipient);
    // console.log("nameReceiver:", nameReceiver);
    // console.log("lastNameReceiver:", lastNameReceiver);

    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className="flex justify-center items-center h-screen flex-col bg-color-bg ">
                <div className="bg-color-bg p-6 rounded my-48 ">
                    <div className="xl:flex block">
                        <div className="mx-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="100"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="text-green-600 mb-4 mx-auto"
                            >
                                <image
                                    href={check}
                                    width="100%"
                                    height="100%"
                                    rx="30"
                                />
                            </svg>
                            <h2 className="text-white text-2xl my-4 w-[250px] text-center">
                                Transacción realizada con éxito
                            </h2>
                        </div>
                        <div className="text-white 600 mb-5 font-normal">
                            <p className="my-5">
                                Monto actual: {currentAmount}
                            </p>
                            <p className="my-5">Monto enviado: {amount}</p>
                            <p className="my-5">
                                Numero destino: {formattedRecipient}
                            </p>
                            <p className="my-5">
                                Destinatario: {nameReceiver} {lastNameReceiver}
                            </p>
                            <p className="my-5">
                                Fecha de transacción: {getCurrentDate()}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-[300px]">
                            <Link to="/balance">
                                <button className="w-full bg-color-button hover:bg-color-button-hover font-normal px-4 py-2 rounded my-4">
                                    Ver saldo
                                </button>
                            </Link>
                        </div>
                        <div className="w-[300px]">
                            <Link to="/transfer">
                                <button className="w-full bg-color-button hover:bg-color-button-hover font-normal px-4 py-2 rounded my-4">
                                    Realizar otra transferencia
                                </button>
                            </Link>
                        </div>
                        <div className="w-[300px]">
                            <Link to="/closed">
                                <button className="w-full bg-color-button hover:bg-color-button-hover font-normal px-4 py-2 rounded my-4">
                                    Cerrar sesión
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default CompletedTransaction;
