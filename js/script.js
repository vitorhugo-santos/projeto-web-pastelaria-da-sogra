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