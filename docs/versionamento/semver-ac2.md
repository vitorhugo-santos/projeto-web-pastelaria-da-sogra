# Estratégia de versionamento semântico — AC2

**Projeto:** Pastelaria da Sogra (website acadêmico)  
**Data:** 24/10/2026  
**Repositório:** https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra

## Situação verificada

A consulta aos refs Git `refs/tags/` do repositório, em 24/10/2026, **não retornou tags publicadas**. O histórico de **commits existe**, mas commits não substituem tags nomeadas para identificar versões entregues.

> Não afirmar que `v1.0.0`, `v1.1.0` ou `v1.1.1` já foram criadas até que apareçam no GitHub. Os exemplos abaixo são uma **política de versionamento proposta**.

## MAJOR.MINOR.PATCH (SemVer)

- **MAJOR**: incremento quando ocorre mudança incompatível com o comportamento/contrato anterior (ex.: `1.4.2` → `2.0.0`). Em projetos com API, mudanças incompatíveis na API são o exemplo clássico.
- **MINOR**: incremento para funcionalidade nova **compatível** com a versão anterior (ex.: `1.0.0` → `1.1.0`).
- **PATCH**: incremento para correções **compatíveis** sem adicionar uma funcionalidade maior (ex.: `1.1.0` → `1.1.1`).

A versão inicial do **website acadêmico** poderá receber `v1.0.0` **somente depois de definida e testada como entrega estável da AC2**. Isso não significa que seja um serviço comercial de pedidos; a versão `v1.0.0` identifica a entrega acadêmica estável.

Os protótipos gráficos V1, V2 e V3 da Home não devem ser confundidos com tags SemVer Git. São **iterações de design** e não automaticamente versões do software completo.

## Processo de criação da tag após congelar a entrega

**Antes:** coordenar com a equipe, confirmar que os últimos commits estão publicados na `main`, que o site Vercel corresponde à revisão escolhida e que não há falhas críticas conhecidas.

### Opção A — pelo Git em terminal (recomendado se o grupo já conhece Git)

Executar na cópia local do repositório:

```bash
git switch main
git pull --ff-only origin main
git status --short
```

A saída de `git status --short` **deve estar vazia**. Se houver alterações locais ou divergência de `main`, interromper e resolver com a equipe.

Com a versão estável efetivamente aprovada:

```bash
git tag -a v1.0.0 -m "Versão estável da apresentação AC2"
git push origin v1.0.0
git show v1.0.0
```

### Opção B — pela interface do GitHub

Acessar o repositório → **Releases** → **Draft a new release** → selecionar **Choose a tag** → escrever `v1.0.0` → criar nova tag na branch `main` correta → título `v1.0.0 — AC2` → descrever funcionalidades acadêmicas e limitações → publicar a release. Se os comandos/menus forem diferentes, conferir antes de prosseguir.

### Verificação obrigatória

1. Conferir se a página de tags/releases do repositório mostra a tag real.
2. Abrir a tag e confirmar o **commit SHA** da entrega.
3. Atualizar o slide de versionamento, removendo a etiqueta **TAG Git: pendente de criação** e incluindo uma captura **real** da tag/release.
4. Atualizar README, Trello e documentação dos testes com o nome da versão.

## Como registrar uma futura evolução

| Tipo | Exemplo de versão | Exemplo de alteração possível |
| --- | --- | --- |
| PATCH | `v1.0.1` | Corrigir uma falha visual ou validação sem mudar funcionalidades esperadas |
| MINOR | `v1.1.0` | Adicionar funcionalidade compatível e aprovada pela equipe |
| MAJOR | `v2.0.0` | Mudança incompatível no contrato de funcionamento existente |

**Todos os exemplos futuros são hipotéticos.** Não criar tags retroativas somente para aumentar artificialmente a quantidade de versões; caso se documentem marcos antigos, cada tag precisa apontar para um commit realmente correspondente ao estado da época.

## Evidências de alterações reais no projeto

- Navegação da galeria: `js/galeria.js`, pré-carregamento das imagens vizinhas.
- Carrinho e checkout demonstrativo: formulário, validação, mensagens próximas aos campos.
- Otimizações pontuais da Home: prioridade da imagem principal, carregamento adiado de imagens secundárias.
- Documentação técnica em `docs/testes/`, `docs/identidade-visual/` e `docs/apresentacao/`.

**Referência de definição:** as capturas de aula enviadas pela equipe apresentam o padrão `MAJOR.MINOR.PATCH` e os exemplos 1.0.0 → 1.1.0 → 1.1.1 → 2.0.0. Esta página aplica o conceito ao projeto, sem fingir que essas tags foram usadas anteriormente.
