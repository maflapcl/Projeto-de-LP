<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('alunos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->integer('matricula');
            $table->string('email');
            $table->string('telefone');
            $table->string('turma');
            $table->integer('ano_escolar');
            $table->date('data_nascimento');
            $table->date('data_matricula');
            $table->timestamps();
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};