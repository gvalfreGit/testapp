"""Atalho para executar a aplicação sem usar -m."""

from src.apexapp.main import parse_args
from src.apexapp.web import run_server


if __name__ == "__main__":
    args = parse_args()
    run_server(port=args.port)
