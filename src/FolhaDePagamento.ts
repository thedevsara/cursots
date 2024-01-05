import {Pessoa} from "./Pessoa.js"
import {Funcionario} from "./Funcionario.js"
import {Professor} from "./Professor.js"

class FolhaDePagamento{
    private pessoas:Pessoa[]=[]

    constructor(pessoas: Pessoa[]){
        this.pessoas=pessoas
    }

    getPessoas():Pessoa[]{
        return this.pessoas
    }

    calcularPagamentos(){
        let soma_total_dos_salarios=0;

        for (const pessoa_atual of this.pessoas) {
            if(pessoa_atual instanceof Funcionario && pessoa_atual instanceof Professor==false){
                soma_total_dos_salarios+=pessoa_atual.getSalario()
                console.log(pessoa_atual)
            }
            else if(pessoa_atual instanceof Professor){
                soma_total_dos_salarios+=pessoa_atual.getSalario()
                console.log(pessoa_atual)
            }
        }

        return soma_total_dos_salarios
    }
}

let pessoa=new Pessoa("Sara","Vieira")
let funcionario=new Funcionario("Rubens","Vieira","2022-1",1320)
let professor=new Professor("José","Flávio","2014-2",5000,"Matemática")

let lista_de_pessoas: Pessoa[]= [pessoa,funcionario,professor]

let folha=new FolhaDePagamento(lista_de_pessoas)

console.log(folha)

console.log(`R$ ${folha.calcularPagamentos()}`)