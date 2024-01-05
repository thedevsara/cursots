export interface Tributavel {
    calcularTributos(): number

}

export class Conta {
    private _nome: string;
    private _saldo: number;

    constructor(nome: string, saldo: number) {
        this._nome = nome;
        this._saldo = saldo;

    }

    getSaldo(): number {
        return this._saldo;
    }

    setSaldo(saldo: number) {
        this._saldo = saldo;
    }

    getNome(): string {
        return this._nome;  
    }

    setNome(nome: string) {
        this._nome = nome;
    }
}   

export class contaCorrente extends Conta implements Tributavel {
    calcularTributos(): number {
        return this.getSaldo() * 10/100
    }

}

export class seguroDeVida implements Tributavel {
    public calcularTributos(): number {
        return 50;

    }
}

