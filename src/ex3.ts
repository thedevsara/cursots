function tratamento(nome : string, pronome: string = "Sr"): void {
    console.log(`${pronome}. ${nome}`);
}

tratamento("Sara" , "Dra");
tratamento("Sara");