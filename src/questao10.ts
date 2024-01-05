class Jogador {
    forca: number = 0;
    nivel: number = 0;
    pontosAtuais: number= 0;

    constructor(forca: number, nivel: number, pontosAtuais: number){
        this.forca = forca;
        this.nivel = forca;
        this.pontosAtuais = pontosAtuais;
    }
    calcularAtaque(): number {
        return this.forca * this.nivel;
    }

    atacar(atacado: Jogador): void {
        if (atacado.estaComVida()) {
          const totalDano = this.calcularAtaque();
          atacado.pontosAtuais -= totalDano;
          console.log(`O ataque causou ${totalDano} de dano.`);
        } else {
          console.log("O jogador não pode ser atacado. HE DIED!");
        }
      }

    estaComVida(): boolean {
        return this.pontosAtuais > 0;
    }

    toString(): string{
        return `Força: ${this.forca} , Nível: ${this.nivel}, Pontos Atuais: ${this.pontosAtuais}`;
    }
}

const jogadorX = new Jogador(20, 10, 100);
const jogadorY = new Jogador(25, 9, 130);

console.log("Jogador X:",jogadorX.toString());
console.log("Jogador Y:", jogadorY.toString());
console.log("\n")

jogadorX.atacar(jogadorY);
jogadorY.atacar(jogadorX);
console.log("\n")

console.log("Jogador X:",jogadorX.toString());
console.log("Jogador Y:", jogadorY.toString());
console.log("\n")

if (jogadorX.pontosAtuais > jogadorY.pontosAtuais) {
console.log("O jogador X tem mais pontos.");
} else if (jogadorY.pontosAtuais > jogadorX.pontosAtuais) {
console.log("O Jogador Y tem mais pontos.");
} else {
console.log("Os dois jogadores têm a mesma quantidade de pontos.");
}

