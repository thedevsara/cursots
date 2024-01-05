"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function retornarNum(array) {
    let resultado = "";
    array.forEach((numero, index) => {
        if (index !== 0) {
            resultado += "-";
        }
        resultado += numero.toString();
    });
    return resultado;
}
const numeros = [5, 10, 15, 20, 25];
const resultadoFormatado = retornarNum(numeros);
console.log(resultadoFormatado);
//# sourceMappingURL=ex4.js.map