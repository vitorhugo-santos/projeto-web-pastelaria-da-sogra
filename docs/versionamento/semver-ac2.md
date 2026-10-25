# Versionamento semântico e histórico da AC2

**Projeto:** Pastelaria da Sogra — Web Design  
**Data da reconstrução dos marcos:** 24/10/2026  
**Repositório:** https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra  
**Origem da evidência:** histórico real de commits da branch `main`, consultado em 24/10/2026.

## Estado verificado

O histórico consultado inicialmente continha **55 commits** e nenhuma tag. **Em 24/10/2026, as sete tags históricas anotadas foram publicadas e verificadas diretamente no GitHub**: `v0.1.0`, `v0.2.0`, `v0.3.0`, `v0.4.0`, `v0.4.1`, `v0.5.0` e `v0.6.0`. Os sete objetos de tag foram abertos individualmente e seus commits-alvo coincidiram com os SHAs documentados abaixo. A versão estável `v1.0.0` ainda não foi publicada.

É válido acrescentar tags agora em commits históricos, desde que a apresentação esclareça que os **marcos foram reconstruídos retrospectivamente em 24/10/2026**. Isso não altera os commits, seus autores ou suas datas originais; as tags terão a data efetiva em que forem criadas.

**Importante:** 1 commit = 1 alteração/histórico; **1 tag = marco relevante de versão**. Não é necessário (nem útil) criar uma tag para cada commit.

## Significado de MAJOR.MINOR.PATCH

| Número | Incremento | Critério |
| --- | --- | --- |
| MAJOR | `1.2.3` → `2.0.0` | Mudança incompatível com contrato/comportamento anteriormente estabelecido |
| MINOR | `1.2.3` → `1.3.0` | Nova funcionalidade compatível |
| PATCH | `1.2.3` → `1.2.4` | Correção compatível, sem nova funcionalidade |

Para os marcos **anteriores à primeira entrega estável**, adotou-se o prefixo `0.x.y` (fase de desenvolvimento). Assim, a evolução de funcionalidades é expressa por incrementos de **MINOR**. O prefixo `v` faz parte da **nomenclatura da tag**, não dos três números do SemVer.

Os **protótipos de interface Home V1, V2 e V3** são iterações visuais de design, não tags Git nem versões completas do software.

## Marcos históricos verificados — tags retrospectivas publicadas

| Tag | Marco efetivamente existente no Git | Commit SHA exato | Justificativa |
| --- | --- | --- | --- |
| `v0.1.0` | Criação da estrutura inicial do projeto (23/09, noite de Brasília) | `ae0ab48844eaf533dfc85e25a76c3d8abd1535c3` | Base do repositório e arquivos iniciais |
| `v0.2.0` | Estrutura HTML da Home (21/10) | `3b63bc8cb76e7ddb6d73f7b7dcd57352f61564b0` | Primeira página principal estruturada |
| `v0.3.0` | Cardápio com pesquisa e filtros combinados (23/10) | `604baf8c202314ef3d2066b4e26815762d1ff8e2` | Avanço do catálogo interativo e carrinho já existente |
| `v0.4.0` | Galeria responsiva, filtros e visualização ampliada (23/10, noite de Brasília) | `92e085a8e1489e424ef7525b6f180b7755b13f70` | Nova experiência de galeria e páginas institucionais em desenvolvimento |
| `v0.4.1` | Correção da metadescrição da Nossa História (23/10, noite de Brasília) | `24eb964ae270f21294534ddf16e545da79d40642` | **PATCH real**, no commit imediatamente seguinte a `v0.4.0` |
| `v0.5.0` | Página Contato, mapa e canais de atendimento (23/10, noite de Brasília) | `296abb0c818eb831ec7cb5f0a4d7eb7b9fbd1ed3` | Sexta página principal implementada |
| `v0.6.0` | Checkout demonstrativo com validações e agendamento (24/10) | `cf3c8cbafe02ceb78194e6fd8b74b5ba21dbc2d3` | Nova etapa de experiência, sem pedidos ou pagamentos reais |

**Datas:** os horários brutos do GitHub estão registrados em UTC. Para evitar ambiguidade de virada de dia, as datas locais acima são interpretadas em `America/Sao_Paulo`. Os SHAs identificam os commits sem ambiguidade.

