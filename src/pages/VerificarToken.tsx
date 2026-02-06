import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerificarToken() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      navigate("/usuario");
    } else {
      navigate("/login");
    }
  }, []);

  return <>veerificar token</>;
}
export default VerificarToken;
