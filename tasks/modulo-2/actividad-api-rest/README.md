# Music Preferences API

Una API RESTful desarrollada con FastAPI que permite gestionar preferencias musicales de usuarios e integra con la API de Spotify para obtener información detallada sobre artistas, canciones y géneros.

## Características

- CRUD completo de usuarios
- Gestión de preferencias musicales (artistas, canciones, géneros)
- Integración con la API de Spotify
- Base de datos SQLite
- Documentación automática

## Requisitos Previos

- Python 3.7+
- pip (gestor de paquetes de Python)
- Cuenta de Spotify Developer y credenciales de API

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Maurikzio/ue.git
cd tasks/modulo-2/actividad-api-rest/
```

2. Crea un entorno virtual y actívalo:
```bash
conda create -n <some-name>
conda activate <some-name>
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Configura tus credenciales de Spotify:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade tus credenciales:
```
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
```

## Uso

1. Inicia el servidor:
```bash
uvicorn app:app --reload
```

2. Accede a la documentación de la API:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Endpoints Principales

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/{user_id}` - Obtener usuario específico
- `PUT /api/users/{user_id}` - Actualizar usuario
- `DELETE /api/users/{user_id}` - Eliminar usuario

### Preferencias
- `POST /api/users/{user_id}/preferences` - Crear preferencia musical
- `GET /api/users/{user_id}/preferences` - Obtener preferencias con datos de Spotify
- `DELETE /api/users/{user_id}/preferences/{preference_id}` - Eliminar preferencia

## Estructura de la Base de Datos

### Tabla `user`
- `id`: INTEGER PRIMARY KEY
- `name`: TEXT NOT NULL
- `email`: TEXT NOT NULL UNIQUE

### Tabla `preference`
- `id`: INTEGER PRIMARY KEY
- `user_id`: INTEGER NOT NULL (FOREIGN KEY)
- `preference_type`: TEXT NOT NULL
- `preference_value`: TEXT NOT NULL
