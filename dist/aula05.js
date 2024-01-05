"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
class Conta {
    constructor(numero, nome, saldo) {
        this.numero = numero;
        this.nome = nome;
        this.saldo = saldo;
    }
    depositar(valor) {
        this.saldo = this.saldo + valor;
    }
    sacar(valor) {
        if (this.saldo - valor < 0) {
            return false;
        }
        this.saldo = this.saldo - valor;
        return true;
    }
    consultarSaldo() {
        return this.saldo;
    }
    transferir(contaDestino, valor) {
        if (!this.sacar(valor)) {
            return false;
        }
        contaDestino.depositar(valor);
        return true;
    }
}
exports.Conta = Conta;
let c1 = new Conta("1", "ely", 100);
let c2 = new Conta("2", "joao", 200);
let c3;
c1 = c2;
c3 = c1;
c1.sacar(10); //saldo de 190
c1.transferir(c2, 50);
console.log(c1.consultarSaldo()); //190
console.log(c2.consultarSaldo()); //190
console.log(c3.consultarSaldo()); //190
//# sourceMappingURL=aula05.js.map