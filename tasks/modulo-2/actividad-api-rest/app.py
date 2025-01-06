from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import sqlite3
from enum import Enum
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = FastAPI(
    title="Music Preferences API",
    description="""
    API para gestionar preferencias musicales de usuarios e integración con Spotify.

    ## Características
    * Gestión de usuarios
    * Gestión de preferencias musicales
    * Integración con Spotify
    """,
    version="1.0.0",
    contact={
        "name": "Mauricio Morocho",
        "email": "m.morocho1196@gmail.com",
    },
)

DB = "development.db"
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")


def init_db():
    with sqlite3.connect(DB) as conn:
        # to have the cascade delete working :)
        conn.execute("PRAGMA foreign_keys = ON")

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS user
            (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)
            """
        )

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS preference
            (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                preference_type TEXT NOT NULL,
                preference_value TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
            )
            """
        )


init_db()


def get_db():
    try:
        conn = sqlite3.connect(DB)
        # to have the cascade delete working :)
        conn.execute("PRAGMA foreign_keys = ON")
        return conn
    except sqlite3.Error as e:
        raise HTTPException(
            status_code=500, detail="Database connection failed")


@app.get('/')
def root():
    return {"message": "Hello world!"}


class User(BaseModel):
    name: str
    email: EmailStr


class PreferenceType(str, Enum):
    GENRE = "genre"
    ARTIST = "artist"
    SONG = "song"


class Preference(BaseModel):
    preference_type: PreferenceType
    preference_value: str


# Create users
@app.post('/api/users', status_code=201)
def create_user(user: User):
    conn = get_db()
    try:
        cursor = conn.cursor()

        cursor.execute(
            "SELECT email FROM user WHERE email = ? ", (user.email,))
        if cursor.fetchone():
            raise HTTPException(
                status_code=409, detail="Email already registered")
        cursor.execute(
            "INSERT INTO user(name, email) VALUES (?, ?)",
            (user.name, user.email)
        )
        conn.commit()
        new_id = cursor.lastrowid  # funciona solo con INSERT
        return {"message": f"User {new_id} created"}

    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Email already registered")
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# Read user
@app.get("/api/users/{user_id}", status_code=201)
def read_user(user_id: int):
    conn = get_db()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        fields = [col[0] for col in cursor.description]
        return dict(zip(fields, user))
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# Update user
@app.put("/api/users/{user_id}", status_code=200)
def update_user(user_id: int, user: User):
    conn = get_db()
    try:
        cursor = conn.cursor()
        # Verify if user exists.
        cursor.execute("SELECT id FROM user WHERE id = ? ", (user_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User not found")

        cursor.execute(
            "SELECT id FROM user WHERE email = ? AND id != ?", (user.email, user_id))
        if cursor.fetchone():
            raise HTTPException(status_code=409, detail="Email already used")

        cursor.execute(
            "UPDATE user SET name=?, email=? WHERE id=?",
            (user.name, user.email, user_id)
        )
        conn.commit()
        return {"message": f"User {user_id} updated"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# Delete user
@app.delete('/api/users/{user_id}', status_code=204)
def delete_user(user_id: int):
    conn = get_db()
    try:
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM user WHERE id = ?", (user_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User not found")

        cursor.execute("DELETE FROM user WHERE id=?", (user_id,))
        conn.commit()
        return None
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# List all users
@app.get('/api/users', status_code=201)
def get_all_users(skip: int = 0, limit: int = 10):
    conn = get_db()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user LIMIT ? OFFSET ?", (limit, skip))
        users = [
            {"id": row[0], "name": row[1], "email": row[2]}
            for row in cursor.fetchall()
        ]
        return users
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# Create a user preference
@app.post('/api/users/{user_id}/preferences', status_code=201)
def create_preference(user_id: int, preference: Preference):
    conn = get_db()
    try:
        cursor = conn.cursor()
        # Verify if user exists.
        cursor.execute("SELECT id FROM user WHERE id = ? ", (user_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User not found")

        # Create the preference for user.
        cursor.execute(
            "INSERT INTO preference(user_id, preference_type, preference_value) VALUES (?, ?, ?)",
            (
                user_id,
                preference.preference_type.value,
                preference.preference_value
            )
        )
        conn.commit()
        new_id = cursor.lastrowid
        return {
            "message": f"Preference {new_id} created for user {user_id}",
            "preference": new_id
        }
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


def get_spotify_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Content-Type": 'application/x-www-form-urlencoded'
    }
    data = {
        "grant_type": "client_credentials"
    }
    auth = (CLIENT_ID, CLIENT_SECRET)
    response = requests.post(url, headers=headers, data=data, auth=auth)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code,
                            detail="Failed to obtain token")
    return response.json()


def get_artist_info(token: str, artist: str):
    url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "q": artist,
        "type": "artist",
        "limit": 1,
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        items = data.get("artists", {}).get("items", [])

        if not items:
            return {"error": "Artist not found"}

        artist_data = items[0]
        return {
            "label": "Artist Information",
            "name": artist_data.get("name"),
            "popularity": artist_data.get("popularity"),
            "followers": artist_data["followers"]["total"],
            "genres": artist_data.get("genres")
        }

    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Spotify API error: {str(e)}"
        )


def get_genre_info(token: str, genre: str):
    url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "q": f"genre:{genre}",
        "type": "track",
        "limit": 5,
    }
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        items = data.get("tracks", {}).get("items", [])

        if not items:
            return {"error": "Genre not found"}

        top_songs = [
            {
                "name": song["name"],
                "popularity": song["popularity"],
                "artists": [artist["name"] for artist in song["artists"]]
            }
            for song in items
        ]
        return {"label": "Top 5 Genre Songs", "songs": top_songs}
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Spotify API error: {str(e)}"
        )


