type User = {
  id: number;
  name: string;
  email: string;
};

import { useNavigate } from "react-router-dom";
import "./usuario.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Usuario() {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  function deletarToken() {
    localStorage.removeItem("token");

    navigate("/login");
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar usuários:", error);
      });
  }, []);
  return (
    <div className="layout">
      <button onClick={deletarToken}>sair</button>

      <main className="content">
        <header className="hender">
          <h1> usuario</h1>
          <button className="btn-primary">Adicionar</button>
        </header>
        <div className="filters">
          <select>
            <option>Selecionar</option>
          </select>
          <input type="text" placeholder="Buscar Usuario" />
          <button>Buscar</button>
          <button className="btn-clear">limpar</button>
        </div>
        <div>
          <table border={2}>
            <thead>
              <th>id</th>
              <th>name</th>
              <th>email</th>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Usuario;
