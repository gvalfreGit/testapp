# Dashboard Web para Neptune Apex

Aplicação web em Python para consultar dados do controlador Neptune Apex por **3 estratégias**:

1. **API local (`apexapi`)** com token ou autenticação básica.
2. **Leitura de CSV** exportado pelo Apex.
3. **Recebimento de webhook** (ex.: IFTTT/Zapier) para eventos em tempo real.

## Como executar

Opção 1 (recomendada):

```bash
python -m src.novo_projeto.main
```

Opção 2 (atalho):

```bash
python run.py
```

Escolha a porta (opcional):

```bash
python -m src.novo_projeto.main --port 8080
```

A aplicação sobe em `http://localhost:8000` (ou na porta escolhida).

## Configuração de conexão

Variáveis de ambiente opcionais:

- `APEX_BASE_URL` (padrão: `http://192.168.0.50`)
- `APEX_TOKEN`
- `APEX_USERNAME`
- `APEX_PASSWORD`
- `APEX_CSV_PATH` (padrão: `data/apex_export.csv`)

## Endpoints

- `GET /` ou `GET /index.html` → dashboard web simples
- `GET /api/status?mode=api|csv|webhook` → retorna status normalizado
- `POST /api/webhook` → salva payload JSON e disponibiliza no modo `webhook`

### Exemplo de webhook

```bash
curl -X POST http://localhost:8000/api/webhook \
  -H 'Content-Type: application/json' \
  -d '{"updated_at":"2026-01-01T12:00:00Z","sensors":{"temperature":25.2,"ph":8.1,"salinity":35.0}}'
```

## Testes

```bash
python -m unittest discover -s tests -p 'test_*.py'
```


## Troubleshooting rápido

- Rode os comandos na pasta raiz do projeto (`/workspace/testapp`).
- Se aparecer erro de porta em uso, troque a porta: `python -m src.novo_projeto.main --port 8080`.
- Teste rápido de saúde: `curl http://localhost:8000/` (ou `curl http://localhost:8000/index.html`).
