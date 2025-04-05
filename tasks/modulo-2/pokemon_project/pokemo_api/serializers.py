from rest_framework import serializers
from .models import Pokemon


class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ['id', 'pokemon_id', 'name',
                  'height', 'weight', 'types', 'sprite_url']
