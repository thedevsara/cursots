class Saudacao {
    texto: string;
    destinatario: string;

    constructor(texto: string, destinatario: string){
        this.texto = texto;
        this.destinatario = destinatario;
    }

    obterSaudacao(): string{
        return `${this.texto}, ${this.destinatario}`;
    }
}
    let saudacao: Saudacao = new Saudacao('Feliz Aniversário', 'Sara!');
    console.log(saudacao.obterSaudacao());
    
