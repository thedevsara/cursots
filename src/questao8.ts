class Equipamento {
    ligado: boolean;

    constructor(ligado: boolean){
        this.ligado = false;
    }
    liga(): void {
        if(!this.ligado){
            this.ligado = true;
            console.log("Equipamento Ligado!");
        }else{
            console.log("O equipamento já está ligado!");
        }  
    }

    desliga(): void {
        if(this.ligado){
            this.ligado = false;
            console.log("Equipamento Desligado!");
        }else{
            console.log("O equipamento já está ligado!");
        }
    }

    inverte(): void {
        this.ligado = !this.ligado
        if(this.ligado){
            console.log("Equipamento Ligado!");
        }else{
            console.log("Equipamento Desligado");  
        }
    }

        novoLigado(): boolean {
            return this.ligado;

        }
    }

    const equipamento = new Equipamento(false);
    console.log("O equipamento está ligado?", equipamento.novoLigado()); 
    equipamento.liga(); 

    equipamento.desliga();
    console.log("O equipamento está ligado?", equipamento.novoLigado());  
    
    equipamento.inverte(); 
    console.log("O equipamento está ligado?", equipamento.novoLigado()); 
    
    



    

    

        

   