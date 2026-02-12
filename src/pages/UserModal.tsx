import { useState, useEffect } from "react";
import axios from "axios";
import "./userModal.css";
type User = {
  id?: number;
  name: string;
  email: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  onSuccess: () => void;
};

export default function UserModal({ isOpen, onClose, user, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [user, isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: any = { name, email };
    if (password) {
      data.password = password;
    }

    if (user && user.id) {
      axios
        .put(`http://localhost:3000/users/${user.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onSuccess();
          onClose();
        })
        .catch((err) => console.log("Erro ao atualizar usuário:", err));
    } else {
      // Criar usuário (POST)
      axios
        .post("http://localhost:3000/users", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          onSuccess();
          onClose();
        })
        .catch((err) => console.log("Erro ao criar usuário:", err));
    }
  }

  if (!isOpen) return null;

  return (
    <div className="user-modal-overlay">
      <div className="user-modal-container">
        <h2 className="user-modal-title">
          {user ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        <form className="user-modal-form" onSubmit={handleSubmit}>
          <div className="user-modal-field">
            <label>Nome</label>
            <input
              className="user-modal-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="user-modal-field">
            <label>Email</label>
            <input
              className="user-modal-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="user-modal-field">
            <label>Senha</label>
            <input
              className="user-modal-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={user ? "Alterar senha" : "Digite a senha"}
              required={!user}
            />
          </div>

          <div className="user-modal-buttons">
            <button type="submit" className="btn-primary">
              {user ? "Salvar" : "Adicionar"}
            </button>

            <button type="button" className="btn-danger" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
