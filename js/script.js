// Chave utilizada para guardar o carrinho no navegador
const CHAVE_CARRINHO = "pastelariaDaSograCarrinho";

// Recupera os produtos salvos
function obterCarrinho() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_CARRINHO));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}

// Atualiza o número de produtos no cabeçalho
function atualizarContadorCarrinho() {
    const contador = document.getElementById("contador-carrinho");

    if (!contador) return;

    const carrinho = obterCarrinho();

    const quantidadeTotal = carrinho.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    contador.textContent = quantidadeTotal;
    atualizarAtalhoCarrinho();
}
/* ==================================================
   EXIBIÇÃO DINÂMICA DO CARDÁPIO
================================================== */

function renderizarCardapio() {
    const grade = document.getElementById("grade-cardapio");

    // Executa somente na página do cardápio
    if (!grade) return;

    grade.replaceChildren();

    PRODUTOS_CARDAPIO.forEach((produto) => {

        // Card do produto
        const card = document.createElement("article");
        card.className = "produto-card";
        // Informações utilizadas nos filtros e na pesquisa
        card.dataset.categoria = produto.categoria;
        card.dataset.opcaoVegetal = String(
            Boolean(produto.opcaoVegetal)
        );

        card.dataset.busca = [
            produto.nome,
            produto.descricao,
            produto.observacao || ""
        ].join(" ");

        // Área da imagem
        const areaImagem = document.createElement("div");
        areaImagem.className = "produto-imagem";

        if (produto.imagem) {
            const imagem = document.createElement("img");

            imagem.src = produto.imagem;
            imagem.alt = produto.nome;
            imagem.loading = "lazy";

            areaImagem.appendChild(imagem);
        } else {
            areaImagem.classList.add("produto-sem-foto");

            const mensagem = document.createElement("span");
            mensagem.textContent = "Produto sem foto";

            areaImagem.appendChild(mensagem);
        }

        // Informações
        const conteudo = document.createElement("div");
        conteudo.className = "produto-conteudo";

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const descricao = document.createElement("p");
        descricao.textContent = produto.observacao
            ? `${produto.descricao} ${produto.observacao}`
            : produto.descricao;

        // Rodapé do card
        const rodape = document.createElement("div");
        rodape.className = "produto-rodape";

        const preco = document.createElement("span");
        preco.className = "produto-preco";
        preco.textContent = formatarMoeda(produto.preco);

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao-adicionar";
        botao.textContent = "Adicionar";

        botao.dataset.produto = produto.nome;
        botao.dataset.preco = produto.preco;

        botao.setAttribute(
            "aria-label",
            `Adicionar ${produto.nome} ao carrinho`
        );

        rodape.append(preco, botao);
        conteudo.append(titulo, descricao, rodape);
        card.append(areaImagem, conteudo);

        grade.appendChild(card);
    });

    // Atualiza a quantidade de produtos exibidos
    const contador = document.getElementById("contagem-produtos");

    if (contador) {
        contador.textContent =
            `${PRODUTOS_CARDAPIO.length} produtos encontrados`;
    }
}

// Gera os cards antes de registrar os eventos dos botões
renderizarCardapio();
// Identifica os botões Adicionar
document.querySelectorAll(".botao-adicionar").forEach((botao) => {

    botao.addEventListener("click", () => {

        const nome = botao.dataset.produto;
        const preco = Number(botao.dataset.preco);

        if (!nome || !Number.isFinite(preco) || preco <= 0) return;

        const carrinho = obterCarrinho();

        const produtoExistente = carrinho.find(
            (produto) => produto.nome === nome
        );

        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });
        }

        localStorage.setItem(
            CHAVE_CARRINHO,
            JSON.stringify(carrinho)
        );

        atualizarContadorCarrinho();
        // Mostra uma confirmação ao adicionar o produto
        const quantidadeAtual = carrinho.find(
            (produto) => produto.nome === nome
        ).quantidade;

        botao.textContent = `Adicionado (${quantidadeAtual}) ✓`;

        // Reinicia o tempo caso o usuário clique novamente
        clearTimeout(botao.temporizadorFeedback);

        botao.temporizadorFeedback = setTimeout(() => {
            botao.textContent = "Adicionar";
        }, 1500);
    });
});

// Exibe a quantidade salva ao carregar a página
atualizarContadorCarrinho();
// Formata valores em reais
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}

