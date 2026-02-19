import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TaskModal } from "./taskModal";
import "./tasks.css";

type User = {
  id: number;
  email: string;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  status?: string;
  user?: User;
};

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
        setTasks(response.data);
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
    <div className="tasks-container">
      <div className="tasks-top-buttons">
        <button className="tasks-btn-sair" onClick={deletarToken}>
          Sair
        </button>
      </div>

      <main>
        <div className="tasks-header">
          <h1>Tasks</h1>

          <div className="tasks-header-buttons">
            <button
              className="tasks-btn-nova"
              onClick={() => {
                setTaskSelecionada(null);
                setIsModalOpen(true);
              }}
            >
              Nova Task
            </button>

            <button
              className="tasks-btn-usuarios"
              onClick={() => navigate("/usuario")}
            >
              Usuários
            </button>
          </div>
        </div>

        <table className="tasks-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Título</th>
              <th>Status</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.description}</td>
                <td>{task.title}</td>
                <td>
                  <span
                    className={`tasks-status ${
                      task.status === "concluida"
                        ? "status-concluida"
                        : "status-pendente"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>{task.user?.email}</td>

                <td className="tasks-actions">
                  <button
                    className="tasks-btn-editar"
                    onClick={() => {
                      setTaskSelecionada(task);
                      setIsModalOpen(true);
                    }}
                  >
                    Alterar
                  </button>

                  <button
                    className="tasks-btn-apagar"
                    onClick={() => deletarTask(task.id)}
                  >
                    Apagar
                  </button>
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
