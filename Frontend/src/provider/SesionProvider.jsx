import axios from "axios";
import { SesionContext } from "../context/SesionContext";
import { useState } from "react";
import PropTypes from "prop-types";

export const SesionProvider = ({ children }) => {
  const [sesionData, setSesionData] = useState({
    userData: null,
    token: window.localStorage.getItem("jwtToken"),
  });
  const [sesionError, setSesionError] = useState("")

  const login = async (cardNumber, pin) => {
    try {
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
      console.error("Error al iniciar sesion", error);
      setSesionError(error.response.data)
    }
  };

  return (
    <SesionContext.Provider value={{ login, sesionData, sesionError }}>
      {children}
    </SesionContext.Provider>
  );
};

SesionProvider.propTypes = {
  children: PropTypes.node,
};
