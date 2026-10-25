# Wireframes de baixa fidelidade — Pastelaria da Sogra

Data de elaboração documental: 24/10/2026.

## Natureza dos artefatos

Estes wireframes são **reconstruções documentais retrospectivas** baseadas na estrutura e nas funcionalidades das páginas HTML já implementadas e aprovadas pela equipe. **Não são evidência de que estes desenhos tenham sido produzidos antes do desenvolvimento**. O protótipo independente da Home e da página Nossa História já foi documentado em pastas próprias e não é substituído por este kit.

## Arquivos

Cada página contém 4 arquivos: desktop e mobile em PNG, mais seus correspondentes SVG (vetoriais). Os diagramas são de baixa fidelidade e não representam pixels, fotografias ou estilos finais.

- `docs/prototipo/cardapio/`: campo de pesquisa, filtros, grade de 24 itens, estado sem resultados, atalho de carrinho.
- `docs/prototipo/carrinho/`: itens e resumo, estado vazio, dados, entrega/retirada, agenda, pagamento simulado, confirmação fictícia.
- `docs/prototipo/galeria/`: hero com fachada, categorias, grade, modal navegável, CTA.
- `docs/prototipo/contato/`: hero com fachada, canais, endereço, horário, mapa, rota e CTA.

## Como inserir no repositório

Copiar a pasta `docs/` que está no ZIP para a **raiz do projeto**, mesclando-a com a pasta `docs/` existente, sem apagar conteúdos antigos. Conferir os 16 arquivos. **Nunca substituir ou apagar os protótipos da Home ou Nossa História**.

Depois conferir, adicionar e publicar: `git add docs/prototipo/cardapio docs/prototipo/carrinho docs/prototipo/galeria docs/prototipo/contato`, `git diff --cached --name-only`, `git commit -m "Documenta wireframes retrospectivos das quatro paginas"`, `git push origin main`.

## Trello e evidências

No Trello, marcar cada checklist após a publicação e conferência no GitHub. Os responsáveis e a aprovação do grupo devem ser confirmados no quadro. A data de construção deve permanecer explícita; não reescrever o histórico para simular antecipação.
