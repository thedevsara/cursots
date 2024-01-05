"use strict";
class Conta {
    constructor(numero, saldoInicial) {
        this.numero = numero;
        this.saldo = saldoInicial;
    }
    sacar(valor) {
        if (valor > 0 && this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        else {
            console.log("Saldo insuficiente!");
            return false;
        }
    }
    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
        }
    }
    transferir(contaDestino, valor) {
        const saqueRealizado = this.sacar(valor);
        if (saqueRealizado) {
            contaDestino.depositar(valor);
            return true;
        }
        else {
            console.log("Saldo insuficiente.");
            return false;
        }
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
c1.transferir(c2, 50);
if (c1.sacar(10)) {
    console.log("Saque de 10 na conta 1 realizado.");
}
else {
    console.log("Saque de 10 na conta 1 não foi possível.");
}
if (c1.transferir(c2, 50)) {
    console.log("Transferência de conta 1 para conta 2 realizada.");
}
else {
    console.log("Transferência de conta 1 para conta 2 não foi possível.");
}
console.log("Saldo da Conta 1:", c1.consultarSaldo()); // Deve imprimir "Saldo de c1: 70"
console.log("Saldo da Conta 2:", c2.consultarSaldo()); // Deve imprimir "Saldo de c2: 120"
console.log("Saldo da Conta 3:", c3.consultarSaldo()); // Deve imprimir "Saldo de c3: 70"
//# sourceMappingURL=questao9.js.map