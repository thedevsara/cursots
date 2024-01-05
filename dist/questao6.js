"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Saudacao {
    constructor(texto, destinatario) {
        this.texto = texto;
        this.destinatario = destinatario;
    }
    obterSaudacao() {
        return `${this.texto}, ${this.destinatario}`;
    }
}
let saudacao = new Saudacao('Feliz Aniversário', 'Sara!');
console.log(saudacao.obterSaudacao());
//# sourceMappingURL=questao6.js.map