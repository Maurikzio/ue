# Proyecto de API del Clima

Una API de Django para obtener datos del clima de ciudades desde la API de OpenWeather, almacenar datos en nuestra base de datos y enviar emails con el último dato registrado.

## Características

- Obtener datos del clima desde la API de OpenWeather
- Almacenar datos del clima en una base de datos
- Enviar información del clima por correo electrónico
- Endpoints API RESTful

## Configuración

### Requisitos previos

- Python 3.8+
- Django 5.1+
- Django REST Framework
- python-dotenv

### Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
pip install -r requirements.txt
```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Clave API de OpenWeather
API_KEY=tu_clave_api_de_openweather_aquí

# Configuración de Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=tu_correo@gmail.com
EMAIL_HOST_PASSWORD=tu_contraseña_de_aplicación
```

4. Ejecutar migraciones:

```bash
python manage.py migrate
```

5. Iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

## Endpoints de la API

- `GET /weather/<ciudad>/` - Obtener información del clima para una ciudad específica
- `POST /weather/` - Crear manualmente un registro de clima
- `GET /all/weather/` - Obtener todos los registros de clima de la base de datos
- `POST /latest/weather/email/` - Enviar por correo electrónico la información del clima más reciente

## Variables de Entorno

Este proyecto utiliza python-dotenv para gestionar variables de entorno:

- `API_KEY`: Tu clave API de OpenWeather (requerida)
- `EMAIL_BACKEND`: El backend de correo electrónico a utilizar (por defecto: backend SMTP de Django)
- `EMAIL_HOST`: El servidor SMTP a utilizar (por defecto: smtp.gmail.com)
- `EMAIL_PORT`: El puerto SMTP a utilizar (por defecto: 587)
- `EMAIL_USE_TLS`: Si se debe utilizar TLS para SMTP (por defecto: True)
- `EMAIL_HOST_USER`: Tu dirección de correo electrónico para enviar correos
- `EMAIL_HOST_PASSWORD`: Tu contraseña de correo o contraseña de aplicación

## Configuración de Email

El proyecto está configurado para enviar correos electrónicos a través del servidor SMTP de Gmail. Necesitarás:

1. Tener una cuenta de Gmail
2. Generar una contraseña de aplicación (si utilizas autenticación de dos factores)
3. Añadir tus credenciales de correo electrónico al archivo `.env`