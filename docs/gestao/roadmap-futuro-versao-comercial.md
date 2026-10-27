# Roadmap futuro — evolução para operação comercial

**Situação:** planejamento posterior à versão acadêmica da AC2, revisado em 26/10/2026. **Nenhuma funcionalidade desta lista está implementada ou aprovada para uso comercial.** O site atual tem catálogo e checkout demonstrativos, sem backend, pedidos reais ou pagamentos reais.

O Trello é o registro de execução: https://trello.com/b/rBHFUDul/projeto-web-design. O Product Backlog contém também a atividade do relatório final AF. O roadmap comercial é composto por **18 cartões**; os demais cartões concluídos do projeto acadêmico não devem ser contados como funcionalidades comerciais em produção.

## Capacidades propostas

| Frente | Funcionalidade futura | Dependência principal |
| --- | --- | --- |
| Infraestrutura | Banco de dados da aplicação | Backend, segurança e backups |
| Clientes | Cadastro e autenticação | Infraestrutura de identidade e privacidade |
| Pedidos | Sistema próprio de pedidos para entrega | Banco, cozinha, cobertura e validações comerciais |
| Logística | Taxa e área de entrega | Definição de cobertura, tarifa e prazo |
| Pagamentos | Pagamentos online | Provedor autorizado, confirmação segura e pedidos reais |
| Operação | Painel administrativo | Banco, perfis e controle de acesso |
| Acompanhamento | Status de pedidos | Pedidos reais e operação de preparo |
| Conta | Histórico de pedidos | Autenticação e persistência real |
| Relacionamento | Fidelidade e cupons | Regras aprovadas e cálculo no servidor |
| Cardápio | Gerenciamento de disponibilidade | Catálogo, painel e atualização operacional |
| Cardápio | Personalização de produtos e alergênicos | Composição, preços e informações validadas pela empresa |
| Cozinha | Integração de pedidos e notificações | Fila operacional e canais autorizados |
| Retirada | Pedidos reais para retirada e agendamento | Operação e capacidade de preparo |
| Atendimento | Horários especiais e capacidade | Painel e regras comerciais |
| Pós-venda | Cancelamentos, reembolsos e suporte | Pedidos reais e políticas de atendimento |
| Privacidade | Proteção de dados pessoais (LGPD) | Mapeamento de dados, fornecedores e análise jurídica |
| Qualidade | Avaliações próprias e pós-venda | Pedidos concluídos e moderação |
| Entrega | Gestão de entregadores e logística | Operação própria/parceiros e tracking |

## Priorização lógica sugerida

1. Validar requisitos comerciais reais com a pastelaria, incluindo cardápio, preço, ingredientes, alergênicos, horários, capacidade, entrega, privacidade e responsabilidades. Antes dessa validação, as regras atuais do site não devem ser tomadas como definitivas.
2. Definir backend, banco de dados, painel operacional, autenticação administrativa e disponibilidade do catálogo.
3. Implementar pedidos reais para entrega e retirada, cálculo de tarifas, integração com cozinha e notificações.
4. Integrar pagamentos seguros, acompanhamento, logística e procedimentos de cancelamento/reembolso.
5. Evoluir personalização, fidelidade, avaliações e histórico para clientes, com testes, monitoramento e revisões de segurança.

## Critérios de transição

- Nenhum pedido pode ser chamado de real sem confirmação efetiva do servidor e da operação.
- Nenhum pagamento pode ser considerado confirmado apenas por informação digitada no navegador.
- Preços, disponibilidade, horários, taxas, alergênicos e dados de contato exigem aprovação da empresa antes de operar comercialmente.
- Exigir testes integrados, gestão de acesso, segurança, privacidade, desempenho e cenários de falha para qualquer versão comercial.
- Uma versão comercial não está garantida por esta lista: ela representa o planejamento inicial das frentes essenciais, que poderá ser refinado com a empresa e o professor.

## Versão e apresentação

A versão acadêmica aprovada é a tag `v1.0.0`. As correções posteriores de checkout estão na `main` e aguardam homologação integrada antes de um possível `v1.0.1`. Os slides da AC2 são um retrato da apresentação aprovada e não foram alterados devido ao roadmap.
