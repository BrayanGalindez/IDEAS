import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import userData from "./dataBalance/databalance.json";
function Balance() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
        {/* Div que contiene la imagen y la bienvenida a la izquierda */}
        <div className="mb-4 flex items-center">
          <img
            className="h-20 w-20 rounded-full object-cover mr-2"
            src={avatar} // Cambiamos userData.avatar por avatar para usar la imagen local
            alt="Avatar"
          />
          <h1 className="text-2xl font-[Open Sans]">
            Bienvenido {userData.name}
          </h1>
        </div>

        {/* Div que contiene el saldo a la derecha */}
        <div className="mb-4">
          <h1 className="font-[Open Sans]">Saldo</h1>
          <input
            className="w-40 px-3 py-2 border rounded focus:outline-none focus:border-indigo-500"
            type="text"
            value={userData.balance}
            readOnly
          />
        </div>

        {/* Div que contiene el botón debajo del saldo */}
        <div>
          <Link to="/history">
            <button className="bg-color-button hover:bg-color-button-hover text-black px-4 py-2 rounded mt-4">
              Historial de transacciones
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Balance;
