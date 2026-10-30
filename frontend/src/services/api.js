const API_URL = 'http://127.0.0.1:8000/api/alunos';

export async function listarAlunos() {
  const resposta = await fetch(API_URL, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os alunos.');
  }

  return resposta.json();
}

export async function cadastrarAluno(dados) {
  const resposta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    const erros = Object.values(resultado.errors || {}).flat().join('\n');
    throw new Error(erros || resultado.message || 'Erro ao cadastrar aluno.');
  }

  return resultado;
}

export async function editarAluno(id, dados) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    const erros = Object.values(resultado.errors || {}).flat().join('\n');
    throw new Error(erros || resultado.message || 'Erro ao editar aluno.');
  }

  return resultado;
}

export async function excluirAluno(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!resposta.ok) {
    throw new Error('Não foi possível excluir o aluno.');
  }
}