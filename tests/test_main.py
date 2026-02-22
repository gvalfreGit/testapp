"""Testes básicos de configuração da aplicação."""

import json
import threading
import unittest
import urllib.error
import urllib.request
from http.server import ThreadingHTTPServer

from src.apexapp.web import ApexWebHandler, HTML_PAGE


class TestMain(unittest.TestCase):
    def test_dashboard_page_contains_title(self) -> None:
        self.assertIn("Dashboard Neptune Apex", HTML_PAGE)

    def test_root_aliases_do_not_return_not_found(self) -> None:
        server = ThreadingHTTPServer(("127.0.0.1", 0), ApexWebHandler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()

        try:
            base_url = f"http://127.0.0.1:{server.server_port}"
            with urllib.request.urlopen(f"{base_url}/", timeout=2) as response:
                self.assertEqual(response.status, 200)

            with urllib.request.urlopen(f"{base_url}/index.html", timeout=2) as response:
                self.assertEqual(response.status, 200)

            with self.assertRaises(urllib.error.HTTPError) as context:
                urllib.request.urlopen(f"{base_url}/api/status/", timeout=2)

            self.assertEqual(context.exception.code, 400)
            payload = json.loads(context.exception.read().decode("utf-8"))
            self.assertFalse(payload["ok"])
            self.assertNotEqual(payload["error"], "Rota não encontrada")
        finally:
            server.shutdown()
            server.server_close()
            thread.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
