const prompt = require('prompt-sync')();
const StudentRepository = require('../repositories/studentRepository');
const { createStudent } = require('../models/student');

/**
 * Lista alunos
 */
function getAllStudents() {
    return StudentRepository.findAllStudents();
};

/**
 * Busca aluno com base no registro escolar
 * @param ar: registro escolar
  */
function getStudentByAR(ar) {
    const student = StudentRepository.findStudentByAR(ar);
    if (!student) return '\n❌ Aluno não encontrado.';
    return student;
};

/**
 * Cadastra aluno
  * @param studentData: Dados do aluno a serem cadastrados
  */
function registerStudent(studentData) {
    // Padrão para verificar se o nome contém apenas letras
    function isValidStudentName(name) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    let studentName = ""; // Guarda o nome digitado

    while (true) {
        studentName = prompt(`Digite o nome do aluno: `);

        // Caso o nome do aluno seja inválido, solicita um novo nome até que contenha apenas letras
        if (!isValidStudentName(studentName)) {
            console.log(`\n❌ Nome inválido. Informe somente letras.`);
            continue; // Volta para o início do loop - não permite continuar o código até que insira um nome válido
        };
        break; // nome válido, sai do loop
    };

    const student = createStudent(studentData.academicRecord, studentName); // Utiliza o model student novos cadastros
    return StudentRepository.saveStudent(student); // Salva na memória
};

/**
 * Atualiza aluno - não interfere nas disciplinas.
 * @param ar: registro escolar
 * @param studentData: dados a serem atualizados
  */
function updateStudent(ar) {
    const studentFound = StudentRepository.findStudentByAR(ar); // verifica se existe
    if (!studentFound) return `\n❌ Aluno não encontrado.`;

    // Padrão para verificar se o nome contém apenas letras
    function isValidStudentName(name) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    let nameUpdate = ""; // Guarda o nome digitado

    while (true) {
        nameUpdate = prompt(`Digite o novo nome do aluno: `);

        // Caso o nome do aluno seja inválido, solicita um novo nome até que contenha apenas letras
        if (!isValidStudentName(nameUpdate)) {
            console.log(`\n❌ Nome inválido. Informe somente letras.`);
            continue; // Volta para o início do loop - não permite continuar o código até que insira um nome válido
        };
        break; // nome válido, sai do loop
    };

    // const nameUpdate = prompt("Digite o novo nome do aluno: ");
    return StudentRepository.updateStudent(ar, { studentName: nameUpdate }); // atualiza
};

/**
 * Exclui aluno com base no número do registro escolar (academic record)
 * @param ar: registro escolar
  */
function deleteStudent(ar) {
    const studentFound = StudentRepository.deleteStudent(ar);;
    if (!studentFound) return `\n❌ Aluno não encontrado.`;
    return `\n✅ Registro nº ${ar} excluído com sucesso.`;
};

/**
 * Cadastra disciplinas para aluno
 * @param ar: registro escolar 
 */
function addSubjectsToStudent(ar) {
    const student = StudentRepository.findStudentByAR(ar);
    if (!student) return '\n❌ Aluno não encontrado.';

    let minSubjects = 3; // qtd mínima para cadastro
    let count = 1; // utilizado para verificar se atingiu o valor min de disciplinas

    // Padrão para verificar se a disciplina é composta apenas por letras
    function isValidSubjectName(name) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name);
    };

    while (true) {
        let subjectName = prompt(`Informe o nome da disciplina ${count}: `);
        // Caso o nome da disciplina seja inválido, solicita um novo nome até que contenha apenas letras
        if (!isValidSubjectName(subjectName)) {
            console.log(`\n❌ Nome inválido. Informe novamente o nome da disciplina ${count} (somente letras)`);
            continue; // Volta para o início do loop - não permite continuar o código até que insira um nome válido
        };

        student.subjects.push({
            subjectId: `SUB01${count}`,
            subjectName: subjectName,
            grades: [],
            workload: 80,
            minWorkload: 80 * 0.7,
            average: 0,
            absence: 0,
            approved: false,
            status: "matriculado"
        });

        count++; // incrementa no contador de disciplinas adicionadas
        let addNewSubject = ""; // guarda resposta de continuar/parar add novas disciplinas

        if (count > minSubjects) {
            addNewSubject = prompt("\nDeseja continuar adicionando disciplinas? \nPressione 's' para CONTINUAR ou qualquer outra tecla para PARAR: ");
            if (addNewSubject.toLowerCase() !== "s") break;
        };

    };

    return StudentRepository.updateStudent(ar, { subjects: student.subjects }).subjects;
};

