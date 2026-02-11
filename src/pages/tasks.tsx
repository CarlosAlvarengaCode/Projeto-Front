import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TaskModal } from "./taskModal";
import "./tasks.css";

type Task = {
  id: number;
  title: string;
  description?: string;
  status?: string;
  usuarioId: number;
};

export function Task() {
  const [users, setUsers] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskSelecionada, setTaskSelecionada] = useState<Task | null>(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function deletarToken() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function carregarTasks() {
    axios
      .get("http://localhost:3000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Erro ao buscar tasks:", error);
      });
  }

  function deletarTask(id: number) {
    axios
      .delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => carregarTasks())
      .catch((error) => {
        console.log("Erro ao deletar task:", error);
      });
  }

  useEffect(() => {
    carregarTasks();
  }, []);

  return (
    <div>
      <button onClick={deletarToken}>sair</button>

      <main>
        <header>
          <h1>Tasks</h1>
          <button
            onClick={() => {
              setTaskSelecionada(null);
              setIsModalOpen(true);
            }}
          >
            Nova Task
          </button>
        </header>

        <table border={2}>
          <thead>
            <tr>
              <th>id</th>
              <th>descrição</th>
              <th>título</th>
              <th>status</th>
              <th>usuarioId</th>
              <th>ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.description}</td>
                <td>{user.title}</td>
                <td>{user.status}</td>
                <td>{user.usuarioId}</td>
                <td>
                  <button
                    onClick={() => {
                      setTaskSelecionada(user);
                      setIsModalOpen(true);
                    }}
                  >
                    alterar
                  </button>

                  <button onClick={() => deletarTask(user.id)}>apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={taskSelecionada || undefined}
        onSuccess={carregarTasks}
      />
    </div>
  );
}
