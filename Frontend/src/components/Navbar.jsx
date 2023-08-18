import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { SesionContext } from "../context/SesionContext";
function Navbar() {
    const { setSesionData } = useContext(SesionContext);
    const [sesionActive, setSesionActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const data = localStorage.getItem("userData");
    const userData = JSON.parse(data);

    const handleClear = () => {
        
        window.localStorage.clear();
        setSesionData({
            userData: null,
            token: window.localStorage.getItem("jwtToken"),
        })
        setSesionActive(!sesionActive);
        return navigate("/closed");
    };

    const handleNavigation = () => {
        if (!setSesionData) {
            return navigate("/");
        }
        if (setSesionData) {
            return navigate("/balance");
        }
    };

    return (
        <nav className="top-0 left-0 right-0 z-50 p-4 sm:p-1 md:p-5 bg-color-bg shadow-md w-full fixed">
            <div className="sm:flex items-center lg:mx-[150px] md:mx-6 sm:mx-3">
                <img
                    className="sm:h-12 md:h-13 lg:h-13 h-10 cursor-pointer"
                    src={logo}
                    alt="Logo"
                    onClick={handleNavigation}
                />
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 items-center justify-center flex text-white absolute right-4 top-4 cursor-pointer sm:hidden"
                >
                    <FaBars className="text-[1.5em]" />
                </div>

                {userData && (
                    <ul
                        className={`justify-end sm:flex justify-items-end sm:pb-0 absolute w-full sm:static left-0 transition-all ease-in duration-500 sm:z-auto z-[-1] bg-color-bg ${
                            isOpen ? "top-12" : "top-[-430px]"
                        }`}
                    >
                        <li className="mx-11 my-6 md:my-0 text-right">
                            <a
                                className="lg:text-[1.2rem] md:text-base font-[Open Sans] text-white hover:text-color-button duration-500 cursor-pointer "
                                onClick={() => navigate("/balance")}
                            >
                                Saldo
                            </a>
                        </li>
                        <li className="mx-11 my-6 md:my-0 text-right">
                            <a
                                className="lg:text-[1.2rem] md:text-base font-[Open Sans] text-white hover:text-color-button duration-500 cursor-pointer"
                                onClick={() => navigate("/history")}
                            >
                                Historial
                            </a>
                        </li>
                        <li className="mx-11 my-6 md:my-0 text-right">
                            <a
                                className="lg:text-[1.2rem] md:text-base font-[Open Sans] text-white hover:text-color-button duration-500 cursor-pointer"
                                onClick={() => navigate("/transfer")}
                            >
                                Transferir
                            </a>
                        </li>
                        <li className="mx-11 my-6 md:my-0 text-right">
                            <a
                                className="lg:text-[1.2rem] md:text-base font-[Open Sans] text-white hover:text-color-button duration-500 cursor-pointer"
                                onClick={handleClear}
                            >
                                Cerrar sesion
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
