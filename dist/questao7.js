"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Triangulo {
    constructor(a, b, c) {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.a = a;
        this.b = b;
        this.c = c;
    }
    formatoTriangulo() {
        return this.b - this.c < this.a && this.a < this.b + this.c;
    }
    isosceles() {
        if (this.formatoTriangulo()) {
            return this.a === this.b || this.a === this.c || this.b === this.c;
        }
        return false;
    }
    equilatero() {
        if (this.formatoTriangulo()) {
            return this.a === this.b && this.a === this.c;
        }
        return false;
    }
    escaleno() {
        if (this.formatoTriangulo()) {
            return this.a !== this.b && this.a !== this.c && this.b !== this.c;
        }
        return false;
    }
}
const trianguloA = new Triangulo(10, 10, 20);
console.log("É um triângulo:", trianguloA.formatoTriangulo());
console.log("É Isósceles:", trianguloA.isosceles());
console.log("É Equilátero:", trianguloA.equilatero());
console.log("É Escaleno:", trianguloA.escaleno());
//# sourceMappingURL=questao7.js.map