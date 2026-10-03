<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    public function index()
    {
        $alunos = Aluno::all();

        return response()->json($alunos);
    }

    public function store(Request $request)
    {
        $dados = $request->validate([
            'nome' => 'required|string|max:255',
            'matricula' => 'required|integer',
            'email' => 'required|email|max:255',
            'telefone' => 'required|string|max:20',
            'turma' => 'required|string|max:100',
            'ano_escolar' => 'required|integer',
            'data_nascimento' => 'required|date',
            'data_matricula' => 'required|date',
        ]);

        $aluno = Aluno::create($dados);

        return response()->json($aluno, 201);
    }

    public function show(string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json([
                'message' => 'Aluno não encontrado'
            ], 404);
        }

        return response()->json($aluno);
    }

    public function update(Request $request, string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json([
                'message' => 'Aluno não encontrado'
            ], 404);
        }

        $dados = $request->validate([
            'nome' => 'sometimes|string|max:255',
            'matricula' => 'sometimes|integer',
            'email' => 'sometimes|email|max:255',
            'telefone' => 'sometimes|string|max:20',
            'turma' => 'sometimes|string|max:100',
            'ano_escolar' => 'sometimes|integer',
            'data_nascimento' => 'sometimes|date',
            'data_matricula' => 'sometimes|date',
        ]);

        $aluno->update($dados);

        return response()->json($aluno);
    }

    public function destroy(string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json([
                'message' => 'Aluno não encontrado'
            ], 404);
        }

        $aluno->delete();

        return response()->json([
            'message' => 'Aluno excluído com sucesso'
        ]);
    }
}