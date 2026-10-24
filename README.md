# Pastelaria da Sogra — Projeto de Web Design

Website acadêmico desenvolvido para a disciplina de **Web Design**, com o objetivo de apresentar a Pastelaria da Sogra, divulgar um cardápio demonstrativo e oferecer uma experiência interativa e responsiva.

> **Aviso importante:** este é um projeto educacional, sem vínculo oficial com a Pastelaria da Sogra. O cardápio, os preços e o carrinho têm finalidade demonstrativa. O site não registra pedidos reais nem processa pagamentos. Para realizar compras, utilize o iFood ou os canais próprios da empresa.

## Páginas e funcionalidades

| Página | Arquivo | Recursos |
| --- | --- | --- |
| Início | `index.html` | Apresentação, produtos em destaque, categorias, avaliações, galeria e localização |
| Cardápio | `cardapio.html` | 24 produtos demonstrativos, pesquisa, filtros por categoria e adição ao carrinho |
| Carrinho | `carrinho.html` | Quantidades, remoção de itens, cálculo do total e armazenamento local |
| Nossa História | `historia.html` | Apresentação institucional, fotografia e diferenciais |
| Galeria | `galeria.html` | 16 fotografias reais, filtros e visualização ampliada |
| Contato | `contato.html` | Endereço, horários, telefone, redes sociais, mapa e rota |

Outros recursos incluem navegação responsiva, menu mobile, indicador de funcionamento, contador e acesso rápido ao carrinho.

**Imagens:** a Galeria contém fotografias reais da pastelaria. O Cardápio é demonstrativo e utiliza imagens ilustrativas em parte dos produtos; outros itens ainda estão em revisão visual.

## Tecnologias

- **HTML5:** estrutura das páginas.
- **CSS3:** identidade visual e layouts responsivos.
- **JavaScript:** pesquisa, filtros, galeria, interações e carrinho.
- **localStorage:** armazenamento temporário do carrinho no navegador, sem banco de dados.
- **Git/GitHub:** versionamento e documentação.
- **Trello:** planejamento e acompanhamento das tarefas.
- **Vercel:** plataforma escolhida para publicação do site estático.

Não há backend, cadastro de clientes, checkout real ou integração de pagamento nesta versão.

## Organização dos arquivos

```text
projeto-web-pastelaria-da-sogra/
├── index.html
├── cardapio.html
├── carrinho.html
├── historia.html
├── galeria.html
├── contato.html
├── css/
│   ├── style.css
│   ├── galeria.css
│   └── contato.css
├── js/
│   ├── script.js
│   ├── produtos.js
│   ├── dados-galeria.js
│   └── galeria.js
├── assets/img/
├── docs/
└── README.md
```

A pasta `docs/` reúne protótipos e respectivas versões, referências visuais, curadoria da Galeria e benchmarking.

## Como executar localmente

1. Clone o repositório ou baixe os arquivos da branch `main`.
2. Abra a pasta no **Visual Studio Code**.
3. Inicie `index.html` usando um servidor local, como a extensão **Live Server**.
4. Navegue entre as páginas e teste o cardápio e o carrinho.

Não é necessário executar `npm install`, configurar banco de dados ou executar uma etapa de compilação.

## Carrinho demonstrativo e pedidos

Os produtos adicionados ficam salvos no navegador por `localStorage`. É possível aumentar ou diminuir quantidades, remover itens e visualizar o valor total. **Esses dados não são enviados à pastelaria** e não representam uma compra efetivada.

O acesso ao **iFood** é independente do carrinho demonstrativo; os itens escolhidos neste site não são transferidos automaticamente para o iFood.

## Equipe

| Integrante | RA |
| --- | --- |
| Vitor Hugo Rosario dos Santos | 190508 |
| Davi de Oliveira Silva | 263232 |
| Matheus Giachetti | 264921 |
| Gabriel Martins Antunes | 264099 |
| Gabriel Martins Antunes | 263648 |

**Observação:** os dois últimos integrantes são pessoas diferentes que possuem o mesmo nome. Cada um está identificado pelo seu respectivo RA.

## Planejamento e entregas

- **AC2 — apresentação:** 27/10/2026.
- **AF — relatório final:** 23/11/2026.
- **GitHub:** [repositório do projeto](https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra).
- **Trello:** [quadro de desenvolvimento](https://trello.com/b/rBHFUDul/projeto-web-design).
- **Vercel:** publicação em preparação; inserir aqui o endereço público após a implantação e validação.

**Situação:** seis páginas implementadas; ajustes visuais, testes integrados e publicação em andamento.

## Uso acadêmico

Projeto elaborado exclusivamente para fins educacionais. Marcas, imagens e referências pertencem aos respectivos titulares. Este repositório não representa um canal oficial de atendimento ou vendas da Pastelaria da Sogra.
