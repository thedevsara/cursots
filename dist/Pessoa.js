"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
class Pessoa {
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
    getNome() {
        return this.nome;
    }
    getSobrenome() {
        return this.sobrenome;
    }
    getNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }
}
exports.Pessoa = Pessoa;
//# sourceMappingURL=Pessoa.js.map