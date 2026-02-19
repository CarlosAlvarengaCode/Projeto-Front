import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import "./usuario.css";

type User = {
  id: number;
  name: string;
  email: string;
};

export function Usuario() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelecionado, setUserSelecionado] = useState<User | null>(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Deletar token e redirecionar para login
  function deletarToken() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Carregar usuários da API
  function carregarUsuarios() {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Erro ao buscar usuários:", error));
  }

  // Deletar usuário
  function deletarUsuario(id: number) {
    axios
      .delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => carregarUsuarios())
      .catch((error) => console.log("Erro ao deletar usuário:", error));
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="usuario-container">
      <div className="usuario-top-buttons">
        <button
          className="usuario-btn-tasks"
          onClick={() => navigate("/tasks")}
        >
          Tasks
        </button>

        <button className="usuario-btn-sair" onClick={deletarToken}>
          Sair
        </button>
      </div>

      <main>
        <div className="usuario-header">
          <h1>Usuários</h1>

          <button
            className="usuario-btn-novo"
            onClick={() => {
              setUserSelecionado(null);
              setIsModalOpen(true);
            }}
          >
            Novo Usuário
          </button>
        </div>

        <table className="usuario-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th> Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="usuario-actions">
                  <button
                    className="usuario-btn-editar"
                    onClick={() => {
                      setUserSelecionado(user);
                      setIsModalOpen(true);
                    }}
                  >
                    Alterar
                  </button>

                  <button
                    className="usuario-btn-apagar"
                    onClick={() => deletarUsuario(user.id)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={userSelecionado || undefined}
        onSuccess={carregarUsuarios}
      />
    </div>
  );
}
