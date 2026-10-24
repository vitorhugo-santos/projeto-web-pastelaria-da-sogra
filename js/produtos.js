/* ==================================================
   CATÁLOGO DE PRODUTOS — PASTELARIA DA SOGRA
   Seleção demonstrativa baseada no cardápio impresso
================================================== */

const PRODUTOS_CARDAPIO = [

    // PASTÉIS TRADICIONAIS
    {
        id: "carne",
        nome: "Carne",
        categoria: "tradicionais",
        descricao: "Pastel tradicional de carne.",
        preco: 18.90,
        imagem: "assets/img/produtos/cardapio/pastel-carne.jpg"
    },
    {
        id: "queijo",
        nome: "Queijo",
        categoria: "tradicionais",
        descricao: "Pastel recheado com queijo.",
        preco: 16.90,
        imagem: "assets/img/produtos/cardapio/pastel-queijo.jpg"
    },
    {
        id: "pizza",
        nome: "Pizza",
        categoria: "tradicionais",
        descricao: "Presunto, mussarela, tomate e orégano.",
        preco: 19.00,
        imagem: "assets/img/produtos/cardapio/pastel-pizza.jpg"
    },
    {
        id: "frango-catupiry",
        nome: "Frango com Catupiry",
        categoria: "tradicionais",
        descricao: "Frango desfiado com Catupiry.",
        preco: 19.50,
        imagem: "assets/img/produtos/cardapio/pastel-frango-catupiry.jpg"
    },
    {
        id: "calabresa-mussarela",
        nome: "Calabresa e Mussarela",
        categoria: "tradicionais",
        descricao: "Calabresa com mussarela.",
        preco: 19.50,
        imagem: "assets/img/produtos/cardapio/pastel-calabresa-mussarela.jpg"
    },
    {
        id: "palmito-mussarela",
        nome: "Palmito e Mussarela",
        categoria: "tradicionais",
        descricao: "Palmito com mussarela.",
        preco: 19.50,
        imagem: "assets/img/produtos/cardapio/pastel-palmito-mussarela.jpg"
    },
    {
        id: "brocolis-bacon",
        nome: "Brócolis, Mussarela e Bacon",
        categoria: "tradicionais",
        descricao: "Brócolis, mussarela e bacon.",
        preco: 20.50,
        imagem: "assets/img/produtos/cardapio/pastel-brocolis-bacon.jpg"
    },

    // PASTÉIS ESPECIAIS
    {
        id: "costela-mussarela",
        nome: "Costela e Mussarela",
        categoria: "especiais",
        descricao: "Costela desfiada com mussarela.",
        preco: 25.90,
        imagem: "assets/img/produtos/destaques/produto-costela.jpg"
    },
    {
        id: "carne-seca-catupiry",
        nome: "Carne seca com Catupiry",
        categoria: "especiais",
        descricao: "Carne seca desfiada com Catupiry.",
        preco: 25.90,
        imagem: "assets/img/produtos/destaques/produto-carne-seca-catupiry.jpg"
    },
    {
        id: "lombo-canadense",
        nome: "Lombo Canadense",
        categoria: "especiais",
        descricao: "Lombo canadense, Catupiry e milho.",
        preco: 20.50,
        imagem: "assets/img/produtos/destaques/produto-lombo-canadense.jpg"
    },
    {
        id: "bacalhau",
        nome: "Bacalhau",
        categoria: "especiais",
        descricao: "Bacalhau, alho-poró, azeitonas pretas e purê de batata.",
        preco: 29.90,
        imagem: "assets/img/produtos/destaques/produto-bacalhau.jpg",
        observacao: "Produto sazonal. Consulte disponibilidade."
    },
    {
        id: "camarao-catupiry",
        nome: "Camarão no Catupiry",
        categoria: "especiais",
        descricao: "Camarão com Catupiry.",
        preco: 27.50,
        imagem: "assets/img/produtos/cardapio/pastel-camarao-catupiry.jpg"
    },
    {
        id: "big-carne",
        nome: "Big Carne (30 cm)",
        categoria: "especiais",
        descricao: "Pastel de carne em tamanho especial de 30 cm.",
        preco: 39.90,
        imagem: null
    },
    {
        id: "brocolis-tomate",
        nome: "Brócolis e Tomate",
        categoria: "especiais",
        opcaoVegetal: true,
        descricao: "Opção vegana com brócolis e tomate.",
        preco: 20.50,
        imagem: null,
        observacao: "Verificar opção de massa vegana."
    },

    // PASTÉIS DOCES
    {
        id: "chocolate-leite",
        nome: "Chocolate ao Leite",
        categoria: "doces",
        descricao: "Pastel recheado com chocolate ao leite.",
        preco: 19.50,
        imagem: null
    },
    {
        id: "romeu-julieta",
        nome: "Romeu e Julieta",
        categoria: "doces",
        descricao: "Combinação de queijo e goiabada.",
        preco: 20.50,
        imagem: null
    },
    {
        id: "chocolate-banana",
        nome: "Chocolate com Banana",
        categoria: "doces",
        descricao: "Chocolate com banana.",
        preco: 20.50,
        imagem: "assets/img/produtos/cardapio/pastel-chocolate-banana.jpg"
    },
    {
        id: "nutella-banana",
        nome: "Nutella com Banana",
        categoria: "doces",
        descricao: "Creme de avelã Nutella com banana.",
        preco: 26.90,
        imagem: null
    },
    {
        id: "kit-kat",
        nome: "Kit Kat",
        categoria: "doces",
        descricao: "Pastel doce recheado com Kit Kat.",
        preco: 27.50,
        imagem: "assets/img/produtos/cardapio/pastel-kit-kat.jpg"
    },

    // SALGADOS E PORÇÕES
    {
        id: "coxinha-frango",
        nome: "Coxinha de Frango com Requeijão",
        categoria: "salgados",
        descricao: "Coxinha de frango com requeijão.",
        preco: 10.25,
        imagem: "assets/img/produtos/cardapio/coxinha-frango-requeijao.jpg",
        observacao: "Consulte disponibilidade."
    },
    {
        id: "mini-bolinhas-queijo",
        nome: "Mini Bolinhas de Queijo",
        categoria: "salgados",
        descricao: "Porção com 10 unidades.",
        preco: 16.90,
        imagem: null,
        observacao: "Consulte disponibilidade."
    },

    // BEBIDAS
    {
        id: "coca-lata",
        nome: "Coca-Cola (lata)",
        categoria: "bebidas",
        descricao: "Refrigerante Coca-Cola lata.",
        preco: 8.00,
        imagem: null
    },
    {
        id: "agua-sem-gas",
        nome: "Água Mineral sem Gás",
        categoria: "bebidas",
        descricao: "Água mineral sem gás.",
        preco: 5.00,
        imagem: null
    },
    {
        id: "suco-laranja",
        nome: "Suco Natural de Laranja",
        categoria: "bebidas",
        descricao: "Suco natural de laranja, 300 ml.",
        preco: 9.90,
        imagem: null
    }

];