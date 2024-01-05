"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Equipamento {
    constructor(ligado) {
        this.ligado = false;
    }
    liga() {
        if (!this.ligado) {
            this.ligado = true;
            console.log("Equipamento Ligado!");
        }
        else {
            console.log("O equipamento já está ligado!");
        }
    }
    desliga() {
        if (this.ligado) {
            this.ligado = false;
            console.log("Equipamento Desligado!");
        }
        else {
            console.log("O equipamento já está ligado!");
        }
    }
    inverte() {
        this.ligado = !this.ligado;
        if (this.ligado) {
            console.log("Equipamento Ligado!");
        }
        else {
            console.log("Equipamento Desligado");
        }
    }
    novoLigado() {
        return this.ligado;
    }
}
const equipamento = new Equipamento(false);
console.log("O equipamento está ligado?", equipamento.novoLigado());
equipamento.liga();
equipamento.desliga();
console.log("O equipamento está ligado?", equipamento.novoLigado());
equipamento.inverte();
console.log("O equipamento está ligado?", equipamento.novoLigado());
//# sourceMappingURL=questao8.js.map