import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
      <>
        <input
          className="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Entrar</button>
      </>
    </div>
  );
}
export default Login;
