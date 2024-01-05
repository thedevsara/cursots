"use strict";
class Conta {
    constructor(numero, saldoInicial) {
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    sacar(valor) {
        this.saldo -= valor;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    consultarSaldo() {
        return this.saldo;
    }
}
let c1 = new Conta("1", 100);
let c2 = new Conta("2", 100);
let c3 = new Conta("3", 100);
c1 = c2;
c3 = c1;
c1.sacar(10);
c1.transferir(c2, 20);
console.log("Saldo de c1:", c1.consultarSaldo());
console.log("Saldo de c2:", c2.consultarSaldo());
console.log("Saldo de c3:", c3.consultarSaldo());
//# sourceMappingURL=questao5.js.map