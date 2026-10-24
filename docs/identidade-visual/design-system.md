# Guia de identidade visual — Pastelaria da Sogra

**Data:** 24/10/2026  
**Situação:** documentação do sistema visual já implementado; não constitui novo redesign.

## Objetivo

Manter consistência entre as seis páginas do protótipo acadêmico. As decisões abaixo foram **extraídas da implementação existente** em `css/style.css`, com componentes complementares em `css/galeria.css`, `css/contato.css` e `css/checkout.css`. Os protótipos Home V1, V2 e V3, guardados em `docs/prototipo/`, registram a evolução visual. Esta documentação não altera o site.

## Paleta de cores

| Token CSS | Valor | Uso dominante |
| --- | --- | --- |
| `--cor-vermelho` | `#b5241c` | Botões primários, destaques, links importantes |
| `--cor-vermelho-escuro` | `#8f1b16` | Hover dos botões principais |
| `--cor-amarelo` | `#f4b41a` | Detalhes visuais e foco do teclado |
| `--cor-creme` | `#fff7e8` | Fundos de apoio |
| `--cor-branco` | `#ffffff` | Superfícies e cartões |
| `--cor-texto` | `#28231f` | Texto principal |
| `--cor-texto-secundario` | `#6b625c` | Descrições e informações auxiliares |
| `--cor-borda` | `#e8ddd0` | Divisórias e contornos |
| `--cor-fundo-claro` | `#fffaf2` | Áreas de fundo claro |
| `--cor-fundo-cinza` | `#f7f4ef` | Seções em contraste discreto |

Os valores acima são a **referência do projeto atual**, não recomendações para mudar a paleta.

## Tipografia e estrutura

- **Títulos:** `Georgia, "Times New Roman", serif`, definidos em `--fonte-titulo`.
- **Textos e controles:** `Arial, Helvetica, sans-serif`, definidos em `--fonte-texto`.
- **Largura máxima da área de conteúdo:** `1100px`, com largura responsiva de até 90% da tela.
- **Bordas arredondadas:** `8px`, `14px` e `22px` (raios pequeno, médio e grande).
- **Sombras:** variáveis `--sombra-leve` e `--sombra-media`.
- **Transições:** `--transicao: 0.3s ease`.
- **Título `h1` geral:** `clamp(2.4rem, 4vw, 3.5rem)`; há ajustes específicos para celular na Home.

## Componentes reutilizáveis

- `.container`: organiza largura e alinhamento das seções.
- `.cabecalho`, `.menu-principal`, `.botao-menu`: navegação fixa no topo e alternativa para telas menores.
- `.botao`, `.botao-primario`, `.botao-secundario`: padrão de ações e estados de foco/hover.
- `.secao-cabecalho` e `.secao-destaque`: hierarquia textual recorrente.
- Cardápio e carrinho: cards de produto, resumo, contador e botões de quantidade, com estilos no CSS principal.
- Galeria: classes `.pg-*`, filtros e modal, isolados em `css/galeria.css`.
- Checkout: blocos de formulário, opções e mensagens de validação, isolados em `css/checkout.css`.

## Adaptação e acessibilidade

- Uso de `grid`, `flex`, medidas fluidas e media queries para desktop, tablet e celular.
- Rótulos em campos de formulário, `alt` nas imagens e indicação de foco visível.
- Mensagens de erro associadas aos campos no checkout demonstrativo.
- Respeito à preferência `prefers-reduced-motion` nas transições específicas do checkout.

**Limites de comprovação:** existência de estilos acessíveis no código não equivale à aprovação de todos os testes por teclado, contraste ou leitor de tela. Esses itens permanecem sujeitos à auditoria funcional.

## Rastreabilidade

- [Protótipos da Home V1–V3](../prototipo/)
- [CSS principal](../../css/style.css)
- [CSS da galeria](../../css/galeria.css)
- [CSS do checkout](../../css/checkout.css)
- [Checklist de auditoria da AC2](../testes/checklist-ac2.md)
