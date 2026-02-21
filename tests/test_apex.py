import tempfile
import unittest
from pathlib import Path

from src.novo_projeto.apex import load_status_from_csv, parse_webhook_payload


class TestApexIntegrations(unittest.TestCase):
    def test_load_status_from_csv(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            file_path = Path(tmp) / "apex.csv"
            file_path.write_text(
                "updated_at,temperature,ph,salinity\n"
                "2026-01-01T10:00:00Z,25.1,8.1,34.9\n"
                "2026-01-01T11:00:00Z,25.3,8.0,35.0\n",
                encoding="utf-8",
            )
            result = load_status_from_csv(file_path)

        self.assertEqual(result.source, "csv")
        self.assertEqual(result.temperature, 25.3)
        self.assertEqual(result.ph, 8.0)
        self.assertEqual(result.salinity, 35.0)

    def test_parse_webhook_payload(self) -> None:
        payload = {
            "updated_at": "2026-01-01T12:00:00Z",
            "sensors": {"temperature": 25.5, "ph": 8.15, "salinity": 35.1},
        }
        result = parse_webhook_payload(payload)

        self.assertEqual(result.source, "webhook")
        self.assertEqual(result.temperature, 25.5)
        self.assertEqual(result.ph, 8.15)
        self.assertEqual(result.salinity, 35.1)


if __name__ == "__main__":
    unittest.main()
