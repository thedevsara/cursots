"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const Funcionario_js_1 = require("./Funcionario.js");
class Professor extends Funcionario_js_1.Funcionario {
    constructor(nome, sobrenome, matricula, salario, titulacao) {
        super(nome, sobrenome, matricula, salario);
        this.titulacao = titulacao;
    }
    getTitulacao() {
        return this.titulacao;
    }
    setTitulacao(nova_titulacao) {
        this.titulacao = nova_titulacao;
    }
    calcularSalarioPrimeiraParcela() {
        return this.getSalario();
    }
    calcularSalarioSegundaParcela() {
        return 0;
    }
}
exports.Professor = Professor;
//# sourceMappingURL=Professor.js.map