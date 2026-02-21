# FamilyHub — Gestão Familiar

Aplicação de gestão familiar com foco em organização do dia a dia, colaboração entre membros e acompanhamento de metas, finanças, saúde e rotina escolar.

## Objetivo

Centralizar as responsabilidades da família em uma única plataforma (web + mobile/PWA), com permissões por perfil, notificações e automações inteligentes.

## Escopo funcional (alto nível)

- Perfis e permissões
- Calendário compartilhado
- Tarefas e responsabilidades
- Metas familiares
- Finanças
- Lista de compras e refeições
- Gestão escolar
- Logística e transporte
- Saúde e bem-estar
- Dashboard inteligente
- Notificações
- Comunicação interna
- Gamificação
- Segurança e privacidade
- Experiência do usuário (PWA, acessibilidade)
- IA para recomendações
- Integrações externas


## Decisões técnicas obrigatórias

- Frontend em **React**.
- Banco de dados **NoSQL MongoDB** como datastore principal.
- Interface **responsiva por padrão** (mobile-first), com suporte a tablet e desktop em todos os módulos.

## Entregas criadas nesta versão

- `docs/product-requirements.md`: visão de produto, funcionalidades, critérios de sucesso e fases.
- `docs/architecture.md`: proposta de arquitetura técnica inicial.
- `docs/mvp-backlog.md`: backlog priorizado (MVP + pós-MVP).

## Próximos passos sugeridos

1. Validar escopo MVP com 3 a 5 famílias-piloto.
2. Stack definida para implementação inicial:
   - Frontend: **React** (web + PWA).
   - Banco de dados principal: **MongoDB** (NoSQL).
   - Backend/API, notificações e autenticação seguindo os documentos de arquitetura e backlog.
3. Implementar Sprint 0:
   - setup de projeto,
   - autenticação,
   - modelo de dados base,
   - CI/CD,
   - observabilidade.
