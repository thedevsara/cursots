"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
const prompt = require('prompt-sync')();
const fs = require('fs');
class Perfil {
    constructor(_id, _nome, _email) {
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
    // Método para salvar perfil em um arquivo
    salvarPerfil() {
        const perfilData = {
            id: this._id,
            nome: this._nome,
            email: this._email
            // Adicione outros dados do perfil se necessário
        };
        fs.writeFileSync(`perfil_${this._id}.json`, JSON.stringify(perfilData));
    }
    // Método para carregar perfil de um arquivo
    static carregarPerfil(id) {
        try {
            const perfilData = fs.readFileSync(`perfil_${id}.json`, 'utf8');
            const parsedData = JSON.parse(perfilData);
            return new Perfil(parsedData.id, parsedData.nome, parsedData.email);
        }
        catch (error) {
            return null;
        }
    }
}
exports.Perfil = Perfil;
class Postagem {
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil) {
        this._id = _id;
        this._texto = _texto;
        this._curtidas = _descurtidas;
        this._descurtidas = _descurtidas;
        this._data = _data;
        this._perfil = _perfil;
    }
    curtir() {
        this._curtidas++;
    }
    descurtidas() {
        this._descurtidas++;
    }
    ehPopular() {
        return this._curtidas > this._descurtidas * 1.5;
    }
    getId() {
        return this._id;
    }
    getTexto() {
        return this._texto;
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
}
class PostagemAvancada extends Postagem {
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil, _hashtags, _visualizacoesRestantes) {
        super(_id, _texto, _curtidas, _descurtidas, _data, _perfil);
        this._visualizacoesRestantes = _visualizacoesRestantes;
        this._hashtags = _hashtags;
    }
    adicionarHashtag(hashtag) {
        if (this._hashtags.indexOf(hashtag) == -1)
            this._hashtags.push(hashtag);
    }
    getHashtags() {
        return this._hashtags;
    }
    getVisualizacoesRestantes() {
        return this._visualizacoesRestantes;
    }
    setVisualizacoesRestantes(nova_visualizacao) {
        this._visualizacoesRestantes = nova_visualizacao;
    }
    existeHashtag(_hashtag) {
        for (let i = 0; i < this._hashtags.length; i++) {
            if (_hashtag == this._hashtags[i]) {
                return true;
            }
        }
        return false;
    }
    decrementarVisualizacoes() {
        this._visualizacoesRestantes--;
    }
}
class RepositorioDePerfis {
    constructor(_perfil = []) {
        this._perfis = [];
        this._perfis = _perfil;
    }
    getPerfil() {
        return this._perfis;
    }
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    consultar(_id, _nome, _email) {
        for (let i = 0; i < this._perfis.length; i++) {
            const perfil = this._perfis[i];
            if ((_id !== undefined && perfil.getId() !== _id) ||
                (_nome !== undefined && perfil.getNome() !== _nome) ||
                (_email !== undefined && perfil.getEmail() !== _email)) {
            }
            return perfil;
        }
        return null;
    }
}
class RepositorioDePostagens {
    constructor(postagem = []) {
        this._postagem = [];
        this._postagem = postagem;
    }
    getPostagem() {
        return this._postagem;
    }
    incluir(postagem) {
        this._postagem.push(postagem);
    }
    consultarTodas() {
        return this._postagem;
    }
    consultar(_id, _texto, _hashtag, perfil) {
        const postagemFiltradas = [];
        for (let i = 0; i < this._postagem.length; i++) {
            const postagem = this._postagem[i];
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
                        postagemFiltradas.push(postagem);
                    }
                }
            }
            if (perfil !== undefined && postagem.getPerfil() !== perfil) {
                continue;
            }
            postagemFiltradas.push(postagem);
        }
        return postagemFiltradas;
    }
}
class RedeSocial {
    constructor(repositorioDePostagens, repositorioDePerfis) {
        this._repositorioDePostagens = repositorioDePostagens;
        this._repositorioDePerfis = repositorioDePerfis;
    }
    getPostagens() {
        return this._repositorioDePostagens.getPostagem();
    }
    // Método para exibir postagens populares que ainda podem ser exibidas
    exibirPostagensPopulares() {
        const postagens = this._repositorioDePostagens.consultarTodas();
        return postagens.filter(postagem => {
            if (postagem instanceof PostagemAvancada) {
                return postagem.ehPopular() && postagem.getVisualizacoesRestantes() > 0;
            }
            return false;
        });
    }
    // Método para exibir as hashtags mais populares
    exibirHashtagsPopulares() {
        const postagens = this._repositorioDePostagens.consultarTodas();
        const hashtagsCount = new Map();
        postagens.forEach(postagem => {
            if (postagem instanceof PostagemAvancada) {
                const hashtags = postagem.getHashtags();
                hashtags.forEach((hashtag) => {
                    if (hashtagsCount.has(hashtag)) {
                        hashtagsCount.set(hashtag, hashtagsCount.get(hashtag) + 1);
                    }
                    else {
                        hashtagsCount.set(hashtag, 1);
                    }
                });
            }
        });
        // Ordenar as hashtags por contagem (do maior para o menor)
        return new Map([...hashtagsCount.entries()].sort((a, b) => b[1] - a[1]));
    }
    incluirPerfil(perfil) {
        let perfisExistentes = this._repositorioDePerfis.getPerfil();
        for (let i = 0; i < perfisExistentes.length; i++) {
            let _perfil_existente = perfisExistentes[i];
            if (_perfil_existente.getId() === perfil.getId() ||
                _perfil_existente.getNome() === perfil.getNome() ||
                _perfil_existente.getEmail() === perfil.getEmail()) {
                console.log("Perfil já cadastrado.");
                return;
            }
        }
        this._repositorioDePerfis.incluir(perfil);
    }
    consultarPerfil(_id, _nome, _email) {
        const perfis = this._repositorioDePerfis.getPerfil();
        for (let i = 0; i < perfis.length; i++) {
            const perfil = perfis[i];
            if ((_id !== undefined && perfil.getId() !== _id) ||
                (_nome !== undefined && perfil.getNome() !== _nome) ||
                (_email !== undefined && perfil.getEmail() !== _email)) {
                return perfil;
            }
        }
        return null;
    }
    incluirPostagem(postagem) {
        let postagensExistentes = this._repositorioDePostagens.getPostagem();
        for (let i = 0; i < postagensExistentes.length; i++) {
            let postagemExistente = postagensExistentes[i];
            if (postagemExistente.getId() === postagem.getId()) {
                console.log("Já existe uma postagem com esse ID.");
                return;
            }
        }
        this._repositorioDePostagens.incluir(postagem);
        console.log("Sua postagem foi adicionada!!!");
    }
    consultarPostagemporId(_id) {
        const postagens = this._repositorioDePostagens.getPostagem();
        for (const postagem of postagens) {
            if (postagem.getId() === _id) {
                return postagem;
            }
        }
        return null;
    }
    curtir(idPostagem) {
        let _postagem = this._repositorioDePostagens.getPostagem();
        for (let i = 0; i < _postagem.length; i++) {
            let post = _postagem[i];
            if (post.getId() === idPostagem) {
                post.curtir();
                console.log("Você curtiu essa postagem <3");
                return;
            }
        }
    }
    descurtir(idPostagem) {
        let _postagem = this._repositorioDePostagens.getPostagem();
        for (let i = 0; i < _postagem.length; i++) {
            let post = _postagem[i];
            if (post.getId() === idPostagem) {
                post.descurtidas();
                console.log("Você descurtiu essa postagem :(");
                return;
            }
        }
    }
    decrementarVisualizacoes(postagem) {
        if (postagem instanceof PostagemAvancada) {
            postagem.decrementarVisualizacoes();
            if (postagem.getVisualizacoesRestantes() < 0) {
                postagem.setVisualizacoesRestantes(0);
            }
            console.log("Visualizações decrementadas.");
        }
        else {
            console.log("Não é possível decrementar visualizacoes.");
        }
    }
    exibirPostagensPorPerfil(id) {
        let postagens = this._repositorioDePostagens.getPostagem();
        let postsExibiveis = [];
        for (let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
            if (post.getPerfil().getId() === id) {
                if (post instanceof PostagemAvancada) {
                    let postagemAvancada = post;
                    this.decrementarVisualizacoes(postagemAvancada);
                    if (postagemAvancada.getVisualizacoesRestantes() >= 0) {
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
    exibirPostagensPorHashtags(_hashtag) {
        let postagens = this._repositorioDePostagens.getPostagem();
        let postsExibiveis = [];
        for (let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
            if (post instanceof PostagemAvancada && post.existeHashtag(_hashtag)) {
                if (post.existeHashtag(_hashtag)) {
                    this.decrementarVisualizacoes(post);
                    if (post.getVisualizacoesRestantes() >= 0) {
                        postsExibiveis.push(post);
                    }
                }
            }
        }
        return postsExibiveis;
    }
}
class App {
    constructor(redeSocial) {
        this.redeSocial = redeSocial;
    }
    go() {
        console.log("\n>>>>> CRF BLOG <<<<<");
        this.mostrarMenu();
    }
    mostrarMenu() {
        console.log("\nBEM-VINDO AO BLOG OFICIAL DOS RUBROS-NEGROS");
        console.log("\n1- Criar Conta \n2- Pesquisar Perfil \n3- Fazer Postagem", "\n4- Visualizar Postagem  \n5- Curtir Postagem \n6- Descurtir Postagem \n7- Decrementar Visualizacões", "\n8- Visualizar Postagem por perfil \n9- Visualizar Postagem por hashtag", "\n0- Sair");
        const opcao = prompt("\nDigite o número da opção desejada: ");
        switch (opcao) {
            case '1':
                this.incluirPerfil();
                break;
            case '2':
                this.consultarPerfil();
                break;
            case '3':
                this.incluirPostagem();
                break;
            case '4':
                this.consultarPostagempoId();
                break;
            case '5':
                this.curtirPostagem();
                break;
            case '6':
                this.descurtirPostagem();
                break;
            case '7':
                this.decrementarVisualizacoes();
                break;
            case '8':
                this.exibirPostagensPorPerfil();
                break;
            case '9':
                this.exibirPostagensPorHashtag();
                break;
            case '0':
                this.sair();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                this.mostrarMenu();
        }
    }
    incluirPerfil() {
        console.log("Opção de criar perfil selecionada.");
        const nome = prompt("Informe o nome do perfil: ");
        const email = prompt("Informe o email do perfil: ");
        const novoPerfil = new Perfil(1, nome, email);
        console.log("Perfil cadastrado com sucesso");
        this.redeSocial.incluirPerfil(novoPerfil);
        this.mostrarMenu();
    }
    exibirPostagensPopulares() {
        const postagensPopulares = this.redeSocial.exibirPostagensPopulares();
        console.log("Postagens populares que ainda podem ser exibidas:");
        postagensPopulares.forEach(postagem => {
            console.log(`ID: ${postagem.getId()}, Texto: ${postagem.getTexto()}`);
        });
    }
    exibirHashtagsPopulares() {
        const hashtagsPopulares = this.redeSocial.exibirHashtagsPopulares();
        console.log("Hashtags mais populares:");
        hashtagsPopulares.forEach((count, hashtag) => {
            console.log(`${hashtag} - ${count} vezes`);
        });
    }
    consultarPerfil() {
        console.log("Opção de procurar perfil selecionada.");
        const nome = parseInt(prompt("Informe o nome do perfil do usuário: "));
        const perfilEncontrado = this.redeSocial.consultarPerfil(1, '', '');
        if (perfilEncontrado) {
            console.log("Perfil encontrado:");
            console.log(`ID: ${perfilEncontrado.getId()}`);
            console.log(`Nome: ${perfilEncontrado.getNome()}`);
            console.log(`Email: ${perfilEncontrado.getEmail()}`);
        }
        else {
            console.log("Perfil não encontrado.");
        }
        this.mostrarMenu();
    }
    incluirPostagem() {
        console.log("Opção de fazer postagem selecionada.");
        const id = parseInt(prompt("Informe o ID da postagem: "));
        const texto = prompt("Informe o texto da postagem: ");
        const hashtag = prompt("Informe o hashtag: ");
        const perfilId = parseInt(prompt("Informe o ID do perfil da postagem: "));
        const perfil = this.redeSocial.consultarPerfil(perfilId, '', '');
        if (!perfil) {
            console.log("Perfil não encontrado. Não é possível fazer a postagem.");
            this.mostrarMenu();
            return;
        }
        const novaPostagem = new PostagemAvancada(id, texto, 0, 0, new Date(), perfil, [hashtag], 0);
        this.redeSocial.incluirPostagem(novaPostagem);
        console.log("Postagem adicionada com a hashtag: ", hashtag);
        this.mostrarMenu();
    }
    consultarPostagempoId() {
        console.log("Opção de visualizar postagens selecionada.");
        const idPostagem = parseInt(prompt("Informe o ID da postagem: "));
        const postagem = this.redeSocial.consultarPostagemporId(idPostagem);
        if (postagem) {
            console.log("Postagens encontradas:");
            console.log(`ID: ${postagem.getId()}`);
            console.log(`Texto: ${postagem.getTexto()}`);
            console.log(`Curtidas: ${postagem.getCurtidas()}`);
            console.log(`Descurtidas: ${postagem.getDescurtidas()}`);
            console.log(`Data: ${postagem.getData()}`);
            console.log(`Perfil: ${postagem.getPerfil().getNome()}`);
            console.log("\n");
        }
        else {
            console.log("Nenhuma postagem encontrada.");
        }
        this.mostrarMenu();
    }
    curtirPostagem() {
        console.log("Opção de curtir postagem selecionada.");
        this.listarPostagens();
        const idPostagem = parseInt(prompt("\nInforme o ID da postagem que deseja curtir: "));
        const postagem = this.redeSocial.consultarPostagemporId(idPostagem);
        if (postagem) {
            console.log("Você está curtindo a seguinte postagem:");
            console.log(`ID: ${postagem.getId()}`);
            console.log(`Texto: ${postagem.getTexto()}`);
            console.log(`Curtidas: ${postagem.getCurtidas()}`);
            console.log(`Descurtidas: ${postagem.getDescurtidas()}`);
            console.log(`Data: ${postagem.getData()}`);
            console.log(`Perfil: ${postagem.getPerfil().getNome()}`);
            // Realize a ação de curtir a postagem
            this.redeSocial.curtir(idPostagem);
        }
        else {
            console.log("Postagem não encontrada.");
        }
        this.mostrarMenu();
    }
    listarPostagens() {
        const postagens = this.redeSocial.getPostagens();
        if (postagens.length > 0) {
            console.log("\nPostagens disponíveis para curtir:");
            for (const postagem of postagens) {
                console.log(`ID: ${postagem.getId()}, Texto: ${postagem.getTexto()}`);
            }
        }
        else {
            console.log("\nNenhuma postagem disponível para curtir.");
        }
    }
    descurtirPostagem() {
        console.log("Opção de descurtir postagem selecionada.");
        this.listarPostagens();
        const idPostagem = parseInt(prompt("\nInforme o ID da postagem que deseja descurtir: "));
        const postagem = this.redeSocial.consultarPostagemporId(idPostagem);
        if (postagem) {
            console.log("Você descurtiu a seguinte postagem:");
            console.log(`ID: ${postagem.getId()}`);
            console.log(`Texto: ${postagem.getTexto()}`);
            console.log(`Curtidas: ${postagem.getCurtidas()}`);
            console.log(`Descurtidas: ${postagem.getDescurtidas()}`);
            console.log(`Data: ${postagem.getData()}`);
            console.log(`Perfil: ${postagem.getPerfil().getNome()}`);
            // Realize a ação de descurtir a postagem
            this.redeSocial.descurtir(idPostagem);
        }
        else {
            console.log("Postagem não encontrada.");
        }
        this.mostrarMenu();
    }
    decrementarVisualizacoes() {
        console.log("Opção de decrementar visualizações selecionada.");
        const idPostagem = parseInt(prompt("Informe o ID da postagem que deseja decrementar visualizações: "));
        const postagens = this.redeSocial.exibirPostagensPorPerfil(idPostagem);
        if (postagens.length === 0) {
            console.log("Postagem não encontrada.");
            this.mostrarMenu();
            return;
        }
        for (const postagem of postagens) {
            if (postagem instanceof PostagemAvancada) {
                this.redeSocial.decrementarVisualizacoes(postagem);
            }
            else {
                console.log("A postagem não é avançada e não pode ter visualizações decrementadas.");
            }
        }
        console.log("Visualizações decrementadas.");
        this.mostrarMenu();
    }
    exibirPostagensPorPerfil() {
        console.log("Opção de visualizar postagens por perfil selecionada.");
        const idPerfil = parseInt(prompt("Informe o ID do perfil para ver suas postagens: "));
        const postagens = this.redeSocial.exibirPostagensPorPerfil(idPerfil);
        if (postagens.length > 0) {
            console.log(`Postagens do perfil com ID ${idPerfil}:`);
            for (const postagem of postagens) {
                console.log(`ID: ${postagem.getId()}`);
                console.log(`Texto: ${postagem.getTexto()}`);
                console.log(`Curtidas: ${postagem.getCurtidas()}`);
                console.log(`Descurtidas: ${postagem.getDescurtidas()}`);
                console.log(`Data: ${postagem.getData()}`);
                console.log("\n");
            }
        }
        else {
            console.log("Nenhuma postagem encontrada para este perfil.");
        }
        this.mostrarMenu();
    }
    exibirPostagensPorHashtag() {
        console.log("Opção de visualizar postagens por hashtag selecionada.");
        const hashtag = prompt("Informe a hashtag que deseja buscar: ");
        const postagens = this.redeSocial.exibirPostagensPorHashtags(hashtag);
        if (postagens.length > 0) {
            console.log(`Postagens com a hashtag #${hashtag}:`);
            for (const postagem of postagens) {
                console.log(`ID: ${postagem.getId()}`);
                console.log(`Texto: ${postagem.getTexto()}`);
                console.log(`Curtidas: ${postagem.getCurtidas()}`);
                console.log(`Descurtidas: ${postagem.getDescurtidas()}`);
                console.log(`Data: ${postagem.getData()}`);
                console.log("\n");
            }
        }
        else {
            console.log("Nenhuma postagem encontrada com esta hashtag.");
        }
        this.mostrarMenu();
    }
    sair() {
        console.log("Saindo do Blog. Até logo!");
        process.exit(0);
    }
}
const redeSocial = new RedeSocial(new RepositorioDePostagens(), new RepositorioDePerfis());
const app = new App(redeSocial);
app.go();
//# sourceMappingURL=prova.js.map