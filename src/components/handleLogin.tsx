import { login } from "../services/auth";

async function handleLogin() {
  console.log("CLIQUE FUNCIONANDO");

  try {
    const response = await login({
      email: "teste@gmail.com",
      password: "123456",
    });
    console.log(response);
  } catch (error) {
    console.error("erro no login", error);
  }
}
export default handleLogin;
