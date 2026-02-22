"""Ponto de entrada da aplicação web."""

from __future__ import annotations

import argparse

from src.apexapp.web import run_server


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Inicia o dashboard web do Neptune Apex")
    parser.add_argument("--port", type=int, default=8000, help="Porta HTTP (padrão: 8000)")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    run_server(port=args.port)
