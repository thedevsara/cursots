function soma(x: number, y?: any): number {
    return x + y
    }
    console.log(soma(1, 2)); // vai realizar a soma e exibir o número: 3
    console.log(soma(1, "2")); // concatenação: vai retornar "12" 
    console.log(soma(1)); // resuta em NaN(not a number)