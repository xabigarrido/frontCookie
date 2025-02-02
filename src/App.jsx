import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState("");
  const API = "https://backendcookie.onrender.com";

  const obtenCookie = async () => {
    try {
      const res = await axios.get(`${API}/setcookie`, {
        withCredentials: true,
      });
      const value = Cookies.get("xabiToken");
      console.log("Cookie obtenida:", value); // Verifica si se obtiene la cookie
      setUser(value); // Si la cookie está disponible, actualiza el estado
    } catch (error) {
      console.error("Error al obtener la cookie:", error);
    }
  };

  const verCookie = async () => {
    try {
      const res = await axios.get(`${API}/getcookie`, {
        withCredentials: true,
      });
      console.log(res); // Verifica la respuesta del servidor
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
      setUser(cookieValue);
    }
  }, []);

  return (
    <div>
      <button onClick={obtenCookie}>Obtener</button>
      <button onClick={verCookie}>Ver</button>
      <button onClick={eliminarCookie}>Eliminar</button>
      {user && <p>{user}</p>}
    </div>
  );
}

export default App;
