import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function App() {
  const [user, setUser] = useState("");
  const API = "https://backendcookie.onrender.com";
  const obtenJson = async () => {
    const res = await axios.get(API);
  };
  const obtenCookie = async () => {
    const res = await axios.get(`${API}/setcookie`, {
      withCredentials: true,
    });
    const value = Cookies.get("xabiToken");
    console.log(value);
    setUser(value);
  };
  const verCookie = async () => {
    const res = await axios.get(`${API}/getcookie`, {
      withCredentials: true,
    });
    setUser(res.data);
    console.log(res);
  };
  const eliminarCookie = async () => {
    const res = await axios.get(`${API}/deletecookie`, {
      withCredentials: true,
    });
    console.log(res);
    setUser("");
  };

  useEffect(() => {
    // obtenJson();
  });
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
