const database = require('../database/database');

/**
 * Retorna todos os registros
 */
function findAllStudents() {
    return database;
};

/**
 * Busca aluno por meio do registro escolar (academic record)
 * @param ar: registro escolar
 */
function findStudentByAR(ar) {
    return database.find(student => student.academicRecord === ar) || null;
};

/**
 * Cadastra aluno
 * @param student: objeto com as informações do aluno a ser cadastrado
  */
function saveStudent(student) {
    database.push(student);
    return student;
};

/**
 * Atualiza aluno - não interfere nas disciplinas.
 * @param ar: registro escolar
 * @param studentData: dados a serem atualizados
  */
function updateStudent(ar, studentData) {
    const index = database.findIndex(s => s.academicRecord === ar);
    if (index === -1) return null;
    database[index] = { ...database[index], ...studentData };
    return database[index];
};

/**
 * Exclui aluno com base no número do registro escolar (academic record)
 * @param ar: registro escolar
  */
function deleteStudent(ar) {
    const index = database.findIndex(s => s.academicRecord === ar);
    if (index === -1) return null;
    return database.splice(index, 1);
};

module.exports = {
    findAllStudents,
    findStudentByAR,
    saveStudent,
    updateStudent,
    deleteStudent
};