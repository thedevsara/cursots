class Radio {
    volume : number;
    constructor(volume : number) {
    this.volume = volume;
    
    }
    }
    let r : Radio = new Radio(2); //Para corrigir o problema é necessario passar um valor númerico como argumento para o construtor.
    r.volume = 10;