from rest_framework import serializers
from .models import Preference
from api_integration.services import SpotifyService


class PreferenceSerializer(serializers.ModelSerializer):
    spotify_data = serializers.SerializerMethodField()

    class Meta:
        model = Preference
        fields = ['id', 'preference_type', 'preference_value', 'spotify_data']

    def get_spotify_data(self, obj):
        spotify_service = SpotifyService()
        if obj.preference_type == 'ARTIST':
            return spotify_service.get_artist_info(obj.preference_value)
        elif obj.preference_type == 'GENRE':
            return spotify_service.get_genre_info(obj.preference_value)
        elif obj.preference_type == 'TRACK':
            return spotify_service.get_track_info(obj.preference_value)
        return None
