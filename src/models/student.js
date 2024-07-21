/**
 * Modelo para criação de alunos
 * @param academicRecord: registro escolar (academic record)
 * @param studentName: nome do aluno
  */
function createStudent(academicRecord, studentName) {
    return {
        academicRecord: academicRecord,
        studentName: studentName,
        subjects: [],
    };
};

module.exports = { createStudent };