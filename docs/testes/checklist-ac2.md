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

## Inspeção estática do repositório

- Seis páginas principais identificadas: Início, Cardápio, Carrinho, Nossa História, Galeria e Contato.
- Nas seis páginas, não foram identificados IDs repetidos, imagens sem `alt`, links locais para páginas HTML ausentes nem âncoras internas inexistentes na inspeção automatizada do código.
- Os documentos inspecionados apresentam `title` e metadescrição.
- O checkout contém lógica de validação de nome, telefone, endereço, horário e pagamento simulado.
- A consulta automática de CEP foi **retirada por decisão do grupo**, mantendo o endereço manual.
- O site é exclusivamente acadêmico e não realiza pedidos ou pagamentos reais.

## Próximas verificações

- [ ] Responsividade em 375px e 768px: menu, textos, cartões, galeria, formulário e ausência de rolagem horizontal indevida.
- [ ] Fluxos negativos do checkout: campos vazios, telefone incorreto, retirada, agendamento indisponível e troco insuficiente.
- [ ] Conferir links externos: iFood, Google Maps, avaliação, Instagram e Facebook.
- [ ] Verificar Console do navegador em páginas principais.
- [ ] Executar Lighthouse em mobile e desktop, registrando métricas e correções necessárias.
- [ ] Conferir versão publicada na Vercel após última alteração.
- [ ] Revisar Trello: responsáveis, prioridades, datas, atualizações e histórico.
- [ ] Registrar tag de versão de apresentação depois da validação final, sem antecipá-la.
- [ ] Revisar autorização de publicação de fotos com pessoas reconhecíveis.

## Critério para considerar a auditoria encerrada

Não registrar "site sem erros" ou "100% aprovado" com base exclusivamente em inspeção estática. Validar no navegador, registrar problemas encontrados e retestar após cada correção.
