# Projeto de LP — API REST de Cadastro de Alunos

## Descrição

Projeto desenvolvido para a disciplina de Linguagem de Programação, utilizando Laravel para criação de uma API REST de cadastro de alunos.

O projeto será utilizado posteriormente como backend para uma aplicação React.

## Tecnologias utilizadas

- PHP
- Laravel
- MySQL
- Git e GitHub
- React (etapa futura)

## Cadastro de Alunos

A tabela `alunos` possui os seguintes campos:

- id
- nome
- matricula
- email
- telefone
- turma
- ano_escolar
- data_nascimento
- data_matricula
- created_at
- updated_at

## Funcionalidades da API

A API contará com operações de:

- Cadastrar aluno
- Listar alunos
- Buscar aluno por ID
- Atualizar aluno
- Excluir aluno

## Rotas

```text
GET    /api/alunos
POST   /api/alunos
GET    /api/alunos/{id}
PUT    /api/alunos/{id}
DELETE /api/alunos/{id}
