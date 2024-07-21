const StudentService = require('../services/studentService');

/**Lista todos os registros */
async function getAllStudents() {
    return StudentService.getAllStudents();
};

/**
 * Busca aluno por ar (academic record)
 * @param ar: registro escolar
  */
async function getStudentByAR(ar) {
    return StudentService.getStudentByAR(ar);
};

/**
 * Cadastra aluno
 * @param studentData: objeto com as informações do aluno a ser cadastrado
 */
async function registerStudent(studentData) {
    return StudentService.registerStudent(studentData);
};

/**
 * Atualiza aluno - não interfere nas disciplinas.
 * @param ar: registro escolar
 * @param studentData: dados a serem atualizados
  */
async function updateStudent(ar, studentData) {
    return StudentService.updateStudent(ar, studentData);
};

/**
 * Exclui aluno com base no número do registro escolar (academic record)
 * @param ar: registro escolar
  */
async function deleteStudent(ar) {
    return StudentService.deleteStudent(ar);
};

/**
 * Cadastra disciplinas para aluno
 * @param ar: registro escolar 
 */
async function addSubjectsToStudent(ar) {
    return StudentService.addSubjectsToStudent(ar);
};

/**
 * Adiciona notas às disciplinas que um aluno está matriculado
 * @param ar: registro escolar 
 */
async function addGrades(ar) {
    return StudentService.addGrades(ar);
};

/**
 * Calcula a média de disciplinas
 * @param ar: registro escolar 
 */
async function calculateAverages(ar) {
    return StudentService.calculateAverages(ar);
};

/**
 * Lança as faltas do aluno por disciplina. Caso ultrapasse 5 faltas, o aluno é reprovado automaticamente
 * @param ar: registro escolar 
 */
async function absenceRegistrationAndAccounting(ar) {
    return StudentService.absenceRegistrationAndAccounting(ar);
};

/**
 * Define o status com base na média e presença em uma determinada disciplina
 * @param ar:
  */
async function verifyResult(ar) {
    return StudentService.verifyResult(ar);
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
