class Triangulo {
    a: number = 0;
    b: number = 0;
    c: number = 0;

    constructor(a: number, b: number, c: number){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    formatoTriangulo(): boolean{
        return this.b - this.c < this.a && this.a < this.b + this.c;
    }
    isosceles(): boolean { // apresenta dois lados equivaletes.
        if (this.formatoTriangulo()) {
          return this.a === this.b || this.a === this.c || this.b === this.c;
        }
        return false;
      }
    
    equilatero(): boolean { // apresenta todos os lados equivalentes.
        if (this.formatoTriangulo()) {
          return this.a === this.b && this.a === this.c;
        }
        return false;
      }
    
    escaleno(): boolean { // todos os lados são diferentes.
        if (this.formatoTriangulo()) {
          return this.a !== this.b && this.a !== this.c && this.b !== this.c;
        }
        return false;
      }
    }
    
    const trianguloA = new Triangulo(10, 10, 20);
    console.log("É um triângulo:",trianguloA.formatoTriangulo());
    console.log("É Isósceles:",trianguloA.isosceles());
    console.log("É Equilátero:", trianguloA.equilatero());
    console.log("É Escaleno:", trianguloA.escaleno());

