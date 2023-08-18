import { Link } from "react-router-dom";
import padlock from "../assets/padlock.svg";
import logo from "../assets/logo.png";

function AutoClosedSession() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <img className="h-20 mx-auto mb-4" src={logo} alt="Logo" />
            <h1 className="text-3xl font-bold text-center">Saint Patrick</h1>
            <div className="bg-white p-6 rounded shadow-md max-w-sm mt-4">
                <img
                    className="mx-auto w-16 h-16 mb-4"
                    src={padlock}
                    alt="Padlock"
                />
                <h2 className="text-xl font-[Open Sans] text-center mb-4">
                    Por su seguridad la sesión ha sido cerrada por inactividad
                </h2>
                <p className="text-gray-600 text-center mb-4">
                    Para ingresar, vuelva a iniciar sesión.
                </p>
                <div className="flex justify-center">
                    <Link to="/">
                        <button className="font-[Open Sans] bg-color-button hover:bg-color-button-hover text-white px-4 py-2 rounded">
                            Iniciar sesión
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AutoClosedSession;
