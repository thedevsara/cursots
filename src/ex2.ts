function verificarPrimo(numero: number): boolean {
    if(numero<=1){ // não são primos
        return false;
    }
    for (let i = 2; i <= numero/2; i++) {
      if (numero % i === 0) {
        return false; 
      }
    }
  
    return true; 
  }

  console.log(verificarPrimo(2)); 
  console.log(verificarPrimo(3)); 
  