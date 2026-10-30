
import { useEffect, useState } from 'react';
import {  listarAlunos,
  cadastrarAluno,
  editarAluno,
  excluirAluno,} from './services/api';
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
  
  const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
  if (!erro && !sucesso) return;

  const temporizador = setTimeout(() => {
    setErro('');
    setSucesso('');
  }, 4000);

  return () => clearTimeout(temporizador);
}, [erro, sucesso]);

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

function iniciarEdicao(aluno) {
  setAlunoEmEdicao(aluno.id);

  setFormulario({
    nome: aluno.nome,
    matricula: String(aluno.matricula),
    email: aluno.email,
    telefone: aluno.telefone,
    turma: aluno.turma,
    ano_escolar: String(aluno.ano_escolar),
    data_nascimento: aluno.data_nascimento?.slice(0, 10) || '',
    data_matricula: aluno.data_matricula?.slice(0, 10) || '',
  });

  
function cancelarEdicao() {
  setAlunoEmEdicao(null);
  setFormulario({ ...formularioInicial });
  setErro('');
  setSucesso('');
}


  setErro('');
  setSucesso('');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  
function atualizarCampo(evento) {
  const { name, value } = evento.target;

  let novoValor = value;

  if (name === 'telefone') {
    const numeros = value.replace(/\D/g, '').slice(0, 11);

    if (numeros.length > 10) {
      novoValor = numeros.replace(
        /^(\d{2})(\d{5})(\d{0,4})$/,
        '($1) $2-$3'
      );
    } else if (numeros.length > 6) {
      novoValor = numeros.replace(
        /^(\d{2})(\d{4})(\d{0,4})$/,
        '($1) $2-$3'
      );
    } else if (numeros.length > 2) {
      novoValor = numeros.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (numeros.length > 0) {
      novoValor = `(${numeros}`;
    }
  }

  setFormulario((anterior) => ({
    ...anterior,
    [name]: novoValor,
  }));
}


  async function enviarFormulario(evento) {
  evento.preventDefault();
  setErro('');
  setSucesso('');
  setSalvando(true);

  try {
    const dados = {
      ...formulario,
      matricula: Number(formulario.matricula),
      ano_escolar: Number(formulario.ano_escolar),
    };

    if (alunoEmEdicao !== null) {
      await editarAluno(alunoEmEdicao, dados);
      setSucesso('Aluno atualizado com sucesso!');
    } else {
      await cadastrarAluno(dados);
      setSucesso('Aluno cadastrado com sucesso!');
    }

    setFormulario({ ...formularioInicial });
    setAlunoEmEdicao(null);

    await carregarAlunos();
  } catch (e) {
    setErro(e.message);
  } finally {
    setSalvando(false);
  }
}
  
async function removerAluno(aluno) {
  const confirmar = window.confirm(
    `Tem certeza que deseja excluir o aluno ${aluno.nome}?`
  );

  if (!confirmar) {
    return;
  }

  setErro('');
  setSucesso('');

  try {
    await excluirAluno(aluno.id);

    if (alunoEmEdicao === aluno.id) {
      setAlunoEmEdicao(null);
      setFormulario({ ...formularioInicial });
    }



    await carregarAlunos();
    setSucesso('Aluno excluído com sucesso!');
  } catch (e) {
    setErro(e.message);
  }
}

  function cancelarEdicao() {
  setAlunoEmEdicao(null);
  setFormulario({ ...formularioInicial });
  setErro('');
  setSucesso('');
}

  return (
    <main className="container">
      <h1>Cadastro de Alunos</h1>

      <section>
        <h2>
  {alunoEmEdicao !== null
    ? 'Editar aluno'
    : 'Cadastrar novo aluno'}
        </h2>
      

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
              maxLength={15}
              placeholder="(13) 99999-9999"

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
           {salvando
            ? 'Salvando...'
              : alunoEmEdicao !== null
                ? 'Salvar alterações'
                : 'Cadastrar aluno'}
          </button>
          
          {alunoEmEdicao !== null && (
            <button
              type="button"
              className="botao-cancelar"
              onClick={cancelarEdicao}
              disabled={salvando}
            >
              Cancelar edição
            </button>
          )}

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
                  <th>Ações</th>
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
                    <td>
                    <button type="button"  
                    onClick={() => iniciarEdicao(aluno)}>
                      Editar
                    </button>
                     <button type="button" onClick={() => removerAluno(aluno)}>
                      Excluir
                    </button>
                  </td>
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
