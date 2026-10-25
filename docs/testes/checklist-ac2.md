# Checklist de auditoria — AC2 (27/10/2026)

**Projeto:** Pastelaria da Sogra — Web Design  
**URL de testes:** https://projeto-web-pastelaria-da-sogra.vercel.app/index.html  
**Data da revisão:** 24/10/2026

## Como ler esta checklist

- **Aprovado com teste manual:** o resultado foi confirmado pelo integrante ao utilizar o site publicado.
- **Revisado no código:** o requisito foi inspecionado no repositório, mas não necessariamente testado visualmente.
- **Pendente:** ainda requer teste ou evidência. Não tratar como concluído em apresentação.

## Testes manuais informados pela equipe

| Área | Teste | Resultado |
| --- | --- | --- |
| Navegação | Início → Cardápio | Aprovado com teste manual |
| Carrinho | Adicionar dois produtos, visualizar quantidades e totais | Aprovado com teste manual |
| Checkout | Finalizar simulação com dados válidos e conferir confirmação | Aprovado com teste manual |
| Usabilidade do carrinho | Botão de acesso direto ao formulário | Aprovado com teste manual |
| Galeria | Navegação entre fotos após pré-carregamento | Aprovado com teste manual; sem atraso perceptível |
| Validação | Telefone com menos de 10 dígitos gera destaque, mensagem junto ao campo e rolagem | Aprovado com teste manual, segundo retorno da equipe |
| Checkout | Retirada no balcão sem exigir endereço | Aprovado com teste manual, conforme retorno da equipe |
| Pagamento | Dinheiro com troco inferior ao total impede finalização | Aprovado com teste manual, conforme retorno da equipe |

## Inspeção estática do repositório

- Seis páginas principais identificadas: Início, Cardápio, Carrinho, Nossa História, Galeria e Contato.
- Nas seis páginas, não foram identificados IDs repetidos, imagens sem `alt`, links locais para páginas HTML ausentes nem âncoras internas inexistentes na inspeção automatizada do código.
- Os documentos inspecionados apresentam `title` e metadescrição.
- O checkout contém lógica de validação de nome, telefone, endereço, horário e pagamento simulado.
- A consulta automática de CEP foi **retirada por decisão do grupo**, mantendo o endereço manual.
- O site é exclusivamente acadêmico e não realiza pedidos ou pagamentos reais.

## Resultado Lighthouse — Home — 24/10/2026

**Fonte:** duas capturas de tela do Chrome DevTools/Lighthouse enviadas pela equipe nesta conversa, uma execução mobile e outra desktop, na URL `https://projeto-web-pastelaria-da-sogra.vercel.app/index.html`. Os números abaixo são de auditoria sintética de laboratório, não de usuários reais.

| Categoria | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | **76** | **97** |
| Acessibilidade | **96** | **96** |
| Boas práticas | **100** | **100** |
| SEO | **100** | **100** |

**Interpretação:** o desempenho no desktop é muito bom; a performance mobile de 76 merece diagnóstico, mas o resumo não identifica a causa. Não inferir LCP, CLS, TBT, FCP ou oportunidades sem consultar a parte detalhada do relatório.

**Próxima evidência necessária:** detalhamento das métricas e dos principais avisos Lighthouse da Home mobile. Não otimizar todos os recursos por tentativa e erro. Acessibilidade 96 indica itens a examinar no relatório, não acessibilidade integral garantida.

**Limite da avaliação:** esses resultados são apenas da página inicial. Não significam que as demais cinco páginas atingiram as mesmas pontuações. As capturas de tela foram enviadas na conversa e os valores foram transcritos aqui; os PNGs ainda não estão anexados ao repositório.

## Nova execução Lighthouse desktop após otimização de imagens (24/10/2026)

**Capturas enviadas pela equipe:** Performance **89**, Acessibilidade **96**, Boas práticas **96**, SEO **100**; FCP **0,3 s**, LCP **2,3 s**, TBT **0 ms**, Speed Index **0,3 s**, CLS **0**. Diagnósticos mostrados: minificação de CSS (economia potencial de 3 KiB), uma razão de falha do bfcache, payload total de **3.842 KiB** e uma tarefa longa de main thread. O motivo específico da falha do bfcache e de boas práticas não foi exposto no print.

**Comparação registrada:** na medição anterior, desktop marcou 97/96/100/100. Na Home mobile antes da otimização, Performance era 76, LCP 5,4 s e payload 5.028 KiB. A execução atual mostra redução do payload para 3.842 KiB, mas não é uma comparação experimental controlada de desempenho desktop. A pontuação isolada 89 não prova regressão causada pelo código, dada a variabilidade documentada do Lighthouse.

**Auditoria de alteração:** commit `723893887e806dbb999faa3a6dd1b4b6cf615afe` alterou exclusivamente atributos HTML nas imagens da Home (`width`, `height`, `loading="lazy"`, `decoding="async"` e prioridade alta na imagem principal). Nenhum CSS, JS ou outra página foi alterado nesse commit. Não há handlers `unload` ou `beforeunload` nos arquivos `index.html` e `js/script.js` inspecionados.

**Ação:** preservar a versão aprovada do mobile. Antes de editar código, repetir a auditoria **desktop 3 vezes nas mesmas condições** (janela anônima, sem extensões ativas, sem outras tarefas pesadas) e anotar notas e LCP; considerar a mediana. Expandir a razão da auditoria bfcache e o item específico de boas práticas de 96; não inferir a causa.

## Responsividade — confirmação da equipe

- **375 px:** navegação pela Home, Cardápio, Galeria e Carrinho sem problemas relatados.
- **768 px:** teste complementar pendente, sem resultado registrado.

## Próximas verificações

- [x] Responsividade em 375px: páginas e elementos principais, conforme teste da equipe.
- [ ] Responsividade em 768px: teste complementar.
- [x] Checkout: telefone incorreto, retirada sem endereço e troco insuficiente, conforme testes manuais.
- [ ] Checkout: campos vazios, alteração de dia/horário durante uso e demais casos extremos.
- [ ] Conferir links externos: iFood, Google Maps, avaliação, Instagram e Facebook.
- [ ] Verificar Console do navegador em páginas principais.
- [x] Registrar as quatro pontuações de Lighthouse mobile e desktop da Home.
- [ ] Investigar métricas e diagnósticos da Home mobile e verificar acessibilidade (96/100).
- [ ] Executar Lighthouse nas demais páginas principais, conforme prioridade de tempo.
- [ ] Conferir versão publicada na Vercel após última alteração.
- [ ] Revisar Trello: responsáveis, prioridades, datas, atualizações e histórico.
- [ ] Registrar tag de versão de apresentação depois da validação final, sem antecipá-la.
- [ ] Revisar autorização de publicação de fotos com pessoas reconhecíveis.

## Critério para considerar a auditoria encerrada

Não registrar "site sem erros" ou "100% aprovado" com base exclusivamente em inspeção estática. Validar no navegador, registrar problemas encontrados e retestar após cada correção.