// Exibe os produtos e calcula o resumo do carrinho
function exibirCarrinho() {
    const lista = document.getElementById("lista-carrinho");

    // Executa somente na página do carrinho
    if (!lista) return;

    const carrinho = obterCarrinho();

    const totalItens = document.getElementById("total-itens");
    const totalCarrinho = document.getElementById("total-carrinho");

    let quantidadeTotal = 0;
    let valorTotal = 0;

    lista.replaceChildren();

    if (carrinho.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Seu carrinho está vazio.";
        lista.appendChild(mensagem);
    }

    carrinho.forEach((produto) => {
        const quantidade = Number(produto.quantidade);
        const preco = Number(produto.preco);

        if (
            !produto.nome ||
            !Number.isInteger(quantidade) ||
            quantidade <= 0 ||
            !Number.isFinite(preco) ||
            preco <= 0
        ) return;

        const subtotal = preco * quantidade;

        quantidadeTotal += quantidade;
        valorTotal += subtotal;

        const item = document.createElement("div");
        item.className = "item-carrinho";

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `${quantidade} × ${formatarMoeda(preco)} = ${formatarMoeda(subtotal)}`;

        // Área dos controles do produto
        const controles = document.createElement("div");
        controles.className = "item-carrinho-acoes";

        // Botão para diminuir
        const botaoMenos = document.createElement("button");
        botaoMenos.type = "button";
        botaoMenos.textContent = "−";
        botaoMenos.className = "quantidade-botao";
        botaoMenos.setAttribute("aria-label", `Diminuir ${produto.nome}`);

        botaoMenos.addEventListener("click", () => {
            alterarQuantidade(produto.nome, -1);
        });

        // Quantidade atual
        const quantidadeTexto = document.createElement("span");
        quantidadeTexto.className = "item-carrinho-quantidade";
        quantidadeTexto.textContent = quantidade;

        // Botão para aumentar
        const botaoMais = document.createElement("button");
        botaoMais.type = "button";
        botaoMais.textContent = "+";
        botaoMais.className = "quantidade-botao";
        botaoMais.setAttribute("aria-label", `Aumentar ${produto.nome}`);

        botaoMais.addEventListener("click", () => {
            alterarQuantidade(produto.nome, 1);
        });

        // Botão para remover o produto
        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "botao-remover";

        botaoRemover.addEventListener("click", () => {
            alterarQuantidade(produto.nome, -quantidade);
        });

        // Adiciona os controles ao produto
        controles.append(
            botaoMenos,
            quantidadeTexto,
            botaoMais,
            botaoRemover
        );

        item.append(nome, detalhes, controles);
        lista.appendChild(item);
    });

    totalItens.textContent = quantidadeTotal;
    totalCarrinho.textContent = formatarMoeda(valorTotal);
}

// Inicializa a exibição do carrinho
exibirCarrinho();
// Altera a quantidade de um produto no carrinho
function alterarQuantidade(nome, variacao) {
    const carrinho = obterCarrinho();

    const produto = carrinho.find(
        (item) => item.nome === nome
    );

    if (!produto) return;

    produto.quantidade += variacao;

    // Remove produtos cuja quantidade chegou a zero
    const carrinhoAtualizado = carrinho.filter(
        (item) => item.quantidade > 0
    );

    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinhoAtualizado)
    );

    atualizarContadorCarrinho();
    exibirCarrinho();
}
// Atualiza o acesso flutuante ao carrinho na Home
function atualizarAtalhoCarrinho() {
    const atalho = document.getElementById("atalho-carrinho");

    // O atalho existe somente na Home
    if (!atalho) return;

    const carrinho = obterCarrinho();

    let quantidadeTotal = 0;
    let valorTotal = 0;

    carrinho.forEach((produto) => {
        const quantidade = Number(produto.quantidade);
        const preco = Number(produto.preco);

        quantidadeTotal += quantidade;
        valorTotal += preco * quantidade;
    });

    // Esconde o botão se o carrinho estiver vazio
    atalho.hidden = quantidadeTotal === 0;

    if (quantidadeTotal === 0) return;

    document.getElementById("atalho-carrinho-itens").textContent =
        `${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"}`;

    document.getElementById("atalho-carrinho-total").textContent =
        formatarMoeda(valorTotal);

    atalho.setAttribute(
        "aria-label",
        `Ver carrinho com ${quantidadeTotal} itens. Total: ${formatarMoeda(valorTotal)}`
    );
}
/* ==================================================
   PESQUISA E FILTROS DO CARDÁPIO
================================================== */

