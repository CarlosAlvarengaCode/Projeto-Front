import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  titulo: string;
  descricao: string;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar tasks", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Carregando tasks...</p>;
  }

  return (
    <div>
      <h1>Minhas Tasks</h1>

      {tasks.length === 0 ? (
        <p>Nenhuma task encontrada</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descrição</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.titulo}</td>
                <td>{task.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tasks;
