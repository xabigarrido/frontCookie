import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState("");
  const API = "https://backendcookie.onrender.com"; // URL del backend

  const obtenCookie = async () => {
    try {
      await axios.get(`${API}/setcookie`, { withCredentials: true });
      const value = Cookies.get("xabiToken"); // Intenta leer la cookie almacenada
      console.log(value);
      checkCookie();
      if (value) setUser(value);
    } catch (error) {
      console.error("Error al obtener la cookie:", error);
    }
  };

  const verCookie = async () => {
    try {
      const res = await axios.get(`${API}/getcookie`, {
        withCredentials: true,
      });
      console.log("Respuesta del servidor:", res.data);
      setUser(res.data); // Actualiza el estado con la respuesta del backend
    } catch (error) {
      console.error("Error al ver la cookie:", error);
    }
  };

  const eliminarCookie = async () => {
    try {
      await axios.get(`${API}/deletecookie`, { withCredentials: true });
      Cookies.remove("xabiToken"); // Elimina la cookie del navegador
      setUser(""); // Limpia el estado
    } catch (error) {
      console.error("Error al eliminar la cookie:", error);
    }
  };
  const checkCookie = async () => {
    try {
      const cookieValue = Cookies.get("xabiToken");
      if (cookieValue) {
        setUser(cookieValue);
      } else {
        // Si no está en el cliente, intentamos obtenerla del backend
        const res = await axios.get(`${API}/getcookie`, {
          withCredentials: true,
        });
        if (res.data) setUser(res.data);
      }
    } catch (error) {
      console.error("Error al verificar la cookie en useEffect:", error);
    }
  };
  useEffect(() => {
    checkCookie();
  }, []); // Se ejecuta al montar el componente

  return (
    <div>
      <button onClick={obtenCookie}>Obtener Cookie</button>
      <button onClick={verCookie}>Ver Cookie</button>
      <button onClick={eliminarCookie}>Eliminar Cookie</button>
      {user && <p>Cookie: {user}</p>}
    </div>
  );
}

export default App;
