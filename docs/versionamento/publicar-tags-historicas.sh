#!/usr/bin/env bash
# Pastelaria da Sogra — publica marcadores retrospectivos de versões reais.
# Não altera o código do site, o histórico de commits nem cria a versão estável v1.0.0.
# Uso:
#   bash docs/versionamento/publicar-tags-historicas.sh --verificar
#   bash docs/versionamento/publicar-tags-historicas.sh --publicar
set -euo pipefail

MODO="${1:---verificar}"
if [[ "$MODO" != "--verificar" && "$MODO" != "--publicar" ]]; then
  printf 'Use --verificar (sem criar tags) ou --publicar.\n' >&2
  exit 2
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  printf 'Erro: execute dentro do repositório Git local.\n' >&2
  exit 1
fi

REMOTE_URL="$(git remote get-url origin)"
if [[ "$REMOTE_URL" != *"vitorhugo-santos/projeto-web-pastelaria-da-sogra"* ]]; then
  printf 'Erro: remote origin não parece ser o repositório do projeto: %s\n' "$REMOTE_URL" >&2
  exit 1
fi

# Atualiza refs remotos antes de conferir SHA, ancestrais e tags já existentes.
git fetch --prune --tags origin

TAGS=("v0.1.0" "v0.2.0" "v0.3.0" "v0.4.0" "v0.4.1" "v0.5.0" "v0.6.0")
COMMITS=(
  "ae0ab48844eaf533dfc85e25a76c3d8abd1535c3"
  "3b63bc8cb76e7ddb6d73f7b7dcd57352f61564b0"
  "604baf8c202314ef3d2066b4e26815762d1ff8e2"
  "92e085a8e1489e424ef7525b6f180b7755b13f70"
  "24eb964ae270f21294534ddf16e545da79d40642"
  "296abb0c818eb831ec7cb5f0a4d7eb7b9fbd1ed3"
  "cf3c8cbafe02ceb78194e6fd8b74b5ba21dbc2d3"
)
DESCRICOES=(
  "Marco retrospectivo: estrutura inicial do projeto"
  "Marco retrospectivo: estrutura HTML da Home"
  "Marco retrospectivo: cardapio com pesquisa e filtros"
  "Marco retrospectivo: galeria responsiva e ampliacao"
  "Marco retrospectivo: correcao de metadescricao da Historia"
  "Marco retrospectivo: pagina Contato, mapa e atendimento"
  "Marco retrospectivo: checkout academico simulado"
)

printf '\nVerificando marcos contra origin/main...\n'
for i in "${!TAGS[@]}"; do
  tag="${TAGS[$i]}"
  sha="${COMMITS[$i]}"
  if ! git cat-file -e "${sha}^{commit}" 2>/dev/null; then
    printf 'ERRO: objeto commit não encontrado: %s (%s)\n' "$tag" "$sha" >&2
    exit 1
  fi
  if ! git merge-base --is-ancestor "$sha" origin/main; then
    printf 'ERRO: %s não é ancestral de origin/main.\n' "$tag" >&2
    exit 1
  fi
  if git show-ref --verify --quiet "refs/tags/$tag"; then
    alvo_atual="$(git rev-parse "${tag}^{commit}")"
    if [[ "$alvo_atual" != "$sha" ]]; then
      printf 'ERRO: %s já existe mas aponta para outro commit. Não sobrescrever.\n' "$tag" >&2
      exit 1
    fi
    printf 'OK: %-8s já existe no commit %s\n' "$tag" "${sha:0:12}"
  else
    printf 'OK: %-8s poderá apontar para %s\n' "$tag" "${sha:0:12}"
  fi
done

if [[ "$MODO" == "--verificar" ]]; then
  printf '\nVerificação concluída. NENHUMA tag foi criada ou enviada.\n'
  printf 'Para publicar após conferir o plano com o grupo, use --publicar.\n'
  exit 0
fi

printf '\nCriando, quando necessário, tags ANOTADAS sem modificar os commits...\n'
for i in "${!TAGS[@]}"; do
  tag="${TAGS[$i]}"
  sha="${COMMITS[$i]}"
  if ! git show-ref --verify --quiet "refs/tags/$tag"; then
    git tag -a "$tag" "$sha" -m "${DESCRICOES[$i]}"
    printf 'Criada %s em %s\n' "$tag" "${sha:0:12}"
  fi
done

REFERENCIAS=()
for tag in "${TAGS[@]}"; do
  REFERENCIAS+=("refs/tags/$tag")
done

# Envia SOMENTE as tags históricas listadas. Nunca utiliza force.
git push origin "${REFERENCIAS[@]}"

printf '\nConfira as tags em:\n'
printf 'https://github.com/vitorhugo-santos/projeto-web-pastelaria-da-sogra/tags\n'
printf '\nIMPORTANTE: v1.0.0 NÃO foi criada. Aguarde a aprovação da versão estável da AC2.\n'
