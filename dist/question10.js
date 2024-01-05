"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seguroDeVida = exports.contaCorrente = exports.Conta = void 0;
class Conta {
    constructor(nome, saldo) {
        this._nome = nome;
        this._saldo = saldo;
    }
    getSaldo() {
        return this._saldo;
    }
    setSaldo(saldo) {
        this._saldo = saldo;
    }
    getNome() {
        return this._nome;
    }
    setNome(nome) {
        this._nome = nome;
    }
}
exports.Conta = Conta;
class contaCorrente extends Conta {
    calcularTributos() {
        return this.getSaldo() * 10 / 100;
    }
}
exports.contaCorrente = contaCorrente;
class seguroDeVida {
    calcularTributos() {
        return 50;
    }
}
exports.seguroDeVida = seguroDeVida;
//# sourceMappingURL=question10.js.map