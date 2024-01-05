"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Empregado {
    constructor() {
        this.salario = 500;
    }
    calcularSalario() {
        return this.salario;
    }
}
class Diarista extends Empregado {
    calcularSalario() {
        return super.calcularSalario() / 30;
    }
}
class Horista extends Diarista {
    calcularSalario() {
        return super.calcularSalario() / 24;
    }
}
//# sourceMappingURL=questao1.js.map