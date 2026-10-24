# Checkout demonstrativo — decisões e testes (AC2)

## Objetivo e escopo

Implementar a finalização **simulada** do carrinho da Pastelaria da Sogra preservando as páginas e a lógica do carrinho existente (`js/script.js`). A interface utiliza `carrinho.html`, `css/checkout.css` e `js/checkout.js`.

Este site não recebe pedidos reais, não reserva entregas e não processa pagamentos. O botão iFood abre serviço externo; os produtos locais não são enviados ao iFood.

## Decisões técnicas

- HTML semântico com um H1, fieldsets/legends e rótulos associados aos campos.
- SEO: título e metadescrição específicos; `noindex, follow` para a página de carrinho, que é dinâmica e individual. Outras páginas mantêm suas configurações de indexação.
- CSS separado, com variáveis e componentes já estabelecidos em `css/style.css` e breakpoints mobile/tablet.
- JS separado, sem backend, banco, requisições externas, armazenamento persistente de nome, telefone ou endereço.
- `localStorage` armazena **somente os produtos do carrinho**, como na versão anterior; é limpo após a simulação.
- Retirada não solicita endereço; entrega exige rua, número e bairro.
- Formas de pagamento apenas declarativas (Pix, cartão, dinheiro); troco opcional com validação.
- Horário consultado em `America/Sao_Paulo`: terça a domingo, 18h–23h; escolha imediata apenas no expediente. Agendamento demonstrativo oferecido no máximo para os próximos 7 dias, em intervalos de 30 minutos até as 22h30.
- A tela de confirmação informa com destaque que nenhuma compra real foi concluída.

## Testes automatizados realizados antes da entrega

Em navegador Chromium, com o HTML e CSS do checkout e uma substituição controlada das funções básicas do carrinho para isolar o fluxo, foram executadas verificações em 390, 768 e 1280 px:

- Carrinho vazio oculta formulário e exibe botão para retornar ao cardápio.
- Carrinho preenchido apresenta formulário e total correto (2 × R$ 16,90 + R$ 9,90 = R$ 43,70).
- Fora do expediente, a opção imediata fica indisponível e o agendamento é oferecido.
- Telefone inválido é recusado e não conclui o fluxo.
- Dados válidos levam à confirmação demonstrativa.
- O carrinho é limpo ao concluir a simulação.
- Com a pastelaria aberta, a opção imediata pode ser escolhida.
- Retirada oculta campos de endereço; dinheiro mostra campo de troco e impede valor inferior ao total.
- Segunda-feira não aparece como data de atendimento.
- Não houve exceções de JavaScript nem rolagem horizontal nas três larguras testadas.

**Limite da evidência:** os testes acima usaram funções substitutas para a lógica básica do carrinho, pois os arquivos de desenvolvimento locais não estavam disponíveis neste ambiente. Ainda é obrigatório executar uma bateria integrada com `js/script.js` verdadeiro no navegador da equipe e, depois, na Vercel. Sem isso, não marcar a tarefa como 100% concluída.

## Roteiro de aceitação manual — antes de marcar Done

- [ ] Adicionar dois produtos pelo Cardápio real, voltar ao Carrinho e confirmar quantidades/total.
- [ ] Aumentar, diminuir e remover itens; conferir se os valores do checkout acompanham as mudanças.
- [ ] Testar carrinho totalmente vazio e botão para voltar ao Cardápio.
- [ ] Testar nome e telefone inválidos; conferir mensagem e foco no campo.
- [ ] Testar entrega com endereço faltante; depois com endereço completo.
- [ ] Testar retirada (sem endereço obrigatório).
- [ ] Testar Pix, cartão e dinheiro; dinheiro com troco inferior ao total.
- [ ] Testar horário fechado e agendamento futuro; testar horário aberto com simulação imediata.
- [ ] Concluir simulação; conferir resumo, mensagem acadêmica e carrinho limpo.
- [ ] Repetir em celular 390 px, tablet 768 px e desktop 1280 px sem rolagem horizontal.
- [ ] Testar teclado (Tab, Shift+Tab, Enter, Espaço), foco visível, labels e contraste.
- [ ] Publicar na Vercel e repetir os testes de fluxos completos.
- [ ] Registrar resultado e commit no Trello; documentar limitações na apresentação.

## Requisitos do professor a acompanhar no quadro geral

Página Carrinho e checkout contribuem para funcionamento, acessibilidade, responsividade e mais de 10 funcionalidades. O projeto também exige: pelo menos 5 páginas, 20 mídias, 30 estilizações CSS, menu interativo, páginas interligadas, README, 30 commits e deploy. Os critérios da AC2 incluem qualidade técnica, justificativas de decisões, gestão do backlog, versionamento e colaboração da equipe (20% cada).

**Este registro não afirma que todos os requisitos já estão concluídos**: o deploy, a contagem de commits e as validações integradas precisam de comprovação final.
