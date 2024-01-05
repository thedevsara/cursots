
interface IComparavel {
    comparar(novaForma: FiguraGeometrica): number;

}

interface FiguraGeometrica {
    calcularArea(): number;
    calcularPerimetro(): number;

}

class Quadrado implements FiguraGeometrica, IComparavel {
    lado: number;

    constructor(lado: number){
        this.lado = lado;
    }

    calcularArea(): number {
        return this.lado * this.lado;

    }

    calcularPerimetro(): number {
        return 4 * this.lado;
    }

    comparar(novaForma: FiguraGeometrica): number {
        let minhaArea = this.calcularArea();
        let areaNovaForma = novaForma.calcularArea();

        if(minhaArea < areaNovaForma){
            return -1;
        }else if(minhaArea > areaNovaForma){
            return -1;
        }else {
            return 0;
        }
    }
}

class Triangulo implements FiguraGeometrica, IComparavel {
    a: number ;
    b: number ;
    c: number ;

    constructor(a: number, b: number, c: number){
        this.a = a;
        this.b = b;
        this.c = c;

    }

    calcularArea(): number {
        const s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    calcularPerimetro(): number {
        return this.a + this.b + this.c;
    }

    comparar(outraForma: FiguraGeometrica): number {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();

        if (minhaArea < areaOutraForma) {
            return -1;
        } else if (minhaArea > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}

class Circulo implements FiguraGeometrica, IComparavel {
    raio: number;

    constructor(raio: number) {
        this.raio = raio;
    }

    calcularArea(): number {
        return Math.PI * this.raio * this.raio;
    }

    calcularPerimetro(): number {
        return 2 * Math.PI * this.raio;
    }

    comparar(outraForma: FiguraGeometrica): number {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();

        if (minhaArea < areaOutraForma) {
            return -1;
        } else if (minhaArea > areaOutraForma) {
            return 1;
        } else {
            return 0;
        }
    }
}

class Retangulo implements FiguraGeometrica, IComparavel {
    base: number;
    altura: number;

    constructor(base: number, altura: number) {
        this.base = base;
        this.altura = altura;
    }

    calcularArea(): number {
        return this.base * this.altura;
    }

    calcularPerimetro(): number {
        return 2 * (this.base + this.altura);
    }

    comparar(outraForma: FiguraGeometrica): number {
        const minhaArea = this.calcularArea();
        const areaOutraForma = outraForma.calcularArea();

        if (minhaArea < areaOutraForma) {
            return -1;
        } else if (minhaArea > areaOutraForma) {
            return 1;
        } else {
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