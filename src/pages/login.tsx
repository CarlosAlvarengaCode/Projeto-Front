import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const response = await api.post("auth/login", {
        email,
        password,
      });

      console.log("RESPOSTA DO BACKEND:", response);

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/usuario");

      console.log("TOKEN SALVO:", token);
    } catch (error) {
      console.log("ERRO NO LOGIN:", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="login-form-group">
          <label>Email</label>
          <input
            className="login-input"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-form-group">
          <label>Senha</label>
          <input
            className="login-input"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
export default Login;