// Permite pesquisar com ou sem acentos
function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function configurarFiltrosCardapio() {
    const grade = document.getElementById("grade-cardapio");
    const campoBusca = document.getElementById("busca-produtos");
    const contador = document.getElementById("contagem-produtos");
    const mensagemVazia = document.getElementById(
        "mensagem-sem-resultados"
    );

    // Executa somente na página do cardápio
    if (!grade || !campoBusca || !contador || !mensagemVazia) {
        return;
    }

    const botoes = document.querySelectorAll(
        ".cardapio-filtros button"
    );

    const cards = grade.querySelectorAll(".produto-card");

    let categoriaSelecionada = "todos";

    // Aplica pesquisa e categoria ao mesmo tempo
    function aplicarFiltros() {
        const pesquisa = normalizarTexto(campoBusca.value.trim());

        let produtosEncontrados = 0;

        cards.forEach((card) => {
            const categoriaCorreta =
                categoriaSelecionada === "todos" ||

                (categoriaSelecionada === "pasteis" &&
                    ["tradicionais", "especiais"].includes(
                        card.dataset.categoria
                    )) ||

                (categoriaSelecionada === "veganos" &&
                    card.dataset.opcaoVegetal === "true") ||

                card.dataset.categoria === categoriaSelecionada;

            const textoProduto = normalizarTexto(
                card.dataset.busca
            );

            const correspondePesquisa =
                textoProduto.includes(pesquisa);

            const exibir = categoriaCorreta && correspondePesquisa;

            card.hidden = !exibir;

            if (exibir) {
                produtosEncontrados++;
            }
        });

        contador.textContent =
            `${produtosEncontrados} ` +
            (produtosEncontrados === 1
                ? "produto encontrado"
                : "produtos encontrados");

        mensagemVazia.hidden = produtosEncontrados > 0;
    }

    // Pesquisa enquanto o usuário digita
    campoBusca.addEventListener("input", aplicarFiltros);

    // Seleção das categorias
    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            categoriaSelecionada = botao.dataset.categoria;

            botoes.forEach((outroBotao) => {
                const selecionado = outroBotao === botao;

                outroBotao.classList.toggle(
                    "filtro-ativo",
                    selecionado
                );

                outroBotao.setAttribute(
                    "aria-pressed",
                    String(selecionado)
                );
            });

            aplicarFiltros();
        });
    });

    // Identifica a categoria escolhida na Home
    const categoriaDaHome = window.location.hash
        .replace("#", "")
        .toLowerCase();

    // Procura o botão da categoria escolhida
    const botaoInicial = Array.from(botoes).find(
        (botao) => botao.dataset.categoria === categoriaDaHome
    );

    if (botaoInicial) {
        // Ativa o filtro correspondente
        botaoInicial.click();

        // Leva o visitante até a área dos filtros
        document.querySelector(".cardapio-filtros")
            .scrollIntoView({ block: "start" });
    } else {
        // Se não houver categoria selecionada, mostra todos
        aplicarFiltros();
    }
}

// Inicializa os filtros
configurarFiltrosCardapio();
/* ==================================================
   STATUS AUTOMÁTICO DE FUNCIONAMENTO
================================================== */

function atualizarStatusFuncionamento() {
    const status = document.getElementById("status-funcionamento");

    // Executa somente onde o indicador existe
    if (!status) return;

    // Obtém o dia e a hora de Sorocaba
    const partes = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Sao_Paulo",
        weekday: "short",
        hour: "2-digit",
        hour12: false
    }).formatToParts(new Date());

    const dia = partes.find(parte => parte.type === "weekday").value;
    const hora = Number(
        partes.find(parte => parte.type === "hour").value
    );

    // Terça a domingo, das 18h às 23h
    const aberto = dia !== "Mon" && hora >= 18 && hora < 23;

    status.textContent = aberto
        ? "Aberto agora"
        : "Fechado no momento";
}

// Executa ao abrir a página
atualizarStatusFuncionamento();

// Atualiza automaticamente a cada minuto
if (document.getElementById("status-funcionamento")) {
    setInterval(atualizarStatusFuncionamento, 60000);
}

/* ==================================================
   MENU MOBILE
================================================== */

const botaoMenu = document.getElementById("botao-menu");
const menuPrincipal = document.getElementById("menu-principal");

if (botaoMenu && menuPrincipal) {

    botaoMenu.addEventListener("click", () => {

        const aberto = menuPrincipal.classList.toggle("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", String(aberto));

        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );
    });

    // Fecha o menu ao selecionar uma página
    menuPrincipal.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            menuPrincipal.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
        });
    });
}