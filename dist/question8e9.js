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
    comparar(novaForma) {
        let minhaArea = this.calcularArea();
        let areaNovaForma = novaForma.calcularArea();
        if (minhaArea < areaNovaForma) {
            return -1;
        }
        else if (minhaArea > areaNovaForma) {
            return -1;
        }
        else {
            return 0;
        }
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
    comparar(outraForma) {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();
        if (minhaArea < areaOutraForma) {
            return -1;
        }
        else if (minhaArea > areaOutraForma) {
            return 1;
        }
        else {
            return 0;
        }
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
    comparar(outraForma) {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();
        if (minhaArea < areaOutraForma) {
            return -1;
        }
        else if (minhaArea > areaOutraForma) {
            return 1;
        }
        else {
            return 0;
        }
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
    comparar(outraForma) {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();
        if (minhaArea < areaOutraForma) {
            return -1;
        }
        else if (minhaArea > areaOutraForma) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
const quadrado1 = new Quadrado(5);
const quadrado2 = new Quadrado(3);
const triangulo = new Triangulo(5, 7, 8);
console.log("Área do triângulo:", triangulo.calcularArea());
console.log("Perímetro do triângulo:", triangulo.calcularPerimetro());
const circulo = new Circulo(4);
console.log("Área do círculo:", circulo.calcularArea());
console.log("Perímetro do círculo:", circulo.calcularPerimetro());
const retangulo = new Retangulo(6, 8);
console.log("Área do retângulo:", retangulo.calcularArea());
console.log("Perímetro do retângulo:", retangulo.calcularPerimetro());
console.log("Comparação de áreas do retângulo com o quadrado:", retangulo.comparar(quadrado1));
//# sourceMappingURL=question8e9.js.map