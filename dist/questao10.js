"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Jogador {
    constructor(forca, nivel, pontosAtuais) {
        this.forca = 0;
        this.nivel = 0;
        this.pontosAtuais = 0;
        this.forca = forca;
        this.nivel = forca;
        this.pontosAtuais = pontosAtuais;
    }
    calcularAtaque() {
        return this.forca * this.nivel;
    }
    atacar(atacado) {
        if (atacado.estaComVida()) {
            const totalDano = this.calcularAtaque();
            atacado.pontosAtuais -= totalDano;
            console.log(`O ataque causou ${totalDano} de dano.`);
        }
        else {
            console.log("O jogador não pode ser atacado. HE DIED!");
        }
    }
    estaComVida() {
        return this.pontosAtuais > 0;
    }
    toString() {
        return `Força: ${this.forca} , Nível: ${this.nivel}, Pontos Atuais: ${this.pontosAtuais}`;
    }
}
const jogadorX = new Jogador(20, 10, 100);
const jogadorY = new Jogador(25, 9, 130);
console.log("Jogador X:", jogadorX.toString());
console.log("Jogador Y:", jogadorY.toString());
console.log("\n");
jogadorX.atacar(jogadorY);
jogadorY.atacar(jogadorX);
console.log("\n");
console.log("Jogador X:", jogadorX.toString());
console.log("Jogador Y:", jogadorY.toString());
console.log("\n");
if (jogadorX.pontosAtuais > jogadorY.pontosAtuais) {
    console.log("O jogador X tem mais pontos.");
}
else if (jogadorY.pontosAtuais > jogadorX.pontosAtuais) {
    console.log("O Jogador Y tem mais pontos.");
}
else {
    console.log("Os dois jogadores têm a mesma quantidade de pontos.");
}
//# sourceMappingURL=questao10.js.map