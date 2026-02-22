"""Integrações com o controlador Neptune Apex."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
import csv
import json
from pathlib import Path
from typing import Any
from urllib import parse, request


@dataclass(slots=True)
class ApexStatus:
    source: str
    temperature: float | None = None
    ph: float | None = None
    salinity: float | None = None
    updated_at: str | None = None
    raw: dict[str, Any] | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "source": self.source,
            "temperature": self.temperature,
            "ph": self.ph,
            "salinity": self.salinity,
            "updated_at": self.updated_at,
            "raw": self.raw or {},
        }


def _to_float(value: Any) -> float | None:
    try:
        if value is None or value == "":
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def _extract_common_fields(payload: dict[str, Any], source: str) -> ApexStatus:
    sensors = payload.get("sensors", payload)
    return ApexStatus(
        source=source,
        temperature=_to_float(sensors.get("temperature")),
        ph=_to_float(sensors.get("ph")),
        salinity=_to_float(sensors.get("salinity")),
        updated_at=str(payload.get("updated_at") or datetime.now(timezone.utc).isoformat()),
        raw=payload,
    )


def fetch_apex_status(base_url: str, token: str | None = None, username: str | None = None, password: str | None = None) -> ApexStatus:
    """Busca status via endpoint HTTP local do Apex."""
    url = parse.urljoin(base_url.rstrip("/") + "/", "apexapi/v1/status")
    headers = {"Accept": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    req = request.Request(url, headers=headers, method="GET")
    if username and password:
        credentials = (f"{username}:{password}").encode("utf-8")
        import base64

        req.add_header("Authorization", "Basic " + base64.b64encode(credentials).decode("ascii"))

    with request.urlopen(req, timeout=8) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return _extract_common_fields(payload, source="apexapi")


def load_status_from_csv(csv_path: str | Path) -> ApexStatus:
    """Carrega o último registro de um CSV exportado do Apex."""
    path = Path(csv_path)
    with path.open("r", encoding="utf-8") as file:
        rows = list(csv.DictReader(file))
    if not rows:
        raise ValueError("CSV vazio: nenhum dado disponível")

    last_row = rows[-1]
    payload = {
        "temperature": last_row.get("temperature"),
        "ph": last_row.get("ph"),
        "salinity": last_row.get("salinity"),
        "updated_at": last_row.get("updated_at"),
    }
    return _extract_common_fields(payload, source="csv")


def parse_webhook_payload(payload: dict[str, Any]) -> ApexStatus:
    """Normaliza payload recebido por webhook/IFTTT."""
    return _extract_common_fields(payload, source="webhook")
