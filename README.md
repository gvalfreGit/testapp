# FamilyHub — Aplicação de Gestão Familiar

Aplicação full-stack para gestão familiar com **React (frontend)**, **Node/Express (API)** e **MongoDB (NoSQL)**.

## Funcionalidades disponíveis nesta versão para teste

- Cadastro de famílias.
- Gestão de membros (papéis: parent, child, guardian, guest).
- Calendário familiar (criação e listagem de eventos).
- Tarefas familiares (criação e mudança de status).
- Layout responsivo (mobile, tablet e desktop).

## Stack técnica

- Frontend: React + Vite.
- Backend: Node.js + Express + Mongoose.
- Banco: MongoDB.
- Orquestração local: Docker Compose.

## Como rodar com Docker (recomendado)

```bash
docker compose up --build
```

Serviços:
- Web: http://localhost:5173
- API: http://localhost:4000/api
- MongoDB: mongodb://localhost:27017/familyhub

## Como rodar local sem Docker

### 1) API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

## Endpoints principais

- `GET /api/health`
- `GET /api/families`
- `POST /api/families`
- `GET /api/families/:familyId/members`
- `POST /api/families/:familyId/members`
- `GET /api/families/:familyId/events`
- `POST /api/families/:familyId/events`
- `GET /api/families/:familyId/tasks`
- `POST /api/families/:familyId/tasks`
- `PATCH /api/tasks/:taskId/status`

## Responsividade

- Estratégia mobile-first.
- Breakpoints implementados para 768px e 1024px.
- Interface única adaptável para celular/tablet/desktop.
