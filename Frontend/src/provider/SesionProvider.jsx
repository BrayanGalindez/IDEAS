import axios from "axios";
import { SesionContext } from "../context/SesionContext";
import { useState } from "react";
import PropTypes from "prop-types";

export const SesionProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false); // Estado para el loading
  const [sesionData, setSesionData] = useState({
    userData: null,
    token: window.localStorage.getItem("jwtToken"),
  });

  const login = async (cardNumber, pin) => {
    try {
      setLoad(true)
      const response = await axios.post(
        "https://ideas-backend.vercel.app/api/users/login",
        {
          cardNumber: cardNumber,
          pin: pin,
        }
      );

      if (response.status === 200) {
        const userData = response.data[0];

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("jwtToken", userData.jwtToken);

        setSesionData({ userData: userData, token: userData.jwtToken });
      } else {
        console.error("Error al obtener los datos de usuarios");
      }
    } catch (error) {
      setLoad(false)
      setError("Error en los datos ingresados")
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <SesionContext.Provider value={{ login, sesionData, error, load, setError }}>
      {children}
    </SesionContext.Provider>
  );
};

SesionProvider.propTypes = {
  children: PropTypes.node,
};
