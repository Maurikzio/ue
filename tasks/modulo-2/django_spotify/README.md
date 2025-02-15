# Music Preferences API

## Descripción
API desarrollada con Django REST Framework que permite a los usuarios guardar sus preferencias musicales e integra información en tiempo real de Spotify.

## Características
* Gestión de usuarios
* Registro de preferencias musicales (artistas, canciones, géneros)
* Integración con la API de Spotify
* Datos enriquecidos en tiempo real

## Tecnologías
* Python
* Django
* Django REST Framework
* Spotify Web API

## Instalación

Clona el repositorio
```bash
git clone https://github.com/Maurikzio/ue.git
```
Seleccionar la rama del modulo
```bash
modulo-2
```
Dirigirse al directorio:
```bash
cd tasks/modulo-2/django_advanced
```

Configura las variables de entorno en un archivo `.env`:
```plaintext
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
```

Ejecuta las migraciones
```bash
python manage.py migrate
```

Inicia el servidor
```bash
python manage.py runserver
```

## Endpoints

### Usuarios
```bash
# Crear usuario
POST /users/
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

### Preferencias
```bash
# Agregar preferencia
POST /user/<int:user_id>/preferences/
{
    "preference_type": "ARTIST",
    "preference_value": "Metallica"
}

# Obtener preferencias con datos de Spotify
GET /user/<int:user_id>/preferences/

[
  {
    "id": 1,
    "preference_type": "ARTIST",
    "preference_value": "David Guetta",
    "spotify_data": {
      "label": "Artist Information",
      "name": "David Guetta",
      "popularity": 87,
      "followers": 26816165,
      "genres": [
          "edm",
          "dance"
      ]
    }
  },
  {
    "id": 2,
    "preference_type": "GENRE",
    "preference_value": "Pop",
    "spotify_data": {
      "label": "Top 5 Genre Songs",
      "songs": [
        {
          "name": "LUNA",
          "popularity": 86,
          "artists": [
            "Feid",
            "ATL Jacob"
          ]
        },
        {
          "name": "Die With A Smile",
          "popularity": 99,
          "artists": [
            "Lady Gaga",
            "Bruno Mars"
          ]
        },
        {
          "name": "SORRY 4 THAT MUCH",
          "popularity": 79,
          "artists": [
            "Feid"
          ]
        },
        {
          "name": "Feliz Cumpleaños Ferxxo",
          "popularity": 80,
          "artists": [
            "Feid"
          ]
        },
        {
          "name": "Orion",
          "popularity": 78,
          "artists": [
            "Boza",
            "ELENA ROSE"
          ]
        }
      ]
    }
  },
  {
    "id": 3,
    "preference_type": "ARTIST",
    "preference_value": "Bon Jovi",
    "spotify_data": {
      "label": "Artist Information",
      "name": "Bon Jovi",
      "popularity": 78,
      "followers": 14650883,
      "genres": [
        "glam metal"
      ]
    }
  },
  {
    "id": 4,
    "preference_type": "TRACK",
    "preference_value": "Y tu te vas",
    "spotify_data": {
      "label": "Information of the Track",
      "name": "Y Tú Te Vas",
      "popularity": 69,
      "artists": [
        "Chayanne"
      ],
      "album": "Chayanne"
    }
  },
  {
    "id": 5,
    "preference_type": "ARTIST",
    "preference_value": "Led Zeppelin",
    "spotify_data": {
      "label": "Artist Information",
      "name": "Led Zeppelin",
      "popularity": 76,
      "followers": 15174680,
      "genres": [
        "classic rock",
        "rock",
        "hard rock",
        "rock and roll"
      ]
    }
  }
]

```