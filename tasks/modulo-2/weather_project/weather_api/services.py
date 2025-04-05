import requests
import os
from dotenv import load_dotenv
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings

load_dotenv()


class WeatherService:
    # obtener la clave de la API
    OPENWEATHER_API_KEY = os.getenv("API_KEY")

    # verificar si la clave de la API existe
    if not OPENWEATHER_API_KEY:
        raise EnvironmentError(
            "OpenWeather API key not found. Make sure API_KEY is set in the .env file.")

    @classmethod
    def get_weather(self, city):
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={self.OPENWEATHER_API_KEY}"
        response = requests.get(url)
        return response.json() if response.status_code == 200 else None

    @classmethod
    def format_weather_data(self, weather_data):
        return {
            "city": weather_data["name"],
            "temperature": weather_data["main"]["temp"],
            "condition": weather_data["weather"][0]["description"],
            "created_at": timezone.now()
        }

    @classmethod
    def send_weather_email(cls, recipient_email, weather_data):
        subject = f"Weather Update for {weather_data['city']}"

        # Convertir temperatura de Kelvin a Celsius
        temp_celsius = round(weather_data['temperature'] - 273.15, 2)

        message = f"""
        Reporte del Clima:

        Ciudad: {weather_data['city']}
        Temperatura: {temp_celsius}°C
        Condicion climatica: {weather_data['condition']}
        Fecha y hora: {weather_data['created_at']}

        Este es un mensaje automatizado del servicio de API del Clima :).
        """

        from_email = settings.EMAIL_HOST_USER
        recipient_list = [recipient_email]

        try:
            send_mail(
                subject,
                message,
                from_email,
                recipient_list,
                fail_silently=False,
            )
            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
