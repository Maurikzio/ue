import requests


class PokemonService:
    BASE_URL = 'https://pokeapi.co/api/v2'

    @classmethod
    def get_pokemon_list(self, limit=20, offset=0):
        """obtener una lista de pokemon con paginacion"""
        url = f"{self.BASE_URL}/pokemon?limit={limit}&offset={offset}"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else None

    @classmethod
    def get_pokemon_detail(self, pokemon_id_or_name):
        """Obtener los detalles de un pokemon especifico por ID o nombre"""
        url = f"{self.BASE_URL}/pokemon/{pokemon_id_or_name}"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else None

    @classmethod
    def format_pokemon_data(self, pokemon_data):
        """Formatea los datos del pokemos para nuestro modelo"""
        types = [t['type']['name'] for t in pokemon_data.get('types', [])]

        return {
            "pokemon_id": pokemon_data['id'],
            "name": pokemon_data['name'],
            "height": pokemon_data['height'],
            "weight": pokemon_data['weight'],
            "types": types,
            "sprite_url": pokemon_data['sprites']['front_default']
        }
