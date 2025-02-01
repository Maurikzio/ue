import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta


class SpotifyService:
    def __init__(self):
        self.client_id = settings.SPOTIFY_CLIENT_ID
        self.client_secret = settings.SPOTIFY_CLIENT_SECRET
        self.token = None
        self.token_expire = None

    def get_token(self):
        if self.token and self.token_expire > datetime.now():
            return self.token

        url = "https://accounts.spotify.com/api/token"
        headers = {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
        data = {
            "grant_type": "client_credentials"
        }
        auth = (self.client_id, self.client_secret)
        response = requests.post(url, headers=headers, data=data, auth=auth)
        if response.status_code == 200:
            data = response.json()
            self.token = data["access_token"]
            self.token_expire = datetime.now(
            ) + timedelta(seconds=data['expires_in'])
            return self.token

        raise Exception("Failed to get Spotify token :/")

    def get_artist_info(self, artist_name):
        try:
            token = self.get_token()
            url = "https://api.spotify.com/v1/search"
            headers = {
                "Authorization": f"Bearer {token}"
            }
            params = {
                "q": artist_name,
                "type": "artist",
                "limit": 1,
            }

            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()

            if response.status_code == 200:
                data = response.json()
                items = data.get("artists", {}).get("items", [])

                if not items:
                    return Response({"error": "Artist not found!"}, status=status.HTTP_404_NOT_FOUND)
                artist_data = items[0]

                return {
                    "label": "Artist Information",
                    "name": artist_data.get("name"),
                    "popularity": artist_data.get("popularity"),
                    "followers": artist_data["followers"]["total"],
                    "genres": artist_data.get("genres")
                }

            return None
        except requests.RequestException as e:
            print(f"Error getting artist info: {str(e)}")
            return None

    def get_genre_info(self, genre):
        try:
            token = self.get_token()
            url = "https://api.spotify.com/v1/search"
            headers = {
                "Authorization": f"Bearer {token}"
            }
            params = {
                "q": f"genre:{genre}",
                "type": "track",
                "limit": 5,
            }

            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()

            if response.status_code == 200:
                data = response.json()
                items = data.get("tracks", {}).get("items", [])

                if not items:
                    return Response({"error": "Genre not found!"}, status=status.HTTP_404_NOT_FOUND)

                top_songs = [
                    {
                        "name": song["name"],
                        "popularity": song["popularity"],
                        "artists": [artist["name"] for artist in song["artists"]]
                    }
                    for song in items
                ]
                return {"label": "Top 5 Genre Songs", "songs": top_songs}

            return None

        except requests.RequestException as e:
            print(f"Error getting genre info: {str(e)}")
            return None

    def get_track_info(self, track_name):
        try:
            token = self.get_token()
            url = "https://api.spotify.com/v1/search"
            headers = {
                "Authorization": f"Bearer {token}"
            }
            params = {
                "q": track_name,
                "type": "track",
                "limit": 1,
            }
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()

            if response.status_code == 200:
                data = response.json()
                items = data.get("tracks", {}).get("items", [])
                if not items:
                    return Response({"error": "Track not found!"}, status=status.HTTP_404_NOT_FOUND)

                track_data = items[0]
                return {
                    "label": "Information of the Track",
                    "name": track_data["name"],
                    "popularity": track_data["popularity"],
                    "artists": [artist["name"] for artist in track_data["artists"]],
                    "album": track_data["album"]["name"]
                }
            return None
        except requests.RequestException as e:
            print(f"Error getting track info: {str(e)}")
            return None
