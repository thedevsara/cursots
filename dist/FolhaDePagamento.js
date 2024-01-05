"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_js_1 = require("./Pessoa.js");
const Funcionario_js_1 = require("./Funcionario.js");
const Professor_js_1 = require("./Professor.js");
class FolhaDePagamento {
    constructor(pessoas) {
        this.pessoas = [];
        this.pessoas = pessoas;
    }
    getPessoas() {
        return this.pessoas;
    }
    calcularPagamentos() {
        let soma_total_dos_salarios = 0;
        for (const pessoa_atual of this.pessoas) {
            if (pessoa_atual instanceof Funcionario_js_1.Funcionario && pessoa_atual instanceof Professor_js_1.Professor == false) {
                soma_total_dos_salarios += pessoa_atual.getSalario();
                console.log(pessoa_atual);
            }
            else if (pessoa_atual instanceof Professor_js_1.Professor) {
                soma_total_dos_salarios += pessoa_atual.getSalario();
                console.log(pessoa_atual);
            }
        }
        return soma_total_dos_salarios;
    }
}
let pessoa = new Pessoa_js_1.Pessoa("Sara", "Vieira");
let funcionario = new Funcionario_js_1.Funcionario("Rubens", "Vieira", "2022-1", 1320);
let professor = new Professor_js_1.Professor("José", "Flávio", "2014-2", 5000, "Matemática");
let lista_de_pessoas = [pessoa, funcionario, professor];
let folha = new FolhaDePagamento(lista_de_pessoas);
console.log(folha);
console.log(`R$ ${folha.calcularPagamentos()}`);
//# sourceMappingURL=FolhaDePagamento.js.map