/**
 * Adiciona notas às disciplinas que um aluno está matriculado
 * @param ar: registro escolar 
 */
function addGrades(ar) {
    const student = StudentRepository.findStudentByAR(ar);
    if (!student) return '\n❌ Aluno não encontrado.';

    let hasSubjects = student.subjects.length;

    if (hasSubjects > 0) {
        student.subjects.forEach(subject => {
            for (let i = 0; i < 3; i++) {
                let grade; // armazena o valor da nota
                while(true) {
                    grade = parseFloat(parseFloat(prompt(`Disciplina: ${subject.subjectName} - ${i + 1}ª nota: `)).toFixed(1));
                    
                    if(isNaN(grade)) continue; // Se não for número, continua no loop (while)

                    subject.grades.push(grade); // Se número, adiciona na disciplina e sai do loop (while)
                    break;
                };
            }
        });

        return StudentRepository.updateStudent(ar, { subjects: student.subjects }).subjects; // salva as notas informadas
    };

    return `\n❌ Este aluno não tem disciplinas cadastradas.`;
};

/**
 * Calcula a média de disciplinas
 * @param ar: registro escolar 
 */
function calculateAverages(ar) {
    const student = StudentRepository.findStudentByAR(ar);
    if (!student) return '\n ❌ Aluno não encontrado.';

    if (student.subjects.length === 0) return `\n❌ Aluno não tem disciplinas cadastradas.`;

    let hasGrades = student.subjects.every(subject => subject.grades.length > 0);
    if (!hasGrades) return `\n❌ Disciplinas sem notas lançadas.\nLance as notas para calcular a média.`;


    student.subjects.forEach(subject => {
        // Calcula a média APENAS se nota
        const sum = subject.grades.reduce((total, grade) => total + grade, 0);
        subject.average = parseFloat((sum / subject.grades.length).toFixed(2));
    });

    return StudentRepository.updateStudent(ar, { subjects: student.subjects }).subjects; // retorna as disciplinas
};

/**
 * Lança as faltas do aluno por disciplina. Caso ultrapasse 5 faltas, o aluno é reprovado automaticamente
 * @param ar: registro escolar 
 */
function absenceRegistrationAndAccounting(ar) {
    const student = StudentRepository.findStudentByAR(ar);
    if (!student) return '\n❌ Aluno não encontrado.';

    let hasSubjects = student.subjects.length;

    if (hasSubjects === 0) return `\n❌ Não há disciplinas cadastradas.`;

    student.subjects.forEach(subject => {
        const MAX_ABSENCES = 5; // Max de faltas permitidas

        let totalAbsences; // salva temporariamente o valor informato (total de faltas)
        while(true) {
            totalAbsences = +prompt(`Disciplina: ${subject.subjectName} - Faltas: `);
            if(isNaN(totalAbsences)) continue; // continua perguntando o total de faltas até que informe um número 
            break; // valor válido -> sai do loop (while)
        };

        subject.absence = totalAbsences;
        if (totalAbsences > MAX_ABSENCES) subject.status = 'Reprovado por faltas';
    });
    return StudentRepository.updateStudent(ar, { subjects: student.subjects }).subjects;
};

/**
 * Modifica o status da disciplina indicando se houve ou não aprovação
 * @param ar: registro escolar 
 */
function verifyResult(ar) {
    const student = StudentRepository.findStudentByAR(ar);
    if (!student) return '\n❌ Aluno não encontrado.';

    student.subjects.forEach(subject => {
        if (subject.average >= 7 && subject.absence <= 5) {
            subject.status = 'Aprovado';
            subject.approved = true;
        } else if (subject.average < 7 && subject.absence <= 5) {
            subject.status = 'Reprovado por nota';
        } else if (subject.average >= 7 && subject.absence > 5) {
            subject.status = 'Reprovado por faltas';
        } else {
            subject.status = 'Reprovado';
        }
    });
    return StudentRepository.updateStudent(ar, { subjects: student.subjects }).subjects;
};

module.exports = {
    getAllStudents,
    getStudentByAR,
    registerStudent,
    updateStudent,
    deleteStudent,
    addSubjectsToStudent,
    addGrades,
    calculateAverages,
    absenceRegistrationAndAccounting,
    verifyResult
};
