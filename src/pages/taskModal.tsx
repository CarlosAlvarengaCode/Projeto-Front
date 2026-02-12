import { useEffect, useState } from "react";
import axios from "axios";
import "./taskModal.css";
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

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status || "pendente");
    } else {
      setTitle("");
      setDescription("");
      setStatus("pendente");
    }
  }, [task]);

  if (!isOpen) return null;

  function salvar() {
    const payload = { title, description, status };

    if (task?.id) {
      // PUT (editar)
      axios
        .put(`http://localhost:3000/tasks/${task.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onSuccess();
          onClose();
        });
    } else {
      // POST (criar)
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
          />
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
