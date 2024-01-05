import { Tributavel , contaCorrente, seguroDeVida } from "./question10"

class AuditoriaInterna {
    tributaveis: Tributavel[] = [];

    adicionar(tributavel: Tributavel) {
        this.tributaveis.push(tributavel);
    }

    calcularTributos() {
        let somatorio_tributos: number = 0 
        for(let tributo of this.tributaveis){
            somatorio_tributos += tributo.calcularTributos();
        }

        return somatorio_tributos;
    }
}

const _contaCorrente = new contaCorrente("Sara" , 200);
const _seguroDeVida = new seguroDeVida();
const _auditoriaInterna = new AuditoriaInterna();

_auditoriaInterna.adicionar(_contaCorrente);
_auditoriaInterna.adicionar(_seguroDeVida);

console.log(`Resultado da soma dos tributos: R$ ${_auditoriaInterna.calcularTributos()}`)