def get_track_info(token: str, track: str):
    url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "q": track,
        "type": "track",
        "limit": 1,
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        items = data.get("tracks", {}).get("items", [])

        if not items:
            return {"error": "Track not found"}

        track_data = items[0]
        return {
            "label": "Information of the Track",
            "name": track_data["name"],
            "popularity": track_data["popularity"],
            "artists": [artist["name"] for artist in track_data["artists"]],
            "album": track_data["album"]["name"]
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Spotify API error: {str(e)}"
        )


# Read user preference
@app.get("/api/users/{user_id}/preferences", status_code=201)
async def read_preference_with_data_from_spotify(user_id: int):
    conn = get_db()
    try:
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM user WHERE id = ? ", (user_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User not found")

        cursor.execute("SELECT * FROM preference WHERE user_id=?", (user_id,))
        rows = cursor.fetchall()

        if not rows:
            return []

        prefs = [(row[0], row[2], row[3]) for row in rows]
        preferences = []
        token = get_spotify_token()
        for p_id, p_type, p_value in prefs:
            preference = {
                "id": p_id,
                "preference_type": p_type,
                "preference_value": p_value,
            }
            try:
                if p_type == PreferenceType.ARTIST.value:
                    preference["spotify_data"] = get_artist_info(
                        token["access_token"], p_value)
                elif p_type == PreferenceType.GENRE.value:
                    preference["spotify_data"] = get_genre_info(
                        token["access_token"], p_value)
                elif p_type == PreferenceType.SONG.value:
                    preference["spotify_data"] = get_track_info(
                        token["access_token"], p_value)
            except HTTPException as e:
                preference["spotify_data"] = {"error": str(e.detail)}

            preferences.append(preference)

        return preferences

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()


# Delete user preference
@app.delete("/api/users/{user_id}/preferences/{preference_id}", status_code=204)
def delete_user_preference(user_id: int, preference_id: int):
    conn = get_db()
    try:
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM user WHERE id = ? ", (user_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User not found")

        cursor.execute("SELECT id FROM preference WHERE id = ?",
                       (preference_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Preference not found")

        cursor.execute(
            "DELETE from preference WHERE id=? AND user_id=?", (preference_id, user_id))
        conn.commit()

        return None
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
