"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verificarPrimo(numero) {
    if (numero <= 1) { // não são primos
        return false;
    }
    for (let i = 2; i <= numero / 2; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}
console.log(verificarPrimo(2));
console.log(verificarPrimo(3));
//# sourceMappingURL=ex2.js.map