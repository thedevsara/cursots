const array1 = [5, 8 , 11, 14, 17];

const dobrarElementos = array1.map(numero => numero * 2);


const resultado = dobrarElementos.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);

console.log(dobrarElementos);
console.log(resultado);