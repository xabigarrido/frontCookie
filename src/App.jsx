import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState("");
  const API = "https://backendcookie.onrender.com";

  const obtenCookie = async () => {
    try {
      const res = await axios.get(`${API}/setcookie`, {
        withCredentials: true, // Necesario para enviar cookies entre dominios
      });
      const value = Cookies.get("xabiToken");
      console.log("Cookie obtenida:", value); // Verifica si se obtiene la cookie
      setUser(value); // Actualiza el estado con el valor de la cookie
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
      setUser(res.data); // Actualiza el estado con la respuesta del servidor
    } catch (error) {
      console.error("Error al ver la cookie:", error);
    }
  };

  const eliminarCookie = async () => {
    try {
      const res = await axios.get(`${API}/deletecookie`, {
        withCredentials: true,
      });
      console.log("Cookie eliminada", res);
      setUser(""); // Restablece el estado de user
    } catch (error) {
      console.error("Error al eliminar la cookie:", error);
    }
  };

  // Verifica si la cookie está disponible al cargar el componente
  useEffect(() => {
    const cookieValue = Cookies.get("xabiToken");
    if (cookieValue) {
      console.log("Cookie encontrada en useEffect:", cookieValue);
      setUser(cookieValue); // Si la cookie está disponible, actualiza el estado
    } else {
      console.log("No hay cookie en useEffect");
      setUser(""); // Si no hay cookie, establece un valor vacío o el valor por defecto
    }
  }, []); // Este efecto se ejecuta una vez al cargar el componente

  return (
    <div>
      <button onClick={obtenCookie}>Obtener Cookie</button>
      <button onClick={verCookie}>Ver Cookie</button>
      <button onClick={eliminarCookie}>Eliminar Cookie</button>
      {user && <p>Cookie: {user}</p>} {/* Muestra la cookie en el UI */}
    </div>
  );
}

export default App;
