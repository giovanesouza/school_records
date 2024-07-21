const prompt = require('prompt-sync')();
const StudentController = require('./controllers/studentController');

let ar_auto_increment = 1; // Utilizado para simular o ID auto (academic record)

async function main() {
    let exit = false;

    while (!exit) {
        console.log("\n==================== MENU ====================");
        console.log(" 1. Listar todos os alunos");
        console.log(" 2. Buscar aluno por Registro Escolar (AR)");
        console.log(" 3. Cadastrar aluno");
        console.log(" 4. Atualizar aluno");
        console.log(" 5. Excluir aluno");
        console.log(" 6. Cadastrar disciplinas para aluno");
        console.log(" 7. Adicionar notas para aluno");
        console.log(" 8. Calcular médias de aluno");
        console.log(" 9. Registrar e contabilizar faltas de aluno");
        console.log(" 10. Exibir resultado final do aluno");
        console.log(" 0. Sair");
        console.log("==============================================");
        
        const opc = prompt("Escolha uma opção: ");

        switch (opc) {
            case '1':
                console.table(await StudentController.getAllStudents());
                break;
            case '2':
                const arSearch = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.getStudentByAR(arSearch));
                break;
            case '3':
                const arRegister = `20240${ar_auto_increment}`; // valor setado automaticamente

                console.table(await StudentController.registerStudent({ academicRecord: arRegister }));
                
                ar_auto_increment++; // incrementa no academic record
                break;
            case '4':
                const arUpdate = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.updateStudent(arUpdate));
                break;                
            case '5':
                const arDelete = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.log(await StudentController.deleteStudent(arDelete));
                break;
            case '6':
                const arSubjects = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.addSubjectsToStudent(arSubjects));
                break;
            case '7':
                const arGrades = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.addGrades(arGrades));
                break;
            case '8':
                const arAverages = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.calculateAverages(arAverages));
                break;
            case '9':
                const arAbsences = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.absenceRegistrationAndAccounting(arAbsences));
                break;
            case '10':
                const arResult = prompt("Digite o Registro Escolar (AR) do aluno: ");
                console.table(await StudentController.verifyResult(arResult));
                break;
            case '0':
                exit = true; // Encerra o programa (sai do loop)
                break;
            default:
                console.log("\n❌ Opção inválida. Tente novamente.");
        }
    }
}

main(); // Executa a aplicação: chama o menu 