**Estado:** tabela de **tags anotadas já publicadas**, verificadas em `https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra/tags` e diretamente pelos objetos Git de tag. Os marcos são retrospectivos, sem alteração de autoria ou datas dos commits.

### Por que não etiquetar todas as mudanças?

Existem commits intermediários de CSS, imagens, README e ajustes, mas não são necessariamente releases. Os marcos escolhidos representam fases funcionais distintas. O `v0.4.1` é especificamente uma correção após `v0.4.0`, demonstrando o uso adequado do número PATCH.

## Como foram verificadas e publicadas as tags (registro reprodutível)

A conexão do assistente com GitHub atualmente permite **ler os commits e editar arquivos**, mas não disponibiliza a operação de **criar tags** diretamente. Foi incluído o script auditável:

[`docs/versionamento/publicar-tags-historicas.sh`](./publicar-tags-historicas.sh)

Na pasta local do projeto (repositório correto), abra o **Git Bash** e rode:

```bash
git switch main
git pull --ff-only origin main
bash docs/versionamento/publicar-tags-historicas.sh --verificar
```

A opção `--verificar` **não cria nem publica tags**. Confere repositório, SHA e ancestralidade de cada marco. Depois de ler o relatório e confirmar com a equipe:

```bash
bash docs/versionamento/publicar-tags-historicas.sh --publicar
```

A opção `--publicar` cria **tags anotadas** e envia apenas as referências explicitamente listadas, sem modificar os arquivos ou o histórico de commits. Se houver conflito de nomes, mudanças no remoto ou falha de autenticação, **interromper e investigar; não usar `--force`**.

**Publicação concluída:** a equipe confirmou a execução do script, e a conferência independente das referências `refs/tags/` e seus objetos anotados confirmou os sete commits-alvo corretos. Os comandos acima permanecem apenas para reprodução e auditoria, sem necessidade de executá-los novamente.

## Primeira versão estável: `v1.0.0` — aprovada pelo grupo, publicação pendente

**Aprovação recebida em 24/10/2026:** a equipe declarou aprovada a versão acadêmica da AC2, após a correção da logomarca do rodapé e os testes funcionais confirmados. **A tag Git `v1.0.0` ainda não existe no remoto no momento desta atualização**; não confundir aceite do grupo com publicação da tag. A publicação deve apontar para um commit atual da `main` depois de sincronizar a cópia local com o GitHub.

Após verificar os commits finais e confirmar que o código aprovado está na `main` e publicado na Vercel, criar a tag **no SHA efetivo dessa versão**, a partir do Git Bash:

```bash
git switch main
git pull --ff-only origin main
git log -1 --oneline
git tag -a v1.0.0 -m "Versao estavel academica da AC2"
git push origin v1.0.0
git show --no-patch v1.0.0
```

O comando deve ser executado **uma única vez**. Confirmar que `v1.0.0` ainda não existe; se existir, não sobrescrever. Uma eventual `v1.0.1` corresponde a correção compatível após a entrega.

## Atualização das evidências após a publicação

- [x] Página de tags no GitHub exibe `v0.1.0` a `v0.6.0` com o `v0.4.1` intermediário.
- [x] Cada objeto de tag foi conferido e aponta para o commit exato descrito acima.
- [x] Trello: cartão de versionamento recebe link para as tags e esta documentação. A criação de `v1.0.0` permanece pendente.
- [ ] Slide de GitHub/Versionamento utiliza captura do histórico e das tags **reais**, explicando que os marcos são retrospectivos.
- [x] A documentação de versionamento registra as sete tags publicadas. O README pode receber também a referência ao histórico.
- [x] Aprovação do grupo para a entrega estável registrada em 24/10/2026.
- [ ] Publicar `v1.0.0` no commit correto, abrir a referência no GitHub e marcar a checklist correspondente no Trello.

## Referências do próprio projeto

- [Histórico de commits](https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra/commits/main)
- [Tags](https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra/tags)
- [Checklist de testes](../testes/checklist-ac2.md)
- [Roteiro da apresentação](../apresentacao/roteiro-ac2.md)

**Nota de transparência:** este documento foi preparado agora, com base no histórico preservado. Não é uma prova de que a equipe tenha aplicado SemVer durante todo o desenvolvimento; documenta a política adotada e seus marcos retrospectivos.
