# 🏫 Sistema de Gerenciamento de Alunos

Este é um sistema de gerenciamento de alunos desenvolvido em JavaScript, no ambiente de desenvolvimento Node, utilizando uma arquitetura baseada em database, repositories, models, services e controllers. O sistema permite listar, cadastrar, atualizar, excluir e gerenciar disciplinas, notas, faltas e resultados finais dos alunos.

> Este projeto foi desenvolvido como parte avaliativa do curso Introdução a Back-end development, unidade 2, da iTalets.

## 💻 Tecnologias utilizadas

<div>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="50" alt="logo node" title="logo node"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" width="50" alt="logo js" title="logo js" />
</div>

## 🚀 Funcionalidades

1. Cadastro do Aluno:

   - Solicitar o nome do aluno.

2. Cadastro das Matérias:

   - O aluno pode cadastrar no mínimo 3 matérias.
   - O cadastro de matérias continua até que o usuário decida parar.

3. Cadastro de Notas:

   - Para cada matéria cadastrada, solicitar 3 notas.

4. Cálculo de Média:

   - Calcular a média individual de cada matéria.

5. Cadastro e Contabilização de Faltas:

   - Solicitar o número de faltas para cada matéria.
   - Verificar se o aluno está reprovado por faltas (mais de 5 faltas em qualquer matéria).

6. Resultados:
   - Exibir a média de cada matéria.
   - Indicar se o aluno está aprovado ou reprovado em cada matéria, considerando tanto a média das notas quanto as faltas.

## 🎲 Estrutura dos dados

```js
[
    academicRecord: "",
    studentName: "",
    subjects: [
        subjectId: "",
        subjectName: "",
        grades: [],
        workload: 80,
        minWorkload: 80 * 0.7,
        average: 0,
        absence: 0,
        approved: false,
        status: "matriculado"
    ]
]
```

## 📝 Como usar

1. Clone o repositório e acesse o diretório do projeto

```bash
git clone https://github.com/giovanesouza/school_records.git
cd school_records
```

2.  Rode a aplicação e interaja por meio do terminal

```bash
npm run start:dev
```

## ✅ Resultados obtidos

<iframe width="560" height="315" src="https://www.youtube.com/embed/-m11spHLhIk?si=o5pEm2b5kESIVYyB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>