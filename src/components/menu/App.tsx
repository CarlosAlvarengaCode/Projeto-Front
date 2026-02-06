import "./App.css";
import { Link } from "react-router-dom";
function Menu() {
  return (
    <>
      <nav className="Menu">
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>

          <li>
            <Link to="/usuario">usuario</Link>
          </li>
          <li>
            <Link to="/tarefa">tarefa</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Menu;
