"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hotel {
    constructor(valorInicial) {
        this.quantReservas = valorInicial;
    }
    adicionarReserva() {
        this.quantReservas++;
    }
}
let hotel = new Hotel(10);
console.log(hotel.quantReservas);
//# sourceMappingURL=questao3.js.map