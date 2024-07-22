/**
 * Modelo para criação de disciplinas
 * @param subjectId: ID da disciplina
 * @param subjectName: Nome da disciplina
  */
function createSubject(subjectId, subjectName) {
    return {
        subjectId: subjectId,
        subjectName: subjectName,
        grades: [],
        workload: 80,
        minWorkload: 80 * 0.7,
        average: 0,
        absence: 0,
        approved: false,
        status: "matriculado"
    };
}

module.exports = { createSubject };
