import { useEffect, useState } from "react";
import axios from "axios";

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

  // Quando abre o modal para editar
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
    <div className="modal">
      <div className="modal-content">
        <h2>{task ? "Editar Task" : "Nova Task"}</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pendente">Pendente</option>
          <option value="concluida">Concluída</option>
        </select>

        <button onClick={salvar}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
