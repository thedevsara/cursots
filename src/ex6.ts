function exibir(...valores: string[]): void {
  for(let i = 0; i<valores.length; i++){
    console.log(valores[i]);
  };
}

exibir("a", "b");
exibir("a", "b", "c");
exibir("a", "b", "c", "d");
