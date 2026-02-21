"""Atalho para executar a aplicação sem usar -m."""

from src.novo_projeto.main import parse_args
from src.novo_projeto.web import run_server


if __name__ == "__main__":
    args = parse_args()
    run_server(port=args.port)
