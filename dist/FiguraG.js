"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Quadrado {
    constructor(lado) {
        this.lado = lado;
    }
    calcularArea() {
        return this.lado * this.lado;
    }
    calcularPerimetro() {
        return 4 * this.lado;
    }
}
class Triangulo {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    calcularArea() {
        const s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    calcularPerimetro() {
        return this.a + this.b + this.c;
    }
}
class Circulo {
    constructor(raio) {
        this.raio = raio;
    }
    calcularArea() {
        return Math.PI * this.raio * this.raio;
    }
    calcularPerimetro() {
        return 2 * Math.PI * this.raio;
    }
}
class Retangulo {
    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return this.base * this.altura;
    }
    calcularPerimetro() {
        return 2 * (this.base + this.altura);
    }
}
// Exemplo de uso
const quadrado = new Quadrado(5);
console.log("Área do quadrado:", quadrado.calcularArea());
console.log("Perímetro do quadrado:", quadrado.calcularPerimetro());
const triangulo = new Triangulo(5, 7, 8);
console.log("Área do triângulo:", triangulo.calcularArea());
console.log("Perímetro do triângulo:", triangulo.calcularPerimetro());
const circulo = new Circulo(4);
console.log("Área do círculo:", circulo.calcularArea());
console.log("Perímetro do círculo:", circulo.calcularPerimetro());
const retangulo = new Retangulo(6, 8);
console.log("Área do retângulo:", retangulo.calcularArea());
console.log("Perímetro do retângulo:", retangulo.calcularPerimetro());
//# sourceMappingURL=FiguraG.js.map