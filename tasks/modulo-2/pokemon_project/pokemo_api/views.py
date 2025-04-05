from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pokemon
from .serializers import PokemonSerializer
from .services import PokemonService


@api_view(['GET'])
def pokemon_list(request):
    """Obtener la lista de pokemons de nuestra base de datos"""
    pokemons = Pokemon.objects.all()
    serializer = PokemonSerializer(pokemons, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def pokemon_detail(request, pk):
    """Obtener un pokemon especifico de nuestra base de datos"""
    try:
        pokemon = Pokemon.objects.get(pk=pk)
    except Pokemon.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PokemonSerializer(pokemon)
    return Response(serializer.data)


@api_view(['GET'])
def external_pokemon_list(request):
    """Obtener la lista de pokemon desde la API esterna"""
    limit = int(request.query_params.get('limit', 20))
    offset = int(request.query_params.get('offset', 0))

    pokemon_list = PokemonService.get_pokemon_list(limit=limit, offset=offset)
    return Response(pokemon_list)


@api_view(['GET'])
def external_pokemos_detail(request, pokemon_id):
    """Obtener los detalles de un pokemon desde la API externa"""
    pokemon_data = PokemonService.get_pokemon_detail(pokemon_id)
    if not pokemon_data:
        return Response({"error": "Pokemon no entontrado"}, status=status.HTTP_404_NOT_FOUND)
    return Response(pokemon_data)


@api_view(['POST'])
def import_pokemon(request, pokemon_id):
    """Importar un pokemon desde la API externa a nuestra base de datos"""
    pokemon_data = PokemonService.get_pokemon_detail(pokemon_id)
    if not pokemon_data:
        return Response({"error": "Pokemon no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    formatted_data = PokemonService.format_pokemon_data(pokemon_data)
    pokemon, created = Pokemon.objects.update_or_create(
        pokemon_id=formatted_data['pokemon_id'],
        defaults=formatted_data
    )
    serializer = PokemonSerializer(pokemon)
    status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
    return Response(serializer.data, status=status_code)
