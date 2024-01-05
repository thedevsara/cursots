import { log } from "console";

import prompt from 'prompt-sync';
let input = prompt()



class Perfil {
    private _id : number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem[] = [];
    private _seguidores: Perfil[] = [];

    constructor(_id : number, _nome : string, _email : string){

        this._id = _id;
        this._nome = _nome;
        this._email= _email;

    }


        getId(){
            return this._id;
        }

        getNome(){
            return this._nome;
        }

        getEmail() {
            return this._email;

        }

        setNome(nome: string){
            this._nome = nome;
        }

        setEmail(email: string) {
            this._email = email;
        }

        getPostagens(){
            return this._postagens;
        }

        adicionarPostagens(nova_postagem: Postagem) {
            if(this.verificarSePostagemExiste(nova_postagem)){
                return
            }
            this._postagens.push(nova_postagem)
        }

        verificarSePostagemExiste(nova_postagem: Postagem) {
            let resultado_da_consulta: boolean = false
            for(const postagem_atual of this._postagens){
                if(postagem_atual.getId()== nova_postagem.getId()) {
                    resultado_da_consulta = true;
                }
            }
            return resultado_da_consulta;


         }  
         
         seguir(perfil: Perfil): void {
            if (!this._seguidores.includes(perfil)) {
                this._seguidores.push(perfil);
            }
        }
    
        deixarDeSeguir(perfil: Perfil): void {
            const index = this._seguidores.indexOf(perfil);
            if (index !== -1) {
                this._seguidores.splice(index, 1);
            }
        }
    
        listarSeguidores(): Perfil[] {
            return this._seguidores;
        }
    
