import json


json_data = '{"name": "Mauricio", "country": "Ecuador"}'
dict_data = {"name": "Mauricio", "country": "Ecuador"}


def parse_json_into_dict(json_data):
    try:
        return json.loads(json_data)
    except json.JSONDecodeError as e:
        print(f"Error al decodificar JSON: {e}")
        return None
    except TypeError as e:
        print(f"Error de tipo: {e}")
        return None


def parse_dict_into_json(dict_data):
    try:
        return json.dumps(dict_data, indent=2)
    except TypeError as e:
        print(f"Error al convertir diccionario a JSON: {e}")


print(parse_json_into_dict(json_data))
print(parse_json_into_dict("este no es un json valido"))
print(parse_json_into_dict(dict_data))

print(parse_dict_into_json(dict_data))
print(parse_dict_into_json(json_data))
print(parse_dict_into_json(json))
