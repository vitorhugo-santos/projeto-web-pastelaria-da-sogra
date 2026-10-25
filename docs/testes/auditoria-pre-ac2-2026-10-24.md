# Auditoria de pré-apresentação — 24/10/2026

**Escopo:** repositório GitHub (147 arquivos, incluindo 7 documentos HTML de páginas e erro, CSS, JS, mídia e documentação) e quadro Trello com 41 cartões.  
**Cautela:** inspeções estáticas, testes isolados de funções e navegação externa limitada **não equivalem a uma bateria ponta a ponta completa na Vercel**.

## Confirmado na inspeção dos arquivos

- Páginas: `index.html`, `cardapio.html`, `carrinho.html`, `historia.html`, `galeria.html`, `contato.html` e `404.html`.
- Referências locais de arquivos HTML/CSS/JS/imagens examinadas existem no repositório, inclusive referências de `js/produtos.js` e `js/dados-galeria.js`.
- Nenhum `id` duplicado detectado nessas sete páginas, links `href` locais explicitamente vazios/sem destino ou âncoras locais apontando para elementos ausentes.
- Todas as imagens declaradas diretamente nas páginas HTML possuem `alt`.
- Dependências carregadas na ordem esperada: catálogo antes de script na página Cardápio, script principal antes de checkout no Carrinho, dados da galeria antes de galeria.js.
- CSS do checkout contém `.pagina-carrinho [hidden] {display:none!important}`, impedindo conflitos nos blocos condicionais com `display:grid/flex`.
- O sitemap e robots.txt existem; sua publicação e indexação efetiva precisam ser confirmadas na produção.
- Não foi modificada a identidade visual ou o CSS nesta auditoria.

## Defeito reproduzido e corrigido

**Carrinho — leitura de dados locais malformados.** Em `js/script.js`, a função `obterCarrinho()` aceitava qualquer array JSON, inclusive `[null]`. Em seguida, `atualizarContadorCarrinho()` podia lançar `Cannot read properties of null (reading 'quantidade')`, interrompendo o script da página.

**Correção mínima:** validar e filtrar registros antes de retorná-los, mantendo as propriedades `nome`, `preco` e `quantidade` dos produtos. Não altera os produtos normais, o HTML, o CSS ou os dados salvos.

**Testes isolados executados:** carrinho válido, array misto com registros inválidos, formato antigo/incompleto e JSON inválido. Todos passaram após a correção. Também foi verificada a sintaxe do JavaScript. **Teste manual de ponta a ponta na Vercel ainda é necessário.**

Commit: https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra/commit/12e75be1487c20092c45cbd6cbd39a510642778d

## Pontos que ainda merecem testes de tentativa de quebra

1. **Carrinho:** vazio, com um item, múltiplos itens, remoção, atualização rápida de quantidade, atualização da página e alteração de `localStorage` no DevTools.
2. **Checkout:** formulário vazio; nome curto; telefone sem DDD; entrega com rua/número/bairro vazios; retirada sem endereço; troco inferior ao total; horário fora do expediente; datas futuras e segunda-feira; confirmação fictícia e limpeza do carrinho.
3. **Cardápio:** busca com/sem acentos, resultado vazio, filtros combinados, categorias acessadas por links da Home, add/quantidade.
4. **Galeria:** abrir/fechar modal, Escape, setas, filtros com zero itens, troca rápida entre fotos, teclado e retorno de foco.
5. **Menu e responsividade:** teclado, 375/390/768/1280 px, acessibilidade básica, sem rolagem horizontal.
6. **Links externos:** iFood, Instagram, Facebook, avaliação Google, rota Google Maps — verificar no navegador; acesso por consulta automática pode ser bloqueado pelos serviços.
7. **Vercel:** 404 e páginas publicadas após os últimos commits, verificar console sem exceções.
8. **Lighthouse:** repetir uma medição mobile e desktop da Home após as mudanças; não prometer pontuação fixa ou 100 em todas as páginas.
9. **Mídia:** confirmar autorização apropriada para fotografias com pessoas identificáveis.

## Testes adicionais no código — continuidade da auditoria

**Agendamento e relógio de Sorocaba:** os cálculos presentes em `js/checkout.js` foram executados isoladamente em seis cenários com datas e horários explícitos: sábado antes de abrir, sábado 18h, sábado 22h35, domingo 22h45, segunda 19h e terça 23h. **6/6 passaram**: expediente terça a domingo das 18h às 23h, segunda fechada, antecedência de 30 min para horários agendáveis do mesmo dia e seleção de próximos dias úteis. Esses testes não substituem um teste integrado do formulário na Vercel.

