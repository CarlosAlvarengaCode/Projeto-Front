import { useEffect, useState } from "react";
import axios from "axios";
import "./taskModal.css";
type User = {
  id: number;
  name: string;
  email: string;
};
type Task = {
  id?: number;
  title: string;
  description?: string;
  status?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task?: Task;
};

export function TaskModal({ isOpen, onClose, onSuccess, task }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");

  const token = localStorage.getItem("token");
  const [user, setUser] = useState<User[]>([]);
  const [userId, setUsersId] = useState<number>(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status || "pendente");
      setUsersId((task as any).user?.id || 0);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pendente");
      setUsersId(0);
    }
  }, [task]);

  if (!isOpen) return null;

  function salvar() {
    const payload = { title, description, status, userId };

    if (task?.id) {
      axios
        .put(`http://localhost:3000/tasks/${task.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onSuccess();
          onClose();
        });
    } else {
      axios
        .post("http://localhost:3000/tasks", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onSuccess();
          onClose();
        });
    }
  }

  return (
    <div className="tasks-modal-overlay">
      <div className="tasks-modal-content">
        <h2 className="tasks-modal-title">
          {task ? "Editar Task" : "Nova Task"}
        </h2>

        <div className="tasks-form-group">
          <label>Título</label>
          <input
            className="tasks-input"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
        </div>

        <div className="tasks-form-group">
          <label>Descrição</label>
          <input
            className="tasks-input"
            placeholder="Digite a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="tasks-form-group">
          <label>Status</label>
          <select
            className="tasks-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>
        <div className="taks-from-group">
          <label>Usuário</label>
          <select
            className="tasks-select"
            value={userId}
            onChange={(e) => setUsersId(Number(e.target.value))}
          >
            <option value={0}>Selecione um usuário</option>
            {user.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        <div className="tasks-modal-buttons">
          <button className="tasks-btn-save" onClick={salvar}>
            Salvar
          </button>

          <button className="tasks-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
