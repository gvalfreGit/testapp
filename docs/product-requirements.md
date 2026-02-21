# PRD — FamilyHub

## 0) Premissas técnicas mandatórias

- Frontend obrigatório em **React**.
- Banco de dados principal obrigatório em **MongoDB (NoSQL)**.
- Experiência responsiva obrigatória em todos os módulos (celular, tablet e desktop).

## 1) Visão do produto

O FamilyHub é uma plataforma para coordenar a rotina familiar, com colaboração entre membros, organização de agenda, tarefas, finanças e saúde em um ambiente seguro e com níveis de acesso por perfil.

## 2) Perfis de usuário

- **Pais/Responsáveis**: gestão completa, aprovações e configurações críticas.
- **Filhos**: acesso limitado por idade/permissões.
- **Convidados**: acesso temporário e restrito (ex.: babá, avós).

## 3) Módulos funcionais

### M1. Gestão de perfis e permissões
- Cadastro de múltiplos membros.
- Papéis (pais, filhos, responsáveis, convidados).
- Permissões por funcionalidade.
- Interface infantil simplificada.
- Histórico de atividades por membro.

### M2. Calendário familiar
- Calendário único com visões diária/semanal/mensal/agenda.
- Eventos recorrentes.
- Eventos individuais e coletivos.
- Confirmação de presença e anexos.
- Lembretes personalizados.
- Integrações (Google/Outlook).

### M3. Tarefas e responsabilidades
- Tarefas com responsável e prazo.
- Subtarefas e checklists.
- Prioridade e recorrência.
- Rodízio automático de tarefas domésticas.
- Comentários e histórico de conclusão.
- Pontuação/recompensa para crianças.

### M4. Metas familiares
- Metas individuais e coletivas.
- Indicadores de progresso.
- Metas financeiras e educacionais.

### M5. Finanças
- Receitas/despesas e categorias.
- Orçamento mensal.
- Mesadas.
- Relatórios e exportação.
- Alertas de vencimento.

### M6. Compras e refeições
- Lista de compras em tempo real.
- Sugestões por histórico.
- Planejamento de cardápio semanal.
- Banco de receitas.
- Restrições alimentares por membro.

### M7. Escolar
- Agenda escolar e deveres.
- Registro de notas.
- Eventos e provas.
- Upload de boletins.

### M8. Logística e transporte
- Agenda de caronas e rotas.
- Manutenção de veículos.
- Alertas de documentação.

### M9. Saúde e bem-estar
- Consultas e vacinação.
- Medicamentos com alertas.
- Histórico médico básico.
- Hábitos (sono/exercícios).

### M10. Comunicação e notificações
- Chat familiar e mural de avisos.
- Comentários em tarefas/eventos.
- Push, email e alertas críticos.

### M11. Dashboard inteligente
- Resumo do dia.
- Pendências críticas.
- Indicadores familiares.
- Resumo financeiro e metas.

### M12. IA e integrações
- Sugestões de organização e tarefas.
- Recomendações de economia.
- Integrações: WhatsApp, Alexa/Google Home, bancos digitais (fase posterior).

## 4) Requisitos não funcionais

- Segurança: MFA, criptografia em trânsito e em repouso.
- Privacidade: controle granular para dados infantis/sensíveis.
- Disponibilidade: alvo de 99.5% no MVP.
- Escalabilidade: arquitetura modular para novos domínios.
- Acessibilidade: aderência WCAG 2.1 AA.
- UX: responsiva por padrão (mobile-first), modo escuro e PWA.

## 5) Métricas de sucesso (KPIs)

- Ativação: % famílias que criam 3+ membros no primeiro dia.
- Engajamento: DAU/WAU por família.
- Organização: % tarefas concluídas no prazo.
- Retenção: famílias ativas após 8 semanas.
- Valor percebido: NPS e taxa de uso de calendário + tarefas.

## 6) Fases recomendadas

- **Fase 1 (MVP)**: perfis/permissões, calendário, tarefas, notificações, dashboard básico.
- **Fase 2**: finanças, compras/refeições, escolar, saúde.
- **Fase 3**: IA avançada, integrações profundas e gamificação completa.
