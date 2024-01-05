class Hotel {
    quantReservas : number;

    constructor(valorInicial: number){
        this.quantReservas = valorInicial;
    }
    adicionarReserva() : void {
        this.quantReservas++;
    }
}
    let hotel: Hotel = new Hotel(10);
    console.log(hotel.quantReservas); 

