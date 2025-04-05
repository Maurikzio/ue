from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import WeatherService
from .serializers import WeatherSerializer
from .models import Weather


#  El endpoint **GET** debe recibir como parámetro el nombre de una ciudad y devolver el siguiente paquete en formato JSON:
@api_view(['GET'])
def get_weather(request, city):
    weather_data = WeatherService.get_weather(city)
    if not weather_data:
        return Response({"error": "City not found"}, status=status.HTTP_404_NOT_FOUND)
    weather_data = WeatherService.format_weather_data(weather_data)
    return Response(weather_data)


# Este POST es independiente del GET y de la API externa; los datos deben ingresarse manualmente en el body.
@api_view(['POST'])
def create_weather(request):
    serializer = WeatherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# endpoint para obtener todas las ciudades y sus datos de clima desde la base de datos
@api_view(['GET'])
def get_all_weather(request):
    weather = Weather.objects.all()
    serializer = WeatherSerializer(weather, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def send_weather_email(request):
    # Validate required email field
    if 'email' not in request.data:
        return Response(
            {"error": "The 'email' field is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    recipient_email = request.data['email']

    # Get the most recent weather record from the database
    try:
        latest_weather = Weather.objects.latest('created_at')
    except Weather.DoesNotExist:
        return Response(
            {"error": "No weather data found in the database"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Format the weather data
    weather_data = {
        "city": latest_weather.city,
        "temperature": latest_weather.temperature,
        "condition": latest_weather.condition,
        "created_at": latest_weather.created_at
    }

    # Send email
    email_sent = WeatherService.send_weather_email(
        recipient_email, weather_data)

    if email_sent:
        return Response(
            {
                "message": f"Weather information for {latest_weather.city} sent successfully to {recipient_email}",
                "weather_data": weather_data
            },
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Failed to send email"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
