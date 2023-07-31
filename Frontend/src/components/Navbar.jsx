import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
<nav className=" top-0 left-0 right-0 z-50 p-5 bg-color-theme shadow-md">
  <div className="flex items-center justify-between md:w-auto">
    <img className="h-10 cursor-pointer" src={logo} alt="Logo" onClick={() => navigate('/')} />
    <ul className="justify-end md:flex md:items-center md:static w-full md:w-auto md:bg-opacity-100 transition-all ease-in duration-500 ml-auto">
      <li className="mx-4 my-6 md:my-0">
        <a className="text-xl font-[Open Sans] text-white hover:text-color-theme-hover duration-500 cursor-pointer"  onClick={() => navigate('/balance')}>
          Saldo
        </a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a className="text-xl font-[Open Sans] text-white hover:text-color-theme-hover  duration-500 cursor-pointer"  onClick={() => navigate('/historial')}>
          Historial
        </a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a className="text-xl font-[Open Sans] text-white hover:text-color-theme-hover  duration-500 cursor-pointer"  onClick={() => navigate('/transfer')}  >
          Transferir
        </a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a className="text-xl font-[Open Sans] text-white hover:text-color-theme-hover  duration-500 cursor-pointer"  >
          Cerrar sesion
        </a>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default Navbar;
