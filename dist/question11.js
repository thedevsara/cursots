"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question10_1 = require("./question10");
class AuditoriaInterna {
    constructor() {
        this.tributaveis = [];
    }
    adicionar(tributavel) {
        this.tributaveis.push(tributavel);
    }
    calcularTributos() {
        let somatorio_tributos = 0;
        for (let tributo of this.tributaveis) {
            somatorio_tributos += tributo.calcularTributos();
        }
        return somatorio_tributos;
    }
}
const _contaCorrente = new question10_1.contaCorrente("Sara", 200);
const _seguroDeVida = new question10_1.seguroDeVida();
const _auditoriaInterna = new AuditoriaInterna();
_auditoriaInterna.adicionar(_contaCorrente);
_auditoriaInterna.adicionar(_seguroDeVida);
console.log(`Resultado da soma dos tributos: R$ ${_auditoriaInterna.calcularTributos()}`);
//# sourceMappingURL=question11.js.map