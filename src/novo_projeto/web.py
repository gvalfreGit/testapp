"""Aplicação web para monitoramento de dados do Neptune Apex."""

from __future__ import annotations

import json
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib import parse

from .apex import fetch_apex_status, load_status_from_csv, parse_webhook_payload

_LAST_WEBHOOK: dict[str, object] = {}


HTML_PAGE = """<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Dashboard Neptune Apex</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; background:#0f172a; color:#e2e8f0; }
    .card { background:#1e293b; border-radius:12px; padding:1rem 1.2rem; margin-bottom:1rem; }
    button { margin-right: 0.5rem; padding:0.5rem 0.8rem; border:0; border-radius:8px; cursor:pointer; }
    pre { background:#020617; padding:1rem; border-radius:8px; overflow:auto; }
  </style>
</head>
<body>
  <h1>Dashboard Neptune Apex</h1>
  <p>Consulte dados via API local, CSV exportado ou último webhook recebido.</p>
  <div class="card">
    <button onclick="loadStatus('api')">Atualizar via API</button>
    <button onclick="loadStatus('csv')">Atualizar via CSV</button>
    <button onclick="loadStatus('webhook')">Último webhook</button>
  </div>
  <div class="card">
    <h3>Status</h3>
    <pre id="output">Carregando...</pre>
  </div>
  <script>
    async function loadStatus(mode) {
      const res = await fetch(`/api/status?mode=${mode}`);
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    loadStatus('webhook');
  </script>
</body>
</html>
"""


class ApexWebHandler(BaseHTTPRequestHandler):
    def _send_json(self, status: int, data: dict[str, object]) -> None:
        payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self) -> None:  # noqa: N802
        parsed = parse.urlparse(self.path)
        normalized_path = parsed.path.rstrip("/") or "/"

        if normalized_path in {"/", "/index.html"}:
            payload = HTML_PAGE.encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return

        if normalized_path == "/api/status":
            query = parse.parse_qs(parsed.query)
            mode = query.get("mode", ["api"])[0]
            try:
                if mode == "api":
                    data = fetch_apex_status(
                        base_url=os.getenv("APEX_BASE_URL", "http://192.168.0.50"),
                        token=os.getenv("APEX_TOKEN"),
                        username=os.getenv("APEX_USERNAME"),
                        password=os.getenv("APEX_PASSWORD"),
                    ).to_dict()
                elif mode == "csv":
                    csv_path = os.getenv("APEX_CSV_PATH", "data/apex_export.csv")
                    data = load_status_from_csv(csv_path).to_dict()
                elif mode == "webhook":
                    if not _LAST_WEBHOOK:
                        raise ValueError("Nenhum webhook recebido ainda")
                    data = parse_webhook_payload(_LAST_WEBHOOK).to_dict()
                else:
                    raise ValueError("Modo inválido. Use api, csv ou webhook")
                self._send_json(HTTPStatus.OK, {"ok": True, "data": data})
            except Exception as exc:
                self._send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": str(exc)})
            return

        self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "Rota não encontrada"})

    def do_POST(self) -> None:  # noqa: N802
        normalized_path = self.path.rstrip("/") or "/"

        if normalized_path != "/api/webhook":
            self._send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "Rota não encontrada"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)
        try:
            payload = json.loads(raw_body.decode("utf-8"))
            if not isinstance(payload, dict):
                raise ValueError("Payload deve ser um objeto JSON")
            _LAST_WEBHOOK.clear()
            _LAST_WEBHOOK.update(payload)
            status = parse_webhook_payload(payload).to_dict()
            self._send_json(HTTPStatus.OK, {"ok": True, "data": status})
        except Exception as exc:
            self._send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": str(exc)})


def run_server(port: int = 8000) -> None:
    server = ThreadingHTTPServer(("0.0.0.0", port), ApexWebHandler)
    print(f"Servidor disponível em http://localhost:{port}")
    server.serve_forever()
