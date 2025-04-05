import requests


class StockService:
    BASE_URL = "https://www.alphavantage.co/query/"

    @classmethod
    def get_symbol_price(self, symbol_name):
        url = f"{self.BASE_URL}"
        params = {
            "function": "GLOBAL_QUOTE",
            "symbol": symbol_name,
            "apikey": ""
        }
        response = requests.get(url, params=params)
        return response.json() if response.status_code == 200 else None

    @classmethod
    def format_symbol_data(self, symbol_data):
        return {
            "name": symbol_data["Global Quote"]["01. symbol"],
            "price": symbol_data["Global Quote"]["05. price"],
        }
