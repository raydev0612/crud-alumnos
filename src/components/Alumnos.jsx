/* eslint-disable no-unreachable */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

class Alunos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      nome: "",
      email: "",
      alunos: [],
      modalAberta: false,
    };
  }

  componentDidMount() {
    this.buscarAluno();
  }

  componentWillUnmount() {}

  buscarAluno = () => {
    fetch("http://localhost:3000/alunos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        this.setState({ alunos: dados });
      });
  };

  deletarAluno = (id) => {
    fetch("http://localhost:3000/alunos/" + id, { method: "DELETE" }).then(
      (resposta) => {
        if (resposta.ok) {
          this.buscarAluno();
        }
      }
    );
  };

  carregarDados = (id) => {
    fetch("http://localhost:3000/alunos/" + id, { method: "GET" })
      .then((resposta) => resposta.json())
      .then((aluno) => {
        this.setState({
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
        });
        this.abrirModal();
      });
  };

  catastraAluno = (aluno) => {
    fetch("http://localhost:3000/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarAluno();
        toast.success("Alumno creado con exito!");
      } else {
        alert("No fue posible adicionar el alumno");
      }
    });
  };

  atualizarAluno = (aluno) => {
    fetch("http://localhost:3000/alunos/" + aluno.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    }).then((resposta) => {
      if (resposta.ok) {
        this.buscarAluno();
        toast.success("Datos del alumno actualizados!");
      } else {
        alert("No fue posible actualizar los datos del alumno");
      }
    });
  };

  renderTabela() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => this.carregarDados(aluno.id)}
                >
                  Actualizar
                </Button>
                <Button
                  onClick={() => this.deletarAluno(aluno.id)}
                  variant="danger"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  atualizaNome = (e) => {
    this.setState({
      nome: e.target.value,
    });
  };

  atualizaEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  submit = () => {
    if (this.state.id == 0) {
      const aluno = {
        nome: this.state.nome,
        email: this.state.email,
      };

      this.catastraAluno(aluno);
    } else {
      const aluno = {
        id: this.state.id,
        nome: this.state.nome,
        email: this.state.email,
      };

      this.atualizarAluno(aluno);
    }
    this.fecharModal();
  };

  reset = () => {
    this.setState({
      id: 0,
      nome: "",
      email: "",
    });
    this.abrirModal();
  };

  fecharModal = () => {
    this.setState({
      modalAberta: false,
    });
  };
  abrirModal = () => {
    this.setState({
      modalAberta: true,
    });
  };

  render() {
    return (
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ success: { duration: 3000 } }}
        />
        <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>DATOS DEL ALUMNO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.id}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escriba el Nombre del alumno"
                  value={this.state.nome}
                  onChange={this.atualizaNome}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Escriba el email del alumno"
                  value={this.state.email}
                  onChange={this.atualizaEmail}
                />
                <Form.Text className="text-muted">
                  Utilice su mejor email.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.fecharModal}>
              Close
            </Button>
            <Button variant="primary" type="button" onClick={this.submit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="warning" type="button" onClick={this.reset}>
          Nuevo
        </Button>

        {this.renderTabela()}
      </div>
    );
  }
}

export default Alunos;
