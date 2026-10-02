<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    protected $fillable = [
        'nome',
        'matricula',
        'email',
        'telefone',
        'turma',
        'ano_escolar',
        'data_nascimento',
        'data_matricula',
    ];
}