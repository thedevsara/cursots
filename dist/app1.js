"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const fs_1 = __importDefault(require("fs"));
let input = (0, prompt_sync_1.default)();
class Perfil {
    constructor(_id, _nome, _email) {
        this._postagens = [];
        this._seguidores = [];
        this._seguindo = [];
        this._seguidoresCount = 0;
        this._seguindoCount = 0;
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
    }
    getId() {
        return this._id;
    }
    getNome() {
        return this._nome;
    }
    getEmail() {
        return this._email;
    }
    setNome(nome) {
        this._nome = nome;
    }
    setEmail(email) {
        this._email = email;
    }
    getPostagens() {
        return this._postagens;
    }
    // Método para salvar perfil em um arquivo
    salvarPerfil() {
        const perfilData = this.perfilParaString();
        fs_1.default.writeFileSync(`perfil_${this._id}.json`, perfilData);
    }
    perfilParaString() {
        const perfilData = {
            id: this._id,
            nome: this._nome,
            email: this._email
        };
        return JSON.stringify(perfilData);
    }
    static stringParaPerfil(perfilData) {
        const parsedData = JSON.parse(perfilData);
        return new Perfil(parsedData.id, parsedData.nome, parsedData.email);
    }
    // Método para carregar perfil de um arquivo
    static carregarPerfil(id) {
        try {
            const perfilData = fs_1.default.readFileSync(`perfil_${id}.json`, 'utf8').toString();
            return Perfil.stringParaPerfil(perfilData);
        }
        catch (error) {
            return null;
        }
    }
    consultarPerfilSimplificado() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            seguidores: this._seguidores.length,
            seguindo: this._seguindo.length,
        };
    }
    adicionarPostagens(nova_postagem) {
        if (this.verificarSePostagemExiste(nova_postagem)) {
            return;
        }
        this._postagens.push(nova_postagem);
    }
    verificarSePostagemExiste(nova_postagem) {
        let resultado_da_consulta = false;
        for (const postagem_atual of this._postagens) {
            if (postagem_atual.getId() == nova_postagem.getId()) {
                resultado_da_consulta = true;
            }
        }
        return resultado_da_consulta;
    }
    seguir(perfil) {
        if (perfil.getId() === this._id) {
            console.log("Você não pode se seguir.");
        }
        else if (perfil._seguindo.includes(perfil)) {
            console.log(`${this.getNome} já está seguindo ${this._nome}`);
        }
        else {
            this._seguindo.push(perfil);
            perfil.adicionarSeguidor(this);
            console.log(`${this._nome} está seguindo ${perfil.getNome()}.`);
            this.atualizarContadores();
            perfil.atualizarContadores();
        }
    }
    adicionarSeguidor(perfil) {
        this._seguidores.push(perfil);
        this.atualizarContadores();
    }
    atualizarContadores() {
        this._seguidores = Array.from(new Set(this._seguidores)); // Remover duplicatas
        this._seguindo = Array.from(new Set(this._seguindo));
        this._seguidoresCount = this._seguidores.length;
        this._seguindoCount = this._seguindo.length;
    }
    deixarDeSeguir(perfil) {
        const indexSeguindo = this._seguindo.indexOf(perfil);
        if (indexSeguindo !== -1) {
            this._seguindo.splice(indexSeguindo, 1);
        }
        perfil.atualizarContadores();
        this.atualizarContadores();
    }
    listarSeguidores() {
        return this._seguidores;
    }
    exibirTimeline() {
        const timeline = [];
        for (const perfilSeguido of this._seguindo) {
            timeline.push(...perfilSeguido.getPostagens());
        }
        timeline.sort((a, b) => b.getData().getTime() - a.getData().getTime());
        return timeline;
    }
    removerPostagem(idPostagem) {
        this._postagens = this._postagens.filter(postagem => postagem.getId() !== idPostagem);
        // Remove a postagem dos perfis seguidores
        this._seguidores.forEach(seguidor => {
            if (seguidor instanceof Perfil) {
                seguidor.removerPostagem(idPostagem);
            }
        });
        // Remove a postagem dos perfis seguidos
        this._seguidores.forEach(seguindo => {
            if (seguindo instanceof Perfil) {
                seguindo.removerPostagem(idPostagem);
            }
        });
    }
}
class Postagem {
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil) {
        this._comentarios = [];
        this._id = _id;
        this._texto = _texto;
        this._curtidas = _curtidas;
        this._descurtidas = _descurtidas;
        this._data = _data;
        this._perfil = _perfil;
    }
    getId() {
        return this._id;
    }
    getTexto() {
        return this._texto;
    }
    setTexto(novo_texto) {
        this._texto = novo_texto;
    }
    getCurtidas() {
        return this._curtidas;
    }
    getDescurtidas() {
        return this._descurtidas;
    }
    getData() {
        return this._data;
    }
    getPerfil() {
        return this._perfil;
    }
    curtir() {
        this._curtidas++;
    }
    descurtir() {
        this._descurtidas++;
    }
    ehPopular() {
        return this._curtidas > this._descurtidas * 1.5;
    }
    adicionarComentario(texto, usuario) {
        this._comentarios.push({ texto, usuario });
    }
    getComentarios() {
        return this._comentarios;
    }
    salvarPostagem() {
        const postagemData = this.postagemParaString();
        fs_1.default.writeFileSync(`perfil_${this._id}.json`, postagemData);
    }
    postagemParaString() {
        const postagemData = {
            id: this._id,
            texto: this._texto,
            curtidas: this._curtidas,
            descurtidas: this._descurtidas,
            data: this._data,
            perfil: this._perfil.getId(),
        };
        return JSON.stringify(postagemData);
    }
    static stringParaPostagem(postagemData, perfis) {
        const parsedData = JSON.parse(postagemData);
        let perfil = perfis.consultarPorId(parsedData.perfil);
        return new Postagem(parsedData.id, parsedData.texto, parsedData.curtidas, parsedData.descurtidas, parsedData.data, perfil);
    }
    // Método para carregar perfil de um arquivo
    static carregarPostagem(id, perfis) {
        try {
            const postagemData = fs_1.default.readFileSync(`postagem_${id}.json`, 'utf8').toString();
            return Postagem.stringParaPostagem(postagemData, perfis);
        }
        catch (error) {
            return null;
        }
    }
}
class PostagemAvancada extends Postagem {
    // quantas vezes ela poderá ser exibida até expirar;
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil, _hashtags, _visualizacoesRestantes) {
        super(_id, _texto, _curtidas, _descurtidas, _data, _perfil);
        this._hashtags = [];
        this._visualizacoesRestantes = _visualizacoesRestantes;
        this._hashtags = _hashtags;
    }
    getHashtagParaString() {
        let soma_hashtags = "";
        for (const hashtag_atual of this._hashtags) {
            soma_hashtags += hashtag_atual + " ";
        }
        return soma_hashtags;
    }
    getVisualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }
    setVisualizacoesRestantes(nova_visualizacao) {
        this._visualizacoesRestantes = nova_visualizacao;
    }
    addHashtag(_hashtag) {
        this._hashtags.push(_hashtag);
    }
    existeHashtag(_hashtag) {
        return this._hashtags.includes(_hashtag);
    }
    decrementarVisualizacoes() {
        this._visualizacoesRestantes--;
    }
}
class RepositorioDePerfis {
    constructor() {
        this._perfis = [];
        this._proximoIdPerfil = 1;
    }
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    getPerfis() {
        return this._perfis;
    }
    setPerfis(perfis) {
        this._perfis = perfis;
    }
    getProximoIdPerfil() {
        return this._proximoIdPerfil++;
    }
    // Método para salvar todos os perfis em arquivos
    salvarPerfis() {
        this._perfis.forEach(perfil => perfil.salvarPerfil());
    }
    // Método para carregar todos os perfis de arquivos
    carregarPerfis() {
        this._perfis = [];
        // Simulação de um limite de IDs existentes para carregar perfis
        const limiteDeIDs = 100;
        for (let i = 1; i <= limiteDeIDs; i++) {
            const perfil = Perfil.carregarPerfil(i);
            if (perfil) {
                this._perfis.push(perfil);
            }
        }
    }
    consultarPorNomeSimplificado(nome) {
        const perfil = this._perfis.find((p) => p.getNome() === nome);
        return perfil ? perfil.consultarPerfilSimplificado() : null;
    }
    consultarPorNome(nome_procurado) {
        let resultado_da_consulta = null;
        for (const perfil_atual of this._perfis) {
            if (perfil_atual.getNome() == nome_procurado) {
                resultado_da_consulta = perfil_atual;
            }
        }
        return resultado_da_consulta;
    }
    consultarPorId(id) {
        let resultado_da_consulta = null;
        for (const perfil_atual of this._perfis) {
            if (perfil_atual.getId() == id) {
                resultado_da_consulta = perfil_atual;
            }
        }
        return resultado_da_consulta;
    }
    consultar(_id, _nome, _email) {
        for (let i = 0; i < this._perfis.length; i++) {
            const perfil = this._perfis[i];
            if ((_id !== undefined && perfil.getId() !== _id) ||
                (_nome !== undefined && perfil.getNome() !== _nome) ||
                (_email !== undefined && perfil.getEmail() !== _email)) {
                return perfil;
            }
        }
        return null;
    }
    excluirPerfil(nome) {
        const index = this._perfis.findIndex(perfil => perfil.getNome() === nome);
        if (index !== -1) {
            this._perfis.splice(index, 1);
        }
    }
}
class RepositorioDePerfisUnificado extends RepositorioDePerfis {
    salvarPerfis() {
        let dadosPerfis = this.getPerfis().map(x => x.perfilParaString()).join("\n");
        fs_1.default.writeFileSync("unificado_perfis.txt", dadosPerfis);
    }
    carregarPerfis() {
        let dadosPerfis = "";
        try {
            dadosPerfis = fs_1.default.readFileSync("unificado_perfis.txt").toString();
        }
        catch (e) { }
        for (let perfilData of dadosPerfis.split("\n")) {
            if (perfilData) {
                this.incluir(Perfil.stringParaPerfil(perfilData));
            }
        }
    }
}
class RepositorioDePostagens {
    constructor() {
        this._postagens = [];
        this._proximoIdPostagem = 1;
    }
    getPostagens() {
        return [...this._postagens];
    }
    setPostagens(lista_de_postagens) {
        if (Array.isArray(lista_de_postagens)) {
            this._postagens = lista_de_postagens;
        }
    }
    incluir(postagem) {
        if (this.consultarPorID(postagem.getId()) !== null) {
            return;
        }
        this._postagens.push(postagem);
    }
    consultarPorID(id) {
        let resultado_da_consulta = null;
        for (const postagem_atual of this._postagens) {
            if (postagem_atual.getId() == id) {
                resultado_da_consulta = postagem_atual;
            }
        }
        return resultado_da_consulta;
    }
    // Método para salvar todas as postagens em arquivos
    salvarPostagens() {
        this._postagens.forEach(perfil => perfil.salvarPostagem());
    }
    // Método para carregar todos as  postagensde arquivos
    carregarPostagens(perfis) {
        this._postagens = [];
        // Simulação de um limite de IDs existentes para carregar postagens
        const limiteDeIDs = 100;
        for (let i = 1; i <= limiteDeIDs; i++) {
            const postagem = Postagem.carregarPostagem(i, perfis);
            if (postagem) {
                this._postagens.push(postagem);
            }
        }
    }
    excluirPostagens(id) {
        const index = this._postagens.findIndex((postagem) => postagem.getId() === id);
        if (index !== -1) {
            this._postagens.splice(index, 1);
        }
    }
    curtir(id) {
        const postagem = this.consultarPorID(id);
        if (postagem !== null) {
            postagem.curtir();
        }
    }
    descurtir(id) {
        const postagem = this.consultarPorID(id);
        if (postagem !== null) {
            postagem.descurtir();
        }
    }
    consultar(_id, _texto, _hashtag, perfil) {
        for (let i = 0; i < this._postagens.length; i++) {
            const postagem = this._postagens[i];
            if (_id !== undefined && postagem.getId() !== _id) {
                continue;
            }
            if (_texto !== undefined && postagem.getTexto().includes(_texto)) {
                continue;
            }
            if (_hashtag !== undefined) {
                if (postagem instanceof PostagemAvancada) {
                    const postagemAvancada = postagem;
                    if (!postagemAvancada.existeHashtag(_hashtag)) {
                        continue;
                    }
                }
                else {
                    continue;
                }
            }
            if (perfil !== undefined && postagem.getPerfil() !== perfil) {
                continue;
            }
            return (postagem);
        }
        return null;
    }
}
class RepositorioDePostagensUnificado extends RepositorioDePostagens {
    salvarPostagens() {
        let dadosPerfis = this.getPostagens().map(x => x.postagemParaString()).join("\n");
        fs_1.default.writeFileSync("unificado_postagens.txt", dadosPerfis);
    }
    carregarPostagens(perfis) {
        let dadosPostagens = "";
        try {
            dadosPostagens = fs_1.default.readFileSync("unificado_postagens.txt").toString();
        }
        catch (e) { }
        for (let postagensData of dadosPostagens.split("\n")) {
            if (postagensData) {
                this.incluir(Postagem.stringParaPostagem(postagensData, perfis));
            }
        }
    }
}
class RedeSocial {
    constructor(repositorioDePostagens, repositorioDePerfis) {
        this._repositorioDePostagens = repositorioDePostagens;
        this._repositorioDePerfis = repositorioDePerfis;
    }
    getRepositorioDePerfis() {
        return this._repositorioDePerfis;
    }
    getRepositorioDePostagens() {
        return this._repositorioDePostagens;
    }
    incluirPerfil(perfil) {
        if (this._repositorioDePerfis.consultarPorNome(perfil.getNome()) == null) {
            this._repositorioDePerfis.incluir(perfil);
            return true;
        }
        return false;
    }
    consultarPerfil(_id, _nome, _email) {
        let pesquisa = this._repositorioDePerfis.consultar(_id, _nome, _email);
        if (pesquisa == null) {
            return null;
        }
        else {
            return pesquisa;
        }
    }
    incluirPostagem(postagem) {
        if (postagem.getId() == undefined) {
            return false;
        }
        else {
            this._repositorioDePostagens.incluir(postagem);
            return true;
        }
    }
    consultarPostagens(_id, _texto, _hashtag, perfil) {
        return this._repositorioDePostagens.consultar(_id, _texto, _hashtag, perfil);
    }
    curtirPostagem(idPostagem) {
        let postagem = this._repositorioDePostagens.consultarPorID(idPostagem);
        if (postagem) {
            postagem.curtir();
            console.log("Você curtiu essa postagem <3!");
        }
        else {
            console.log("A postagem não existe! :(");
        }
    }
    descurtirPostagem(idPostagem) {
        let postagem = this._repositorioDePostagens.consultarPorID(idPostagem);
        if (postagem) {
            postagem.descurtir();
            console.log("Você descurtiu essa postagem :(");
        }
        else {
            console.log("A postagem não existe");
        }
    }
    decrementarVisualizacoes(postagem) {
        if (postagem.getVisualizacoesRestantes() > 0) {
            postagem.decrementarVisualizacoes();
        }
    }
    mostrarComentariosDaPostagem(idPostagem) {
        const postagem = this._repositorioDePostagens.consultar(idPostagem);
        if (postagem === null) {
            console.log("Postagem não encontrada!");
            return;
        }
        console.log(`\nComentários na postagem ${idPostagem}:`);
        const comentarios = postagem.getComentarios();
        if (comentarios.length === 0) {
            console.log("Não há comentários nesta postagem.");
        }
        else {
            for (const comentario of comentarios) {
                console.log(`- @${comentario.usuario}: ${comentario.texto}`);
            }
        }
    }
    exibirPostagensPorPerfil(id) {
        let postagens = this._repositorioDePostagens.getPostagens();
        let postsExibiveis = [];
        for (let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
            if (post.getPerfil().getId() === id) {
                if (post instanceof PostagemAvancada) {
                    let postagemAvancada = post;
                    if (postagemAvancada.getVisualizacoesRestantes() >= 0) {
                        this.decrementarVisualizacoes(postagemAvancada);
                        postsExibiveis.push(postagemAvancada);
                    }
                }
                else {
                    postsExibiveis.push(post);
                }
            }
        }
        return postsExibiveis;
    }
    visualizarPostagensPorHashtags(_hashtag) {
        let postagens = this._repositorioDePostagens.getPostagens();
        let postsExibiveis = [];
        for (let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
            if (post instanceof PostagemAvancada) {
                if (post.existeHashtag(_hashtag) && post.getVisualizacoesRestantes() > 0) {
                    this.decrementarVisualizacoes(post);
                    postsExibiveis.push(post);
                }
            }
        }
        return postsExibiveis;
    }
    salvarDados() {
        this._repositorioDePerfis.salvarPerfis();
        this._repositorioDePostagens.salvarPostagens();
    }
    carregarDados() {
        this._repositorioDePerfis.carregarPerfis();
        this._repositorioDePostagens.carregarPostagens(this._repositorioDePerfis);
    }
}
class App {
    constructor(redeSocial) {
        this.redeSocial = redeSocial;
    }
    iniciar() {
        console.log("\n\n");
        console.log("   .####.      ########/       ##########");
        console.log(" ##########    ##########(    #########");
        console.log(" ####    ####  ####    ####,  ###/");
        console.log(" ####          ####    ####   ###/");
        console.log(" ####         *############(. #&&&&&&&#//");
        console.log(" ####          &&&&&   &&&(   #&&&&");
        console.log(" ####/   ,&&&  &&&&    *&&&   &&&(");
        console.log("   &&&&&&&&&   &&&&    *&&&   &&&(");
        console.log("     &&&&      ####    ,###   ###* \n\n");
        this.mostrarMenu();
    }
    mostrarMenu() {
        console.log("\n");
        console.log("╔════════════════════════════════════════════════════╗");
        console.log("║          BEM-VINDO AO BLOG OFICIAL DOS             ║");
        console.log("║                  RUBRO-NEGROS                      ║");
        console.log("╠════════════════════════════════════════════════════║");
        console.log("║ 1 - Criar Conta                                    ║");
        console.log("║ 2 - Pesquisar Perfil                               ║");
        console.log("║ 3 - Fazer Postagem                                 ║");
        console.log("║ 4 - Visualizar Postagens                           ║");
        console.log("║ 5 - Excluir Postagem                               ║");
        console.log("║ 6 - Curtir Postagem                                ║");
        console.log("║ 7 - Descurtir Postagem                             ║");
        console.log("║ 8 - Comentar Postagem                              ║");
        console.log("║ 9 - Visualizar Comentários                         ║");
        console.log("║ 10 - Excluir Perfil                                ║");
        console.log("║ 11 - Editar Postagem                               ║");
        console.log("║ 12 - Mostrar Postagens Populares                   ║");
        console.log("║ 13 - Visualizar Postagens por Hashtag              ║");
        console.log("║ 14 - Seguir Perfil                                 ║");
        console.log("║ 15 - Deixar De Seguir Perfil                       ║");
        console.log("║ 16 - Listar Seguidores                             ║");
        console.log("║ 17 - Exibir Timeline                               ║");
        console.log("║ 0 - Sair                                           ║");
        console.log("╚════════════════════════════════════════════════════╝");
        while (true) {
            const opcao = Number(input("Digite o número da opção desejada: "));
            try {
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
                        this.consultarComentariosDaPostagem();
                        break;
                    case 10:
                        this.excluirPerfil();
                        break;
                    case 11:
                        this.editarPostagem();
                        break;
                    case 12:
                        this.mostrarPostagensPopulares();
                        break;
                    case 13:
                        this.visualizarPostagemPorHashtag();
                        break;
                    case 14:
                        this.seguirPerfil();
                        break;
                    case 15:
                        this.deixarDeSeguirPerfil();
                        break;
                    case 16:
                        this.listarSeguidores();
                        break;
                    case 17:
                        this.exibirTimeline();
                        break;
                    case 0:
                        console.log("Salvando");
                        this.redeSocial.salvarDados();
                        console.log("APLICAÇÃO ENCERRADA");
                        return;
                    default:
                        console.log("Opção inválida.");
                }
            }
            catch (error) {
                console.log("Erro ao executar a opção: ", error);
            }
        }
    }
    incluirPerfil() {
        try {
            console.log("Opção de criar perfil selecionada.");
            let nome = input("Informe o nome do perfil do usuário: ");
            let email = input("Informe o email do perfil do usuário: ");
            let repositorioDePerfis = this.redeSocial.getRepositorioDePerfis();
            let lista_perfis_cadastrados = repositorioDePerfis.getPerfis();
            // Verifica se já existe um perfil com o mesmo nome ou e-mail
            if (lista_perfis_cadastrados.some(perfil => perfil.getNome() === nome || perfil.getEmail() === email)) {
                throw new Error(`Já existe um perfil com o mesmo nome (${nome}) ou e-mail (${email}).`);
            }
            let perfil_cadastrado;
            let id_novo_perfil = repositorioDePerfis.getProximoIdPerfil();
            perfil_cadastrado = new Perfil(id_novo_perfil, nome, email);
            lista_perfis_cadastrados.push(perfil_cadastrado);
            console.log(`Perfil criado com sucesso!\n`);
            this.mostrarMenu();
        }
        catch (error) {
            console.error("Erro ao incluir o perfil: ", error);
        }
    }
    mostrarPostagensPopulares() {
        try {
            const postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            const postagensPopulares = postagens.filter(postagem => postagem.ehPopular());
            if (postagensPopulares.length === 0) {
                throw new Error("Ainda não há postagens populares.");
            }
            postagens.forEach((postagem, index) => {
                if (postagem.ehPopular()) {
                    console.log("╔════════════════════════════════════════════════════════╗");
                    console.log(`║        POSTAGEM ${index + 1}${postagem instanceof PostagemAvancada ? " AVANÇADA" : ""}`);
                    console.log("╟────────────────────────────────────────────────────────╢");
                    console.log(`║ ID: ${postagem.getId()}  DATA: ${postagem.getData().toLocaleString('pt-BR')}`);
                    console.log("╟────────────────────────────────────────────────────────╢");
                    console.log(`║ USER: @ ${postagem.getPerfil().getNome()}              ╢                     `);
                    console.log("╟────────────────────────────────────────────────────────╢");
                    console.log(`║ TEXTO: ${postagem.getTexto()}                          ╢                      `);
                    console.log("╟────────────────────────────────────────────────────────╢");
                    console.log(`║ CURTIDAS: ${postagem.getCurtidas()}                    ╢                       `);
                    console.log("╟────────────────────────────────────────────────────────╢");
                    console.log(`║ DESCURTIDAS: ${postagem.getDescurtidas()}              ╢                       `);
                    if (postagem instanceof PostagemAvancada) {
                        console.log(`║ HASHTAGS: ${postagem.getHashtagParaString()}       ╢                         `);
                        console.log("╟────────────────────────────────────────────────────╢");
                        console.log(`║ VISUALIZAÇÕES RESTANTES: ${postagem.getVisualizacoesRestantes()}        `);
                    }
                    console.log("╚════════════════════════════════════════════════════════╝");
                }
            });
            this.mostrarMenu();
        }
        catch (error) {
            console.error("Erro ao mostrar postagens populares: ", error);
        }
    }
    excluirPostagem() {
        try {
            const idPostagem = Number(input("Digite o ID da postagem que deseja excluir:"));
            const postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(idPostagem);
            if (postagem === null) {
                throw new Error("Postagem não encontrada!");
            }
            else {
                // Remove a postagem do repositório de postagens
                this.redeSocial.getRepositorioDePostagens().excluirPostagens(idPostagem);
                console.log(`Postagem com ID ${idPostagem} excluída.`);
            }
            this.mostrarMenu();
        }
        catch (error) {
            console.error("Erro ao excluir postagem: ", error);
            this.mostrarMenu();
        }
    }
    consultarPerfil() {
        try {
            console.log("Opção de procurar perfil selecionada.");
            let nome_procurado = input("Informe o @: ");
            let perfilEncontrado = this.redeSocial.getRepositorioDePerfis().consultarPorNomeSimplificado(nome_procurado);
            if (perfilEncontrado == null) {
                throw new Error("User não encontrado!\n");
            }
            else {
                console.log((`\nUsuário com nome ${nome_procurado} encontrado:`));
                console.log(perfilEncontrado);
            }
            this.mostrarMenu();
        }
        catch (error) {
            console.error("Erro ao consultar perfil: ", error);
            this.mostrarMenu();
        }
    }
    incluirPostagem() {
        try {
            console.log("Opção de fazer postagem selecionada.");
            let nome_do_usuario_procurado = input("Digite o nome do usuário autor da postagem:");
            let perfil_autor = this.buscarPerfil(nome_do_usuario_procurado);
            if (perfil_autor) {
                let tipoPostagem = this.obterTipoPostagem();
                let texto_da_postagem = input("Digite o texto da postagem:");
                if (tipoPostagem === 1) {
                    const postagem_atual = this.criarPostagem(perfil_autor, texto_da_postagem);
                    if (postagem_atual) {
                        //salva na mémoria no Repositorio de Postagens
                        this.redeSocial.getRepositorioDePostagens().incluir(postagem_atual);
                        //salva na lista de postagens do autor
                        perfil_autor.adicionarPostagens(postagem_atual);
                        console.log("Postagem adicionada!");
                    }
                }
                else if (tipoPostagem === 2) {
                    const postagem_atual = this.criarPostagemAvancada(perfil_autor, texto_da_postagem);
                    if (postagem_atual) {
                        this.redeSocial.getRepositorioDePostagens().incluir(postagem_atual);
                        perfil_autor.adicionarPostagens(postagem_atual);
                        console.log("Postagem adicionada!");
                    }
                }
            }
            this.mostrarMenu();
        }
        catch (error) {
            console.error("Erro ao incluir postagem: ", error);
        }
    }
    buscarPerfil(nome) {
        try {
            let perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nome);
            while (perfil === null) {
                console.log("\nUsuário não encontrado! Digite o nome novamente.\n");
                nome = input("Digite o nome do usuário autor da postagem:");
                perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nome);
            }
            if (perfil !== null) {
                return perfil;
            }
            else {
                throw new Error("Perfil não encontrado\n");
            }
        }
        catch (error) {
            console.log("Erro ao buscar perfil: ", error);
            throw error;
        }
    }
    obterTipoPostagem() {
        try {
            let tipoPostagem = Number(input("Tipo da postagem (1-Postagem, 2-Postagem Avançada): "));
            while (tipoPostagem !== 1 && tipoPostagem !== 2) {
                console.log(`\nOpção inválida! Digite novamente.\n`);
                tipoPostagem = Number(input("Tipo da postagem (1-Postagem, 2-Postagem Avançada): "));
            }
            return tipoPostagem;
        }
        catch (error) {
            console.log("Erro ao obter tipo de postagem: ", error);
            throw error;
        }
    }
    criarPostagem(perfil, texto) {
        try {
            let lista_de_postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            let id_postagem_atual = lista_de_postagens.length > 0 ? lista_de_postagens[lista_de_postagens.length - 1].getId() + 1 : 1;
            return new Postagem(id_postagem_atual, texto, 0, 0, new Date(), perfil);
        }
        catch (error) {
            console.error("Erro ao criar postagem: ", error);
            throw error;
        }
    }
    criarPostagemAvancada(perfil, texto) {
        try {
            let lista_de_postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            let id_postagem_atual = lista_de_postagens.length > 0 ? lista_de_postagens[lista_de_postagens.length - 1].getId() + 1 : 1;
            let numeroMaximoVisualizacoes = Number(input("Digite o número máximo de visualizações:"));
            let lista_de_hashtags = [];
            let numero_hashtag_atual = 1;
            while (true) {
                let hashtag_atual = input(`Digite a ${numero_hashtag_atual} hashtag (#): `);
                lista_de_hashtags.push(`#${hashtag_atual}`);
                numero_hashtag_atual++;
                let continuar = input(`Deseja adicionar mais hashtags? (S-sim, N-não): `).toUpperCase();
                if (continuar !== 'S') {
                    break;
                }
            }
            return new PostagemAvancada(id_postagem_atual, texto, 0, 0, new Date(), perfil, lista_de_hashtags, numeroMaximoVisualizacoes);
        }
        catch (error) {
            console.error("Error ao criar postagem avançada: ", error);
            throw error;
        }
    }
    editarPostagem() {
        try {
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
                    const hashtags = [];
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
        catch (error) {
            console.error("Erro ao editar postagem: ", error);
            throw error;
        }
    }
    // Método para adicionar hashtags à postagem avançada
    adicionarHashtagsAPostagem(postagem, hashtags) {
        for (const hashtag of hashtags) {
            postagem.addHashtag(hashtag);
        }
    }
    consultarPostagens() {
        try {
            const opcao = Number(input(`Digite uma opção:
                        1 - Mostrar Todas as postagens
                        2 - Mostrar as postagens de um perfil
                        0 - Sair
                    `));
            switch (opcao) {
                case 0:
                    return;
                case 1:
                    const todasAsPostagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
                    if (todasAsPostagens.length === 0) {
                        console.log("Ainda não há postagens na Rede Social.");
                    }
                    else {
                        this.mostrarPostagens("Todas as postagens da Rede Social", todasAsPostagens);
                    }
                    break;
                case 2:
                    const nomeUsuario = input("Digite o nome do usuário: ");
                    const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeUsuario);
                    if (perfil) {
                        const postagensDoPerfil = perfil.getPostagens();
                        if (postagensDoPerfil.length === 0) {
                            console.log(`O perfil @${nomeUsuario} ainda não fez postagens.`);
                        }
                        else {
                            this.mostrarPostagens(`Todas as postagens de @${nomeUsuario}:`, postagensDoPerfil);
                        }
                    }
                    else {
                        console.log("Usuário não encontrado!");
                    }
                    break;
                default:
                    console.log("Opção inválida!");
            }
        }
        catch (error) {
            console.error("Erro ao consultar postagens: ", error);
        }
    }
    mostrarPostagensNaTela(postagem) {
        try {
            if (postagem === null) {
                console.log("Postagem não encontrada!");
                return;
            }
            console.log("╔════════════════════════════════════════════════════════╗");
            console.log(`║        POSTAGEM ${postagem instanceof PostagemAvancada ? "AVANÇADA" : ""}`);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║  ID: ${String(postagem.getId()).padEnd(6)}  DATA: ${String(postagem.getData().toLocaleString('pt-BR')).padEnd(23)}  `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║  USER: @${String(postagem.getPerfil().getNome()).padEnd(54)} `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║  TEXTO: ${String(postagem.getTexto()).padEnd(63)} `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║  CURTIDAS: ${String(postagem.getCurtidas()).padEnd(13)}╢ `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║  DESCURTIDAS: ${String(postagem.getDescurtidas()).padEnd(16)} `);
            console.log("╚════════════════════════════════════════════════════════╝");
            if (postagem instanceof PostagemAvancada) {
                console.log(`║  HASHTAGS: ${postagem.getHashtagParaString()}                                `);
                console.log("╟────────────────────────────────────────────────────────╢");
                console.log(`║  VISUALIZAÇÕES RESTANTES: ${postagem.getVisualizacoesRestantes()}        `);
            }
            console.log("╚════════════════════════════════════════════════════════╝");
        }
        catch (error) {
            console.error("Erro ao mostrar postagens na tela ", error);
        }
    }
    mostrarPostagens(titulo, postagens) {
        try {
            console.log(`\n\n\n${titulo}`);
            for (let i = 0; i < postagens.length; i++) {
                this.mostrarPostagensNaTela(postagens[i]);
            }
        }
        catch (error) {
            console.error("Error ao mostrar postagens", error);
        }
    }
    mostrarPostagemPorID(id_postagem) {
        try {
            const consulta_pela_postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
            if (!consulta_pela_postagem) {
                console.log("Não há postagem com o ID especificado!");
                return;
            }
            console.log("╔════════════════════════════════════════════════════════╗");
            console.log(`║        POSTAGEM ${consulta_pela_postagem instanceof PostagemAvancada ? 'AVANÇADA' : ''}`);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║ ID: ${consulta_pela_postagem.getId()} DATA: ${consulta_pela_postagem.getData().toLocaleString('pt-BR')}  `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║ USER: @${consulta_pela_postagem.getPerfil().getNome()} ║                                  `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║ TEXTO: ${consulta_pela_postagem.getTexto()}            ║                                   `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║ CURTIDAS: ${consulta_pela_postagem.getCurtidas()}      ║                                    `);
            console.log("╟────────────────────────────────────────────────────────╢");
            console.log(`║ DESCURTIDAS: ${consulta_pela_postagem.getDescurtidas()}                                     `);
            if (consulta_pela_postagem instanceof PostagemAvancada) {
                console.log(`║  HASHTAGS: ${consulta_pela_postagem.getHashtagParaString()}                                `);
                console.log("╟────────────────────────────────────────────────────╢");
                console.log(`║  VISUALIZAÇÕES RESTANTES: ${consulta_pela_postagem.getVisualizacoesRestantes()}        `);
            }
            console.log("╚════════════════════════════════════════════════════════╝");
        }
        catch (error) {
            console.error("Erro ao mostrar postagem por ID ", error);
        }
    }
    curtirPostagem() {
        try {
            const postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            if (postagens.length === 0) {
                console.log("Não há postagens disponíveis para curtir.");
                return;
            }
            console.log("Postagens disponíveis para curtir:");
            for (const postagem of postagens) {
                this.mostrarPostagemPorID(postagem.getId());
            }
            let id_postagem = input("Digite o ID da postagem que deseja curtir:");
            while (isNaN(Number(id_postagem)) || !postagens.some(postagem => postagem.getId() === Number(id_postagem))) {
                console.log("ID inválido. Por favor, digite o ID de uma postagem válida.");
                id_postagem = input("Digite o ID da postagem que deseja curtir:");
            }
            id_postagem = Number(id_postagem);
            const consulta_pela_postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
            if (consulta_pela_postagem === null) {
                throw new Error(`Não há postagem com o ID ${id_postagem} !!!`);
            }
            else {
                consulta_pela_postagem.curtir();
                console.log("Postagem atualizada:");
                this.mostrarPostagemPorID(id_postagem);
            }
        }
        catch (error) {
            console.error("Erro ao curtir postagem: ", error);
        }
    }
    descurtirPostagem() {
        try {
            const postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            if (postagens.length === 0) {
                console.log("Não há postagens disponíveis para descurtir.");
                return;
            }
            console.log("Postagens disponíveis para descurtir:");
            for (const postagem of postagens) {
                this.mostrarPostagemPorID(postagem.getId());
            }
            let id_postagem = input("Digite o ID da postagem que deseja descurtir:");
            while (isNaN(Number(id_postagem)) || !postagens.some(postagem => postagem.getId() === Number(id_postagem))) {
                console.log("ID inválido. Por favor, digite o ID de uma postagem válida.");
                id_postagem = input("Digite o ID da postagem que deseja descurtir:");
            }
            id_postagem = Number(id_postagem);
            const consulta_pela_postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(id_postagem);
            if (consulta_pela_postagem === null) {
                throw new Error(`Não há postagem com o ID ${id_postagem} !!!`);
            }
            else {
                consulta_pela_postagem.descurtir();
                console.log("Postagem atualizada:");
                this.mostrarPostagemPorID(id_postagem);
            }
        }
        catch (error) {
            console.error("Error ao descurtir postagem: ", error);
        }
    }
    comentarPostagem() {
        try {
            // Obter postagens disponíveis
            const postagensDisponiveis = this.redeSocial.getRepositorioDePostagens().getPostagens();
            // Verificar se há postagens disponíveis
            if (postagensDisponiveis.length === 0) {
                console.log("Não há postagens disponíveis para comentar.");
                return;
            }
            // Mostrar postagens disponíveis
            this.mostrarPostagens("Postagens Disponíveis", postagensDisponiveis);
            // Solicitar o ID da postagem
            const idPostagem = Number(input("Digite o ID da postagem que deseja comentar:"));
            const postagem = this.redeSocial.getRepositorioDePostagens().consultarPorID(idPostagem);
            if (postagem === null) {
                console.log("Postagem não encontrada!");
            }
            else {
                const comentario = input("Digite seu comentário:");
                const usuarioComentario = input("Digite seu nome de usuário:");
                postagem.adicionarComentario(comentario, usuarioComentario);
                console.log("Comentário adicionado com sucesso!");
            }
        }
        catch (error) {
            console.error("Erro ao comentar postagem: ", error);
        }
    }
    consultarComentariosDaPostagem() {
        const idPostagem = Number(input("Digite o ID da postagem que deseja ver os comentários:"));
        this.redeSocial.mostrarComentariosDaPostagem(idPostagem);
    }
    excluirPerfil() {
        try {
            let usuario_procurado = input("Digite o nome do usuário que deseja excluir:");
            const repositorioPerfis = this.redeSocial.getRepositorioDePerfis();
            const perfilExcluido = repositorioPerfis.consultarPorNome(usuario_procurado);
            if (perfilExcluido === null) {
                throw new Error("\nUsuário não encontrado.\n");
            }
            else {
                // Remover o perfil excluído da lista de seguidores dos perfis seguidos
                const perfisSeguidos = perfilExcluido.listarSeguidores();
                for (const perfilSeguido of perfisSeguidos) {
                    perfilSeguido.deixarDeSeguir(perfilExcluido);
                }
                // Remover o perfil excluído da lista de seguidores dos perfis seguidores
                const seguidores = perfilExcluido.listarSeguidores();
                for (const seguidor of seguidores) {
                    seguidor.deixarDeSeguir(perfilExcluido);
                }
                // Remover o perfil excluído da lista de perfis
                const perfisAtualizados = repositorioPerfis.getPerfis().filter(perfil => perfil.getNome() !== usuario_procurado);
                repositorioPerfis.setPerfis(perfisAtualizados);
                console.log(`\nO usuário com nome '${usuario_procurado}' foi excluído.`);
            }
        }
        catch (error) {
            console.error("Erro ao excluir perfil: ", error);
        }
    }
    filtrarPostagensPorHashtag(hashtag) {
        try {
            const postagens = this.redeSocial.getRepositorioDePostagens().getPostagens();
            // Filtra postagens avançadas que correspondem à hashtag
            return postagens.filter((postagem) => {
                if (postagem instanceof PostagemAvancada) {
                    return postagem.existeHashtag(hashtag);
                }
                return false;
            });
        }
        catch (error) {
            console.error(`Erro ao filtrar postagens por hastag: ${error.message}`);
            return [];
        }
    }
    visualizarPostagemPorHashtag() {
        try {
            const hashtag = input("Digite a hashtag que deseja pesquisar: ");
            const postagensComHashtag = this.filtrarPostagensPorHashtag(hashtag);
            if (postagensComHashtag.length === 0) {
                throw new Error(`Não há postagens com a hashtag ${hashtag}.`);
            }
            else {
                console.log(`Postagens com a hashtag ${hashtag}:`);
                this.mostrarPostagens(`Postagens com a hashtag ${hashtag}`, postagensComHashtag);
            }
        }
        catch (error) {
            console.error("Erro ao visualizar postagens por hashtag", error.message);
        }
        this.mostrarMenu();
    }
    seguirPerfil() {
        try {
            const nomeSeguidor = input("Digite o nome do perfil que deseja seguir: ");
            const nomePerfilAtual = input("Digite o seu nome de perfil: ");
            const seguidor = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeSeguidor);
            const perfilAtual = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfilAtual);
            if (seguidor && perfilAtual) {
                perfilAtual.seguir(seguidor);
            }
            else {
                throw new Error("Perfil não encontrado.");
            }
        }
        catch (error) {
            console.error("Erro ao seguir perfil: " + error.mensage);
        }
        this.mostrarMenu();
    }
    deixarDeSeguirPerfil() {
        try {
            const nomeSeguidor = input("Digite o nome do perfil que deseja deixar de seguir: ");
            const nomePerfilAtual = input("Digite o seu nome de perfil: ");
            const seguidor = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomeSeguidor);
            const perfilAtual = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfilAtual);
            if (seguidor && perfilAtual) {
                perfilAtual.deixarDeSeguir(seguidor);
                console.log(`${nomePerfilAtual} deixou de seguir ${nomeSeguidor}.`);
            }
            else {
                throw new Error("Perfil não encontrado.");
            }
        }
        catch (error) {
            console.error("Erro ao deixar de seguir o perfil: ", error.message);
        }
        this.mostrarMenu();
    }
    listarSeguidores() {
        try {
            const nomePerfil = input("Digite o nome do perfil para listar os seguidores: ");
            const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfil);
            if (perfil) {
                const seguidores = perfil.listarSeguidores();
                if (seguidores.length === 0) {
                    console.log(`${nomePerfil} não possui seguidores.`);
                }
                else {
                    console.log(`Seguidores de ${nomePerfil}:`);
                    for (const seguidor of seguidores) {
                        console.log(seguidor.getNome());
                    }
                }
            }
            else {
                throw new Error("Perfil não encontrado.");
            }
        }
        catch (error) {
            console.error("Erro ao listar seguidores: ", error.mensage);
        }
        this.mostrarMenu();
    }
    exibirTimeline() {
        try {
            const nomePerfil = input("Digite o nome do perfil para exibir a timeline: ");
            const perfil = this.redeSocial.getRepositorioDePerfis().consultarPorNome(nomePerfil);
            if (perfil) {
                const timeline = perfil.exibirTimeline();
                if (timeline.length === 0) {
                    console.log(`A timeline de ${nomePerfil} está vazia.`);
                }
                else {
                    console.log(`Timeline de ${nomePerfil}:`);
                    this.imprimirMoldura1();
                    for (const postagem of timeline) {
                        this.imprimirPostagem(postagem);
                        this.imprimirMoldura2();
                    }
                }
            }
            else {
                console.log("Perfil não encontrado.");
            }
        }
        catch (error) {
            console.error("Erro ao exibir timeline: ", error.message);
        }
        this.mostrarMenu();
    }
    imprimirMoldura1() {
        console.log("\n╔════════════════════════════════════════════════════════╗");
    }
    imprimirMoldura2() {
        console.log("╚════════════════════════════════════════════════════════╝");
    }
    imprimirPostagem(postagem) {
        const autor = postagem.getPerfil().getNome();
        console.log(`Autor: @${autor} - Data: ${postagem.getData().toLocaleString('pt-BR')} - Publicaçao: ${postagem.getTexto()}  `);
    }
}
let repositorio_postagens = null;
let repositorio_perfis = null;
while (true) {
    console.log("Escolha uma implementação da persistência: \n0 - SAIR\n1 - MULTIPLOS ARQUIVOS \n2 - ARQUIVO UNIFICADO: ");
    const opcaoPersistencia = input("MENU: ");
    if (opcaoPersistencia == '0') {
        break;
    }
    else if (opcaoPersistencia == '1') {
        repositorio_perfis = new RepositorioDePerfis();
        repositorio_postagens = new RepositorioDePostagens();
        break;
    }
    else if (opcaoPersistencia == '2') {
        repositorio_perfis = new RepositorioDePerfisUnificado();
        repositorio_postagens = new RepositorioDePostagensUnificado();
        break;
    }
}
if (repositorio_postagens && repositorio_perfis) {
    let redeSocial = new RedeSocial(repositorio_postagens, repositorio_perfis);
    redeSocial.carregarDados();
    let app = new App(redeSocial);
    app.iniciar();
}
//# sourceMappingURL=app1.js.map