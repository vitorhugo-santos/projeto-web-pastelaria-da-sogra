# Roteiro de apresentação — AC2, 27/10/2026

**Projeto:** website acadêmico da Pastelaria da Sogra  
**URL de demonstração:** https://projeto-web-pastelaria-da-sogra.vercel.app/index.html  
**Código:** https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra  
**Quadro:** https://trello.com/b/rBHFUDul/projeto-web-design

> Documento para organizar a apresentação, não comprovação de que o ensaio foi realizado. **Participantes e falas devem ser definidos pelos cinco integrantes**, considerando o que cada pessoa realmente desenvolveu. O tempo abaixo é apenas uma sugestão, sujeito às instruções do professor.

## Objetivo da apresentação

Demonstrar qualidade técnica, decisões e processo de desenvolvimento, gestão do backlog, histórico de versões e colaboração da equipe. Segundo a rubrica disponibilizada, são cinco critérios de peso igual (**20% cada**).

## Proposta de sequência de slides (9 telas)

| Slide | Conteúdo | Evidência a abrir |
| --- | --- | --- |
| 1 | Nome do projeto, proposta acadêmica, integrantes | `README.md` |
| 2 | Problema: divulgação, cardápio, fotos, contato e navegação | Home publicada |
| 3 | Pesquisa, benchmarking, requisitos e sitemap | `docs/benchmarking/`, `docs/` e Trello |
| 4 | Prototipação e evolução V1 → V2 → V3 | `docs/prototipo/home-v1/`, `home-v2/`, `home-v3/` |
| 5 | Identidade visual, arquitetura e tecnologias | `docs/identidade-visual/design-system.md`; HTML/CSS/JS |
| 6 | Demonstração funcional: seis páginas e fluxo de compra simulado | Site na Vercel |
| 7 | Organização ágil: Product Backlog, Sprint Backlog, Doing e Done | Quadro Trello atualizado |
| 8 | Commits, melhoria contínua, deploy, testes e Lighthouse | Histórico GitHub e `docs/testes/` |
| 9 | Resultados, limitações, trabalho futuro e encerramento | README, Trello, checklist |

**Tempo sugerido (não oficial):** 8–12 minutos, com reserva para perguntas e testes do professor. Ajustar à duração determinada pela disciplina.

## Roteiro de demonstração ao vivo (sem inserir pedidos reais)

1. Abrir a **Home**: apresentação, categorias, produtos em destaque, avaliações e localização.
2. Ir ao **Cardápio**: demonstrar busca, filtros e adição de dois itens.
3. Abrir o **Carrinho**: mostrar quantidades, totais, atalho “Continuar para finalização” e atualização dos valores.
4. Executar o **checkout demonstrativo**: mostrar validação de telefone incorreto, preenchimento fictício válido, retirada/entrega, horário e confirmação. **Não coletar dados reais de pessoas nem finalizar pagamentos reais.**
5. Apresentar a **Galeria**: filtros, modal e navegação entre fotos.
6. Apontar **Nossa História** e **Contato**: apresentação, informações úteis, mapa e link de rota.
7. Abrir o **Trello** e o **GitHub**: mostrar trabalho concluído, commits em português, protótipos, decisões e evidências de testes.

**Plano B de apresentação:** manter links salvos e capturas da Home, do cardápio, do checkout, da galeria, do Trello e do histórico Git para eventuais problemas de rede. Capturas precisam ser produzidas pela equipe e não devem simular resultados que não ocorreram.

## Fatos demonstráveis e limites

- São seis páginas HTML principais em site estático, com CSS e JavaScript.
- O catálogo é demonstrativo, com 24 itens declarados em `js/produtos.js`.
- A galeria usa 16 fotografias selecionadas e miniaturas otimizadas.
- O carrinho usa `localStorage` para **os itens**, e o checkout valida campos para exibir uma **confirmação fictícia**. Não há backend, usuário autenticado, pedido real, agendamento real nem integração de pagamento.
- O acesso ao iFood é externo; **os produtos escolhidos no carrinho deste site não são enviados ao iFood**.
- A consulta de CEP foi implementada experimentalmente e **retirada por decisão do grupo**.
- O Lighthouse foi medido na Home, mas as pontuações variam entre execuções. Valores datados e evidências estão em `docs/testes/checklist-ac2.md`; não anunciar “100 em tudo” nem alegar que a nota da Home vale para as seis páginas.
- A colaboração dos integrantes deve ser sustentada pelos registros reais; não atribuir autoria com base somente na presença do nome no README.

## Relação direta com a rubrica

| Critério (20% cada) | O que explicar e mostrar |
| --- | --- |
| Qualidade técnica | Funcionamento, HTML semântico, responsividade, validação, limites honestos |
| Processo de desenvolvimento | Benchmarking, requisitos, protótipos, decisões técnicas, refinamentos |
| Gerenciamento do backlog | Quatro listas, cartões, etiquetas, prazos, justificativas das tarefas não concluídas |
| Versionamento | Repositório, mensagens de commit, exemplos de correções, histórico e versão de apresentação, se criada |
| Trabalho em equipe | Participação dos cinco integrantes, distribuição comprovada, decisões coletivas, colaboração |

## Conferência antes da apresentação

- [ ] Cinco integrantes revisam os nomes e papéis reais de cada um.
- [ ] Cada cartão concluído no Trello possui evidência; cards incompletos não estão em Done.
- [ ] Testar ligações externas, fluxo de checkout com erros, carrinho vazio e apresentação em notebook/projetor.
- [ ] Confirmar acesso ao GitHub, Vercel e Trello sem depender de credenciais que só uma pessoa possui.
- [ ] Exportar slides ou registrar screenshots para plano B.
- [ ] Ensaiar a fala de cada participante e preparar respostas sobre escolhas tecnológicas e limitações.
- [ ] Preservar uma versão estável do site antes do dia 27/10; não incluir recursos novos de última hora.

## Perguntas que o professor pode fazer

**Por que não há login, pedidos reais e pagamentos?** O escopo acadêmico prioriza a experiência de navegação e a simulação funcional sem exigir backend, segurança transacional e regras operacionais reais.

**Por que usar localStorage?** Para manter os itens do carrinho entre páginas no navegador em um protótipo estático. Isso **não** substitui um banco de dados para vendas reais.

**O que o Lighthouse comprovou?** Pontuações e métricas **de laboratório da Home em execuções específicas**; elas orientaram priorização, mas não asseguram velocidade idêntica em todos os dispositivos ou páginas.

**Por que há tarefas futuras no backlog?** Porque foram registradas como evolução planejada, separadas do escopo efetivamente demonstrado na AC2.

**Como a equipe utilizou GitHub/Trello/Vercel?** Responder com exemplos reais de commits, cartões, alterações e URL da publicação.
