import "./App.css";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Alumnos from "./components/Alumnos";
import Sobre from "./components/Sobre";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <h1>Mi CRUD con React</h1>
      <BrowserRouter>
        <Nav variant="tabs">
          <Nav.Link as={Link} to="/">
            Pagina Inicial
          </Nav.Link>
          <Nav.Link as={Link} to="/alunos">
            Cadastro de Alumnos
          </Nav.Link>
          <Nav.Link as={Link} to="/sobre">
            Sobre
          </Nav.Link>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Alumnos />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