        exibirTimeline(): Postagem[] {
            const timeline: Postagem[] = [];
            for (const perfilSeguido of this._seguidores) {
                timeline.push(...perfilSeguido.getPostagens());
            }
            timeline.sort((a, b) => b.getData().getTime() - a.getData().getTime());
            return timeline;
        }
    }
    

    class Postagem {
        private _id: number;
        private _texto: string;
        private _curtidas: number;
        private _descurtidas: number;
        private _data: Date;
        private _perfil: Perfil;
        private _comentarios: string[];
    
    
        constructor(_id: number, _texto: string, _curtidas: number,  
            _descurtidas:number, _data: Date, _perfil: Perfil) {
            this._id = _id;
            this._texto = _texto;
            this._curtidas = _descurtidas;
            this._descurtidas = _descurtidas;
            this._data = _data;
            this._perfil = _perfil;
            this._comentarios = [];
             }
    
    
        getId(): number {
            return this._id;
        }
    
        getTexto(): string {
            return this._texto;
        }
        setTexto(novo_texto : string) {
            this._texto = novo_texto;
        }
    
    
        getCurtidas(): number {
    
            return this._curtidas;
        }
    
        getDescurtidas(): number {
            return this._descurtidas;
        }
    
        getData(): Date {
            return this._data;
        }
    
        getPerfil(): Perfil {
            return this._perfil;
    
        }
    
        public curtir(): void {
            this._curtidas++;
        }
    
    
        public descurtir(): void {
            this._descurtidas++;
        }
    
        public ehPopular(){
            return this._curtidas > this._descurtidas * 1.5
        }
    
        adicionarComentario(comentario: string): void {
            this._comentarios.push(comentario);
        }
    
        getComentarios(): string[] {
            return this._comentarios;
        }
    }

    class PostagemAvancada extends Postagem{

        private _hashtags: string[];
        private _visualizacoesRestantes: number;
       // quantas vezes ela poderá ser exibida até expirar;
    
        constructor(_id: number, _texto: string, _curtidas: number,  _descurtidas:number, 
            _data: Date, _perfil: Perfil, _hashtags:string[], _visualizacoesRestantes:number) {
            super(_id, _texto, _curtidas, _descurtidas, _data,  _perfil);
            this._visualizacoesRestantes = _visualizacoesRestantes;
            this._hashtags = _hashtags;
    
        }
    
        getHashtagParaString(){
            let soma_hashtags = "";
            for(const hashtag_atual of this._hashtags){
                soma_hashtags += hashtag_atual + " ";
            }
    
            return soma_hashtags;
        }

    
        getVisualizacoesRestantes(): number  {
            return this._visualizacoesRestantes;
        }
        setVisualizacoesRestantes(nova_visualizacao: number) {
            this._visualizacoesRestantes = nova_visualizacao;
        }
    
    
        public addHashtag(_hashtag:string): void {
            this._hashtags.push(_hashtag);
    
        }
        public existeHashtag(_hashtag:string): boolean {
            return this._hashtags.includes(_hashtag);
        }
    
        public decrementarVisualizacoes(): void {
            this._visualizacoesRestantes--;
    
        }
    
    }

    class RepositorioDePerfis {
        private _perfis: Perfil[];
    
    
         constructor(_perfis: Perfil[]){
             this._perfis = _perfis;
         }
    
         getPerfis(){
             return [...this._perfis];
         }
    
         setPerfis(novo_perfil: Perfil[]){
            this._perfis = novo_perfil
         }
     
    
         public incluir(perfil: Perfil): void {
             this._perfis.push(perfil);
         }
    
         consultarPorNome(nome_procurado: string){
            let resultado_da_consulta:Perfil | null=null
            for (const perfil_atual of this._perfis) {
                if(perfil_atual.getNome()==nome_procurado){
                    resultado_da_consulta=perfil_atual
                }
            }
            return resultado_da_consulta
        }
        consultarPorId(id: number){
            let resultado_da_consulta: Perfil | null=null;
                for (const perfil_atual of this._perfis) {
                    if(perfil_atual.getId()==id){
                        resultado_da_consulta=perfil_atual
                    }
                }
            return resultado_da_consulta
        }
    
         public consultar(_id?: number, _nome?: string, _email?: string): Perfil | null {
    
             for(let i=0; i<this._perfis.length; i++) {
                 const perfil = this._perfis[i];
    
                 if(
                 (_id !== undefined && perfil.getId()  !== _id) ||
                 (_nome !== undefined && perfil.getNome() !== _nome) ||
                 (_email !== undefined && perfil.getEmail() !== _email)
                 ) {
                     return perfil;
                 }
             }
         return null;
     }
         public excluirPerfil(nome: string): void {
            const index = this._perfis.findIndex(perfil => perfil.getNome() === nome);
            if(index !== -1) {
                this._perfis.splice(index, 1);
            }
        }
    
    }

    class RepositorioDePostagens {
        private _postagens: Postagem[];
    
        constructor(postagens: Postagem[]) {
            this._postagens = postagens;
        }
    
        getPostagens(): Postagem[] {
            return [...this._postagens];
        }
    
        setPostagens(lista_de_postagens: Postagem[]){
            if(Array.isArray(lista_de_postagens)){
            this._postagens = lista_de_postagens;
            }
    
        }
    
        public incluir(postagem: Postagem): void {
            if(this.consultarPorID(postagem.getId())!==null) {
                return 
            }
    
    
            this._postagens.push(postagem);
        }
    
        consultarPorID(id: number): Postagem|null {
            let resultado_da_consulta: Postagem | null = null;
            for (const postagem_atual of this._postagens) {
                if(postagem_atual.getId() == id){
                    resultado_da_consulta = postagem_atual
                }
            }
    
            return resultado_da_consulta
        }
    
        excluirPostagem(id: number): void {
            const index = this._postagens.findIndex((postagem) => postagem.getId() === id);
            if (index !== -1) {
                this._postagens.splice(index, 1);
            }
        }
    
        curtir(id: number): void {
            const postagem = this.consultarPorID(id);
            if (postagem !== null) {
                postagem.curtir();
            }
        }
    
        descurtir(id: number): void {
            const postagem = this.consultarPorID(id);
            if (postagem !== null) {
                postagem.descurtir();
            }
        }
    
    
    
        public consultar(_id?: number, _texto?: string, _hashtag?: string, perfil?: Perfil): Postagem[] {
    
            const postagemFiltradas: Postagem[] = [];
    
            for(let i=0; i< this._postagens.length; i++) {
                const postagem = postagemFiltradas[i];
    
                if(_id !== undefined && postagem.getId() !== _id) {
                    continue;
                }
                if(_texto !== undefined && postagem.getTexto().includes(_texto)) {
                    continue;
                }
                if(_hashtag !== undefined) {
                    if(postagem instanceof PostagemAvancada) {
                        const postagemAvancada =postagem as PostagemAvancada;
                        if(!postagemAvancada.existeHashtag(_hashtag)) {
                            continue;
                        }
                    }else {
                        continue
                    }
                }
                if(perfil !== undefined && postagem.getPerfil() !== perfil) {
                    continue;
                }
    
                postagemFiltradas.push(postagem);
            }
    
            return postagemFiltradas;
        }
      
    }

    class RedeSocial {

        private _repositorioDePostagens: RepositorioDePostagens;
        private _repositorioDePerfis: RepositorioDePerfis;
    
        constructor(repositorioDePostagens: RepositorioDePostagens, repositorioDePerfis: RepositorioDePerfis) {
            this._repositorioDePostagens = repositorioDePostagens;
            this._repositorioDePerfis = repositorioDePerfis;
        }
    
        getRepositorioDePerfis(){
    
            return this._repositorioDePerfis;
        }
    
        getRepositorioDePostagens(){
    
            return this._repositorioDePostagens;
        }
    
    
    incluirPerfil(perfil:Perfil): boolean {
        if(this._repositorioDePerfis.consultarPorNome(perfil.getNome()) == null) {
            this._repositorioDePerfis.incluir(perfil);
            return true;
        }

        return false;
        
    }
    
    consultarPerfil(_id: number, _nome: string, _email: string) : Perfil | null {
        let pesquisa = this._repositorioDePerfis.consultar(_id, _nome, _email);
        if(pesquisa == null){
            return null;
        }else{
            return pesquisa;
        }
    }
    
    incluirPostagem(postagem: Postagem): boolean {
        if(postagem.getId() == undefined){
            return false;
        }else{
            this._repositorioDePostagens.incluir(postagem);    
            return true;
        }
    }
    
    consultarPostagens(_id: number, _texto: string, _hashtag: string, perfil: Perfil): Postagem[]{
        return this._repositorioDePostagens.consultar(_id, _texto, _hashtag, perfil)
    }
    
    
    curtirPostagem(idPostagem: number): void {
        let postagem = this._repositorioDePostagens.consultarPorID(idPostagem);
        if(postagem){
            postagem.curtir();
            console.log("Você curtiu essa postagem <3!");
        }else{
            console.log("A postagem não existe! :(");
            
        }
            
    }
    
    descurtirPostagem(idPostagem: number): void {
        let postagem = this._repositorioDePostagens.consultarPorID(idPostagem);
    
        if (postagem) {
            postagem.descurtir();
            console.log("Você descurtiu essa postagem :(");
        } else {
            console.log("A postagem não existe");
        }
    }
    
    decrementarVisualizacoes(postagem: PostagemAvancada): void {
       
        if(postagem.getVisualizacoesRestantes()>0){
        postagem.decrementarVisualizacoes();
        }
            
    }
    
    exibirPostagensPorPerfil(id:number): Postagem[] {
    
        let postagens = this._repositorioDePostagens.getPostagens();
        let postsExibiveis: Postagem[] = [];
    
        for(let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
    
            if(post.getPerfil().getId() === id) {
                if(post instanceof PostagemAvancada) {
                    let postagemAvancada = post as PostagemAvancada;
                    if(postagemAvancada.getVisualizacoesRestantes()>=0){
                        this.decrementarVisualizacoes(postagemAvancada);
                        postsExibiveis.push(postagemAvancada);
                    }
                }else {
                    postsExibiveis.push(post);
                }
            }
        }
    
        return postsExibiveis;
    }
    
    
    exibirPostagensPorHashtags(_hashtag: string): Postagem[] {
        let postagens = this._repositorioDePostagens.getPostagens();
        let postsExibiveis: PostagemAvancada[] = [];
    
        for(let i=0; i<postagens.length; i++) {
            let post = postagens[i];
    
            if(post instanceof PostagemAvancada) {
                if(post.existeHashtag(_hashtag) && post.getVisualizacoesRestantes()>0) {
                    this.decrementarVisualizacoes(post);
                        postsExibiveis.push(post);
                }
            }
        }
        return postsExibiveis;  
    }
    
}
    

 class App {
    private redeSocial: RedeSocial;

    constructor(redeSocial: RedeSocial) {
        this.redeSocial = redeSocial;
    }


   mostrarMenu(): void {

        while(true){
        console.log("\n \n \n");
        console.log("   ______  ______  ______");
        console.log("  /  __  \\/  __  \\/  __  \\");
        console.log(" |  /__| |  /__| |  /__| |");
        console.log(" | /     | /     | /     |");
        console.log(" |/      |/      |/      |");


        console.log("\nBEM-VINDO AO BLOG OFICIAL DOS RUBRO-NEGROS");
        console.log("\n1 - Criar Conta \n2 - Pesquisar Perfil \n3 - Fazer Postagem",
        "\n4 - Visualizar Postagens  \n5 - Excluir Postagem \n6 - Curtir Postagem \n7 - Descurtir Postagem",
        "\n8 - Comentar Postagem \n9 - Excluir Perfil \n10 - Editar Postagem", 
        "\n11 - Visualizar Postagem por perfil \n12- Visualizar Postagem por hashtag",
        "\n0 - Sair");
        
        const opcao = Number(input("\nDigite o número da opção desejada: "));

          
    
        switch (opcao) {
            case 1:
              this.incluirPerfil();
              break;
            case 2:
              this.consultarPerfil();
              break;
            case 3:
              this.incluirPostagem();
              break;
            case 4:
              this.consultarPostagens();
              break;
            case 5:
              this.excluirPostagem();
              break;
            case 6:
              this.curtirPostagem();
              break;
            case 7:
              this.descurtirPostagem();
              break;
            case 8:
              this.comentarPostagem();
              break;
            case 9:
              this.excluirPerfil();
              break;
            case 10: 
                this.editarPostagem();
              break;
            case 11: 
                this.visualizarPostagemPorPerfil(); 
              break; 
            case 12: 
                this.visualizarPostagemPorHashtag();
                break;
            case 13:
                this.seguirPerfil();
                break;
            case 14:
                this.deixarDeSeguirPerfil();
                break;
            case 15:
                this.listarSeguidores();
                break
            case 16:
                this.exibirTimeline();
                break
            case 0:
              console.log("Saindo...");
              break;
            default:
              console.log("Opção inválida.");
            }
          }
   }

        incluirPerfil(): void {
            console.log("Opção de criar perfil selecionada.");
            let nome = input("\nInforme o nome do perfil do usuário: ");
            let email = input("\nInforme o email do perfil do usuário: ");
            
            // Criar um objeto Perfil
            let novoPerfil = new Perfil(1, nome, email);

            // Chamar o método da classe RedeSocial para incluir o perfil
            const perfilIncluido = this.redeSocial.incluirPerfil(novoPerfil);

            if (perfilIncluido) {
                console.log("Perfil criado com sucesso!");
            } else {
                console.log("Este nome de perfil já está em uso. Por favor, escolha outro nome.");
            }
        }
    


        mostrarPostagensPopulares(): void {
          const postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
      
          postagens.forEach((postagem, index) => {
              if (postagem.ehPopular()) {
                  console.log("╔════════════════════════════════════════════════════════╗");
                  console.log(`║        POSTAGEM ${index + 1}${postagem instanceof PostagemAvancada ? " AVANÇADA" : ""}`);
                  console.log("╟──────────────────────────────────────────────────────────╢");
                  console.log(`║ ID: ${postagem.getId()}                        DATA: ${postagem.getData()}  `);
                  console.log("╟──────────────────────────────────────────────────────────╢");
                  console.log(`║ USER: @ ${postagem.getPerfil().getNome()}                                   `);
                  console.log("╟──────────────────────────────────────────────────────────╢");
                  console.log(`║ TEXTO: ${postagem.getTexto()}                                                `);
                  console.log("╟──────────────────────────────────────────────────────────╢");
                  console.log(`║ CURTIDAS: ${postagem.getCurtidas()}                                           `);
                  console.log("╟──────────────────────────────────────────────────────────╢");
                  console.log(`║ DESCURTIDAS: ${postagem.getDescurtidas()}                                     `);
      
                  if (postagem instanceof PostagemAvancada) {
                      console.log("╟──────────────────────────────────────────────────────────╢");
                      console.log(`║ HASHTAGS: ${postagem.getHashtagParaString()}                                `);
                      console.log("╟──────────────────────────────────────────────────────────╢");
                      console.log(`║ VISUALIZAÇÕES RESTANTES: ${postagem.getVisualizacoesRestantes()}        `);
                  }
      
                  console.log("╚════════════════════════════════════════════════════════╝");
              }
          });
        }
      


        excluirPostagem(): void {
            const idPostagem = Number(input("Digite o ID da postagem que deseja excluir:"));
            const postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(idPostagem);
        
            if (postagem === null) {
                console.log("Postagem não encontrada!");
            } else {
                this.redeSocial.getRepositorioDePostagens().excluirPostagem(idPostagem);
                console.log(`Postagem com ID ${idPostagem} excluída.`);
            }
        }
        
    
        consultarPerfil() {
            console.log("Opção de procurar perfil selecionada.");
            let nome_procurado= input("Informe o NOME do perfil: ");
    
            let perfilEncontrado = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nome_procurado)
            if (perfilEncontrado) {
                console.log("Perfil encontrado:");
                console.log(`ID: ${perfilEncontrado.getId()}`);
                console.log(`Nome: ${perfilEncontrado.getNome()}`);
                console.log(`Email: ${perfilEncontrado.getEmail()}`);
            } else {
                console.log(`Perfil com o nome ${nome_procurado} não encontrado.`);
            }
        }

        incluirPostagem(): void {
            console.log("Opção de fazer postagem selecionada.");
            let nome_do_usuario_procurado = input("\nDigite o nome do usuário autor da postagem:");
            let perfil_autor = this.buscarPerfil(nome_do_usuario_procurado);
        
            if (perfil_autor) {
                let tipoPostagem = this.obterTipoPostagem();
                let texto_da_postagem = input("\nDigite o texto da postagem:");
                
                if (tipoPostagem === 1) {
                    const postagem_atual = this.criarPostagem(perfil_autor, texto_da_postagem);
                    if (postagem_atual) {
                        //salva na mémoria no Repositorio de Postagens
                        this.redeSocial.getRepositorioDePostagens().incluir(postagem_atual)
                        //salva na lista de postagens do autor
                        perfil_autor.adicionarPostagens(postagem_atual);
                    }
                } else if (tipoPostagem === 2) {
                    const postagem_atual = this.criarPostagemAvancada(perfil_autor, texto_da_postagem);
                    if (postagem_atual) {
                        this.redeSocial.getRepositorioDePostagens().incluir(postagem_atual);
                        perfil_autor.adicionarPostagens(postagem_atual);
                    }
                }
            } else {
                console.log(`Perfil com o nome "${nome_do_usuario_procurado}" não encontrado. Verifique o nome do usuário.`);
            }
        }
        
        private buscarPerfil(nome: string): Perfil {
            let perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nome);
        
            while (perfil === null) {
                console.log("\nUsuário não encontrado! Digite o nome novamente.\n");
                nome = input("\nDigite o nome do usuário autor da postagem:");
                perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nome);
            }
        
            return perfil;
        }
        
        private obterTipoPostagem(): number {
            let tipoPostagem = Number(input("\nTipo da postagem (1-Postagem, 2-Postagem Avançada): "));
        
            while (tipoPostagem !== 1 && tipoPostagem !== 2) {
                console.log(`\nOpção inválida! Digite novamente.\n`);
                tipoPostagem = Number(input("\nTipo da postagem (1-Postagem, 2-Postagem Avançada): "));
            }
        
            return tipoPostagem;
        }
        
        private criarPostagem(perfil: Perfil, texto: string): Postagem {
            let lista_de_postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            let id_postagem_atual = lista_de_postagens.length > 0 ? lista_de_postagens[lista_de_postagens.length - 1].getId() + 1 : 1;
            return new Postagem(id_postagem_atual, texto, 0, 0, new Date(), perfil);
        }
        
        private criarPostagemAvancada(perfil: Perfil, texto: string): Postagem {
            let lista_de_postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            let id_postagem_atual = lista_de_postagens.length > 0 ? lista_de_postagens[lista_de_postagens.length - 1].getId() + 1 : 1;
        
            let numeroMaximoVisualizacoes = Number(input("\nDigite o número máximo de visualizações:"));
            let lista_de_hashtags: string[] = [];
        
            let numero_hashtag_atual = 1;
            while (true) {
                let hashtag_atual = input(`\nDigite a ${numero_hashtag_atual} hashtag (#): `);
                lista_de_hashtags.push(`#${hashtag_atual}`);
                numero_hashtag_atual++;
        
                let continuar = input(`\nDeseja adicionar mais hashtags? (S-sim, N-não): `).toUpperCase();
        
                if (continuar !== 'S') {
                    break;
                }
            }
        
            return new PostagemAvancada(id_postagem_atual, texto, 0, 0, new Date(), perfil, lista_de_hashtags, numeroMaximoVisualizacoes);
        }
        

        editarPostagem(): void {
            const id_postagem = Number(input("Digite o ID da postagem:"));
            const postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
        
            if (postagem === null) {
                console.log("Postagem não encontrada!");
                return;
            }
        
            const editarTexto = input("Editar texto (s-SIM n-NÃO)?").toUpperCase() === "S";
            if (editarTexto) {
                const novoTexto = input("Digite o novo texto:");
                postagem.setTexto(novoTexto);
            }
        
            if (postagem instanceof PostagemAvancada) {
                const editarHashtag = input("Editar hashtag (s-SIM n-NÃO)?").toUpperCase() === "S";
                if (editarHashtag) {
                    const hashtags: string[] = [];
                    let contador = 1;
                    while (true) {
                        const hashtag = input(`Digite a ${contador} hashtag: `);
                        hashtags.push(`#${hashtag}`);
                        contador++;
                        if (input("Cadastrar mais hashtags (s-SIM n-NÃO)?").toUpperCase() !== "S") {
                            break;
                        }
                    }
                    // Aqui, estamos chamando um método personalizado para adicionar hashtags à postagem avançada.
                    this.adicionarHashtagsAPostagem(postagem, hashtags);
        
                    const editarVisualizacoes = input("Editar número máximo de visualizações (s-SIM n-NÃO)?").toUpperCase() === "S";
                    if (editarVisualizacoes) {
                        const maxVisualizacoes = Number(input("Digite o novo número máximo de visualizações:"));
                        postagem.setVisualizacoesRestantes(maxVisualizacoes);
                    }
                }
            }
        
            console.log(`Postagem com ID '${id_postagem}' atualizada.`);
        }
        
        // Método para adicionar hashtags à postagem avançada
        adicionarHashtagsAPostagem(postagem: PostagemAvancada, hashtags: string[]) {
            for (const hashtag of hashtags) {
                postagem.addHashtag(hashtag);
            }
        }
        

        consultarPostagens(): void {
        
            const opcao: number = Number(input(`Digite uma opção:
            1 - Mostrar Todas as postagens
            2 - Mostrar as postagens de um perfil
            3 - Mostrar uma postagem aleatoria
            0 - Sair
            `));
        
            switch (opcao) {
                case 0:
                    return;
                case 1:
                    this.mostrarPostagens("Todas as postagens da Rede Social", this.redeSocial.getRepositorioDePostagens().getPostagens());
                    break;
                case 2:
                    const nomeUsuario = input("Digite o nome do usuário: ");
                    const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeUsuario);
                    if (perfil) {
                        this.mostrarPostagens(`Todas as postagens de ${nomeUsuario}`, perfil.getPostagens());
                    } else {
                        console.log("Usuário não encontrado!");
                    }
                    break;
                case 3:
                    const idPostagem = Number(input("Digite o ID da postagem: "));
                    const postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(idPostagem);
                    if (postagem) {
                        this.mostrarPostagensNaTela(postagem);
                    } else {
                        console.log("Postagem não encontrada!");
                    }
                    break;
                default:
                    console.log("Opção inválida!");
            }
            }
        
            mostrarPostagensNaTela(postagem: Postagem) {
                if(postagem === null){
                    console.log("Postagem não encontrada!");
                    return;
                }


            console.log("╔════════════════════════════════════════════════════════╗");
            console.log(`║        POSTAGEM ${postagem instanceof PostagemAvancada ? "AVANÇADA" : ""}`);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║  ID: ${postagem.getId()}                        DATA: ${postagem.getData()}  `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║  USER: @ ${postagem.getPerfil().getNome()}                                   `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║  TEXTO: ${postagem.getTexto()}                                                `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║  CURTIDAS: ${postagem.getCurtidas()}                                           `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║  DESCURTIDAS: ${postagem.getDescurtidas()}                                     `);
        
            if (postagem instanceof PostagemAvancada) {
                console.log("╟──────────────────────────────────────────────────────────╢");
                console.log(`║  HASHTAGS: ${postagem.getHashtagParaString()}                                `);
                console.log("╟──────────────────────────────────────────────────────────╢");
                console.log(`║  VISUALIZAÇÕES RESTANTES: ${postagem.getVisualizacoesRestantes()}        `);
            }
        
            console.log("╚════════════════════════════════════════════════════════╝");
        }
        
        mostrarPostagens(titulo: string, postagens: Postagem[]) {
            console.log(`\n\n\n${titulo}`);
        
            for (let i = 0; i < postagens.length; i++) {
                this.mostrarPostagensNaTela(postagens[i]);
            }
        }

        mostrarPostagemPorID(id_postagem: number): void {
            const consulta_pela_postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
        
            if (!consulta_pela_postagem) {
                console.log("Não há postagem com o ID especificado!");
                return;
            }
        
            console.log("╔════════════════════════════════════════════════════════╗");
            console.log(`║        POSTAGEM ${consulta_pela_postagem instanceof PostagemAvancada ? 'AVANÇADA' : ''}`);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║ ID: ${consulta_pela_postagem.getId()}                        DATA: ${consulta_pela_postagem.getData()}  `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║ USER: @ ${consulta_pela_postagem.getPerfil().getNome()}                                   `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║ TEXTO: ${consulta_pela_postagem.getTexto()}                                                `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║ CURTIDAS: ${consulta_pela_postagem.getCurtidas()}                                           `);
            console.log("╟──────────────────────────────────────────────────────────╢");
            console.log(`║ DESCURTIDAS: ${consulta_pela_postagem.getDescurtidas()}                                     `);
        
            if (consulta_pela_postagem instanceof PostagemAvancada) {
                console.log("╟──────────────────────────────────────────────────────────╢");
                console.log(`║  HASHTAGS: ${consulta_pela_postagem.getHashtagParaString()}                                `);
                console.log("╟──────────────────────────────────────────────────────────╢");
                console.log(`║  VISUALIZAÇÕES RESTANTES: ${consulta_pela_postagem.getVisualizacoesRestantes()}        `);
            }
        
            console.log("╚════════════════════════════════════════════════════════╝");
        }
    
        curtirPostagem(): void {

        let id_postagem:string | number=input("Digite o ID da postagem:")
        while(isNaN(Number(id_postagem))){
            console.log("ID inválido.")
            id_postagem=input("Digite o ID da postagem:")
        }
        id_postagem=Number(id_postagem)

        let consulta_pela_postagem=this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem)
        if(consulta_pela_postagem==null){
        console.log(`\nNão há postagem com o id ${id_postagem} !!!`)
        }
        else{
        console.log("Postagem atualizada:")
        this.mostrarPostagemPorID(id_postagem)
        }

        }

        descurtirPostagem(): void {

        let id_postagem:string | number=input("Digite o ID da postagem:")
        while(isNaN(Number(id_postagem))){
            console.log("ID inválido.")
            id_postagem=input("Digite o ID da postagem:")
        }
        id_postagem=Number(id_postagem)
    
        let consulta_pela_postagem=this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem)
        if(consulta_pela_postagem==null){
            console.log(`\nNão há postagem com o id ${id_postagem} !!!`)
        }
        else{
            console.log("\nPostagem Atualizada:")
            this.mostrarPostagemPorID(id_postagem)
        }
    }


        comentarPostagem(): void {
        const idPostagem = Number(input("Digite o ID da postagem que deseja comentar:"));
        const postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(idPostagem);

        if (postagem === null) {
            console.log("Postagem não encontrada!");
        } else {
            const comentario = input("Digite seu comentário:");
            postagem.adicionarComentario(comentario);
            console.log("Comentário adicionado com sucesso!");
        }

    }
    
        excluirPerfil(): void {
        let usuario_procurado=input("\n Digite o nome do usuario que deseja excluir:")

        const repositorioPerfis = this.redeSocial.getRepositorioDePerfis();
        const perfilExcluido = repositorioPerfis.consultarPorNome(usuario_procurado);
    
        if (perfilExcluido === null) {
            console.log("\nUsuário não encontrado.\n");
        } else {
            const perfisAtualizados = repositorioPerfis.getPerfis().filter(perfil => perfil.getNome() !== usuario_procurado);
            repositorioPerfis.setPerfis(perfisAtualizados);
            console.log(`\nO usuário com nome '${usuario_procurado}' foi excluído.`);
        }
    }
                
    visualizarPostagemPorPerfil(): void {
        const nomeUsuario = input("Digite o nome do usuário cujas postagens você deseja visualizar: ");
        const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeUsuario);

        if (perfil) {
            const postagensDoPerfil = perfil.getPostagens();
            if (postagensDoPerfil.length === 0) {
                console.log(`Não há postagens para o perfil de ${nomeUsuario}.`);
            } else {
                console.log(`Postagens de ${nomeUsuario}:`);
                this.mostrarPostagens(`Postagens de ${nomeUsuario}`, postagensDoPerfil);
            }
        } else {
            console.log("Usuário não encontrado.");
        }
    }

    visualizarPostagemPorHashtag(): void {
        const hashtag = input("Digite a hashtag que deseja pesquisar: ");
        const postagensComHashtag = this.filtrarPostagensPorHashtag(hashtag);

        if (postagensComHashtag.length === 0) {
            console.log(`Não há postagens com a hashtag #${hashtag}.`);
        } else {
            console.log(`Postagens com a hashtag #${hashtag}:`);
            this.mostrarPostagens(`Postagens com a hashtag #${hashtag}`, postagensComHashtag);
        }
    }

    filtrarPostagensPorHashtag(hashtag: string): Postagem[] {
        const postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
    
        // Filtra postagens avançadas que correspondem à hashtag
        return postagens.filter((postagem) => {
            if (postagem instanceof PostagemAvancada) {
                return postagem.existeHashtag(hashtag);
            }
            return false;
        });
    }

    seguirPerfil(): void {
        const nomeSeguidor = input("Digite o nome do perfil que deseja seguir: ");
        const nomePerfilAtual = input("Digite o seu nome de perfil: ");
        
        const seguidor = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeSeguidor);
        const perfilAtual = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfilAtual);

        if (seguidor && perfilAtual) {
            perfilAtual.seguir(seguidor);
            console.log(`${nomePerfilAtual} está seguindo ${nomeSeguidor}.`);
        } else {
            console.log("Perfil não encontrado.");
        }
    }

    deixarDeSeguirPerfil(): void {
        const nomeSeguidor = input("Digite o nome do perfil que deseja deixar de seguir: ");
        const nomePerfilAtual = input("Digite o seu nome de perfil: ");
        
        const seguidor = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeSeguidor);
        const perfilAtual = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfilAtual);

        if (seguidor && perfilAtual) {
            perfilAtual.deixarDeSeguir(seguidor);
            console.log(`${nomePerfilAtual} deixou de seguir ${nomeSeguidor}.`);
        } else {
            console.log("Perfil não encontrado.");
        }
    }

    listarSeguidores(): void {
        const nomePerfil = input("Digite o nome do perfil para listar os seguidores: ");
        const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfil);

        if (perfil) {
            const seguidores = perfil.listarSeguidores();
            if (seguidores.length === 0) {
                console.log(`${nomePerfil} não possui seguidores.`);
            } else {
                console.log(`Seguidores de ${nomePerfil}:`);
                for (const seguidor of seguidores) {
                    console.log(seguidor.getNome());
                }
            }
        } else {
            console.log("Perfil não encontrado.");
        }
    }


    exibirTimeline(): void {
        const nomePerfil = input("Digite o nome do perfil para exibir a timeline: ");
        const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfil);

        if (perfil) {
            const timeline = perfil.exibirTimeline();
            if (timeline.length === 0) {
                console.log(`A timeline de ${nomePerfil} está vazia.`);
            } else {
                console.log(`Timeline de ${nomePerfil}:`);
                for (const postagem of timeline) {
                    console.log(`Data: ${postagem.getData()} - ${postagem.getTexto()}`);
                }
            }
        } else {
            console.log("Perfil não encontrado.");
        }
    }
}

     
    // Criação das instâncias e execução do programa
    let repositorio_de_perfis=new RepositorioDePerfis([])
    let repositorio_de_postagens=new RepositorioDePostagens([])
    const redeSocial = new RedeSocial(repositorio_de_postagens,repositorio_de_perfis);
    const app = new App(redeSocial);
    app.mostrarMenu();
                
        

                        
                    
                        
                    


