
import { useEffect, useState } from 'react';
import { listarAlunos, cadastrarAluno } from './services/api';
import './App.css';

const formularioInicial = {
  nome: '',
  matricula: '',
  email: '',
  telefone: '',
  turma: '',
  ano_escolar: '',
  data_nascimento: '',
  data_matricula: new Date().toISOString().slice(0, 10),
};

function App() {
  const [alunos, setAlunos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function carregarAlunos() {
    try {
      const dados = await listarAlunos();
      setAlunos(dados);
      setErro('');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setErro('');
    setSucesso('');
    setSalvando(true);

    try {
      await cadastrarAluno({
        ...formulario,
        matricula: Number(formulario.matricula),
        ano_escolar: Number(formulario.ano_escolar),
      });

      setFormulario(formularioInicial);
      setSucesso('Aluno cadastrado com sucesso!');
      await carregarAlunos();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="container">
      <h1>Cadastro de Alunos</h1>

      <section>
        <h2>Cadastrar novo aluno</h2>

        <form onSubmit={enviarFormulario}>
          <label>
            Nome completo
            <input
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              required
              maxLength={255}
            />
          </label>

          <label>
            Matrícula
            <input
              name="matricula"
              type="number"
              value={formulario.matricula}
              onChange={atualizarCampo}
              required
              min="1"
            />
          </label>

          <label>
            E-mail
            <input
              name="email"
              type="email"
              value={formulario.email}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Telefone
            <input
              name="telefone"
              type="tel"
              value={formulario.telefone}
              onChange={atualizarCampo}
              required
              maxLength={20}
            />
          </label>

          <label>
            Turma
            <input
              name="turma"
              value={formulario.turma}
              onChange={atualizarCampo}
              required
              maxLength={100}
            />
          </label>

          <label>
            Ano escolar
            <input
              name="ano_escolar"
              type="number"
              value={formulario.ano_escolar}
              onChange={atualizarCampo}
              required
              min="1"
            />
          </label>

          <label>
            Data de nascimento
            <input
              name="data_nascimento"
              type="date"
              value={formulario.data_nascimento}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Data de matrícula
            <input
              name="data_matricula"
              type="date"
              value={formulario.data_matricula}
              onChange={atualizarCampo}
              required
            />
          </label>

          <button type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Cadastrar aluno'}
          </button>
        </form>

        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">{sucesso}</p>}
      </section>

      <section>
        <h2>Alunos cadastrados</h2>

        {carregando ? (
          <p>Carregando alunos...</p>
        ) : alunos.length === 0 ? (
          <p>Nenhum aluno cadastrado.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Turma</th>
                  <th>Ano escolar</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.telefone}</td>
                    <td>{aluno.turma}</td>
                    <td>{aluno.ano_escolar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
