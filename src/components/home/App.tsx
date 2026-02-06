import { Route, Routes } from "react-router-dom";
import VerificarToken from "../../pages/VerificarToken";
import Login from "../../pages/login";
import ProtectedRoute from "../../pages/ProtectedRoute";
import Usuario from "../../pages/usuario";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VerificarToken />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/usuario"
        element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
