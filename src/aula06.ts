import {Conta} from './aula05';
/*
let conta1: Conta = new Conta("1", 0);
let banco: Conta[] = [];
banco[0] = conta1;

banco.push(new Conta("2", 100));
console.log(banco[1].consultarSaldo());

console.log(banco[10].saldo);
*/

class Banco {
    contas: Conta[] = []

    inserir(conta: Conta): void {
        const contaExistente = this.consultar(conta.numero);
        if (contaExistente) {
            console.log("ESSA CONTA JÁ EXISTE.");
            return;
        }
        this.contas.push(conta);
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                contaProcurada = this.contas[i];
                break;
            }
        }

        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    alterar(conta: Conta): void {
        let indiceProcurado: number =
                this.consultarPorIndice(conta.numero);
        
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado] = conta;
        }
    }

    excluir(numero: string): void {
        let indiceProcurado = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i+1];
            }
            this.contas.pop();
            
        }
    }

    sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            let conta: Conta = this.contas[indiceProcurado];
            conta.sacar(valor);
        }
    }
    transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
        let contaCredito = this.consultar(numeroCredito);
        let contaDebito = this.consultar(numeroDebito);

        if (contaCredito && contaDebito) {
            contaCredito.transferir(contaDebito, valor);
        }
    }

    quantidadeContas(): number {
        return this.contas.length;
    }

    totalDinheiroDepositado(): number {
        let total: number = 0;

        for (let i = 0; i < this.contas.length; i++) {
            total += this.contas[i].saldo;
        }

        return total;
    }

    mediaSaldoContas(): number {
        let quantidade: number = this.quantidadeContas();
        let total: number = this.totalDinheiroDepositado();

        return total / quantidade;
    }
}



let b: Banco = new Banco();
b.inserir(new Conta("11111-2", "ely", 100));
//console.log(b.consultar("11111-2"));
//console.log(b.consultar("22222-2"));

let contaAlterada:  Conta | null= b.consultar("11111-2");

contaAlterada.nome = "ely da silva miranda";

b.alterar(contaAlterada)
//console.log(b.consultar("11111-2"));

b.inserir(new Conta("22222-2", "joao", 200));
b.inserir(new Conta("33333-3", "maria", 300));

//console.log(b.contas);
//b.excluir("11111-2");
b.sacar("33333-3", 50)
console.log(b.consultar("33333-3"));
