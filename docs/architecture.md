# Arquitetura proposta (inicial)

## 1) Visão de solução

Arquitetura modular com frontend web (PWA), backend API e serviços de domínio, banco relacional e fila de eventos para notificações/agendamentos.

## 2) Componentes principais

- **Frontend (Web/PWA)**
  - UI responsiva, modo escuro, acessibilidade.
  - Perfis infantis com experiência simplificada.

- **API Gateway / BFF**
  - Entrada única para clientes.
  - Autenticação, autorização e rate limiting.

- **Serviços de domínio**
  - Identity & Access (família, membros, papéis).
  - Calendar Service.
  - Task Service.
  - Finance Service.
  - Health/School/Logistics (expansão por fases).

- **Infra de suporte**
  - Banco relacional (dados transacionais).
  - Cache (sessão/consultas quentes).
  - Fila/event bus (notificações, jobs recorrentes).
  - Object storage (anexos, boletins, arquivos).

## 3) Modelo de dados (núcleo MVP)

- `family`
- `member`
- `role`
- `permission`
- `calendar_event`
- `task`
- `task_checklist_item`
- `notification`
- `activity_log`

Relações fundamentais:
- Uma família possui vários membros.
- Membros possuem papéis e permissões efetivas.
- Eventos/tarefas pertencem à família e podem ter responsável.
- Ações relevantes geram registros em `activity_log`.

## 4) Segurança

- MFA para responsáveis.
- RBAC + regras por faixa etária.
- Criptografia TLS e criptografia de dados sensíveis.
- Auditoria por membro e trilha de atividades.

## 5) Estratégia de entrega técnica

- Monorepo com apps e pacotes compartilhados.
- Feature flags para liberar módulos gradualmente.
- Observabilidade desde o início (logs, métricas, tracing).
- Testes por camada: unitário, integração e e2e crítico.
