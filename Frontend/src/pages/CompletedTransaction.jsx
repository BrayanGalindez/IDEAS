import { Link } from "react-router-dom";
import check from "../assets/check.svg";
function CompletedTransaction() {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-color-bg">
      <div className=" bg-color-bg p-6 rounded shadow-md max-w-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-green-600 mb-4 mx-auto"
      >
        <image href={check} width="100%" height="100%" rx="30" />
      </svg>
      <h2 className="text-white text-xl font-semibold mb-2">
        Transacción realizada con éxito
      </h2>
      <div className="text-white 600 mb-4">
        <p>Monto: 1000</p>
        <p>Destino: 4994-2212-3154-3134</p>
        <p>Fecha de transacción: 02/08/2023</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <Link to="/balance">
            <button className="w-full  bg-color-button hover:bg-color-button-hover text-white font-semibold px-4 py-2 rounded my-4">
              Ver saldo
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Link to="/transfer">
            <button className="w-full bg-color-button hover:bg-color-button-hover text-white font-semibold px-4 py-2 rounded my-4">
              Realizar otra transferencia
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Link to="/closed">
            <button className="w-full bg-color-button hover:bg-color-button-hover text-white font-semibold px-4 py-2 rounded my-4">
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
      </div>
    </div>

  );
}

export default CompletedTransaction;