**Catálogo:** `js/produtos.js` possui 24 itens; IDs e nomes não repetidos, preços finitos e positivos, categorias preenchidas. Os quatro produtos de destaque da Home foram comparados ao catálogo: nomes e preços coincidem.

**Pendência editorial/comercial:** o produto **Brócolis e Tomate** está marcado com `opcaoVegetal: true`, descrito como opção vegana, mas contém a observação `Verificar opção de massa vegana.`. Portanto, não há comprovação de que a versão disponível seja necessariamente vegana. A equipe precisa confirmar se a apresentação como vegana é apropriada antes de afirmar isso no site; nenhuma alteração foi realizada na classificação.

**Próxima validação necessária:** testar no navegador os caminhos completos de carrinho/checkout, especialmente opção entrega/retirada e pagamento em dinheiro com troco menor que o total.

## Nova rodada — validação de checkout e scripts

- **Retirada sem endereço:** usuário confirmou que o checkout aceitou modalidade retirada com endereço em branco, mantendo outros campos válidos.
- **Troco insuficiente:** usuário confirmou que a finalização foi bloqueada e apresentou a validação esperada.
- **Sintaxe JavaScript:** os cinco arquivos `js/script.js`, `js/checkout.js`, `js/galeria.js`, `js/dados-galeria.js` e `js/produtos.js` foram analisados sintaticamente, sem erros.
- **Vínculos JavaScript/HTML:** todos os IDs referenciados por `js/checkout.js` foram localizados em `carrinho.html`, e todos os IDs exigidos por `js/galeria.js` foram localizados em `galeria.html`. O script compartilhado possui referências opcionais às diversas páginas com verificações de existência no código.
- **Teste da publicação:** houve tentativa de abrir as páginas da Vercel pelo ambiente de consulta, mas a ferramenta não conseguiu acessá-las. Isso **não demonstra indisponibilidade do site**; a equipe segue validando no navegador. Não declarar 404/links externos como aprovados sem o teste real.

## Testes complementares de navegação confirmados pela equipe

- Página inexistente na Vercel retorna a experiência 404 personalizada e oferece retorno à Home, conforme confirmação manual.
- CTA **Pedir pelo iFood** e link **Avaliar no Google** foram abertos pelo integrante e direcionaram corretamente.
- Links restantes (rotas no Google Maps, Instagram, Facebook) ainda não foram validados nessa rodada específica; não tratá-los como aprovados por inferência.

## Teste adicional — navegação por teclado (24/10/2026)

**Aprovado manualmente pela equipe na Vercel:** uso de `Tab` e `Enter` para abrir uma imagem na Galeria; teclas `ArrowRight` e `ArrowLeft` para navegar; `Esc` para fechar; foco retorna ao botão da fotografia aberta. O menu mobile também foi aberto e seus links acessados com `Tab` e `Enter`.

Estes resultados demonstram os cenários **efetivamente testados**; não equivalem a auditoria WCAG completa, verificação de leitor de tela, contraste de todas as páginas ou responsividade em 768 px.

## Trello — achados organizacionais em 24/10/2026

- Estado consultado: **41 cartões** — 14 Product Backlog, 6 Sprint Backlog, 12 Doing, 9 Done.
- **10 cartões em Doing sem responsáveis atribuídos**. Devem ser revisados pela equipe; não criar atribuições fictícias.
- Algumas descrições ainda falam em alterações locais não publicadas, README incompleto ou deploy pendente apesar da existência de commits e URL. Atualizá-las com links, sem mover a Done antes dos testes previstos.
- Cartões de wireframes de Cardápio, Carrinho, Contato e Galeria não contam com todos os protótipos formais identificados em `docs/prototipo/` (não confundir página publicada com protótipo retrospectivo).
- A equipe publicou sete tags SemVer retrospectivas; `v1.0.0` ainda não foi criada e depende de estabilidade/aceitação final.
- Cartões do Product Backlog que se referem a autenticação, banco, pagamentos e pedidos reais são **roadmap futuro**, não funcionalidade entregue na AC2.

## Limites desta auditoria

A Home publicada foi acessível via consulta pública, mas o ambiente de testes automatizados não conseguiu acessar diretamente todos os endpoints externos. Não foi executada uma bateria funcional completa no navegador da Vercel nem checada a disponibilidade real de todas as redes sociais e do iFood. Assim, **não declarar "zero erros"**. Os testes pendentes são ações concretas de aceitação pré-apresentação.
