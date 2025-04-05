from django.urls import path
from .views import get_weather, create_weather, get_all_weather, send_weather_email

urlpatterns = [
    path('weather/<str:city>/', get_weather, name='get_weather'),
    path('weather/', create_weather, name='create_weather'),
    # weather/all/ seria tomado en cuenta por weather/<str:city>/ por tal motivo usamos all/weather/ lol
    path('all/weather/', get_all_weather, name='get_all_weather'),
    path('latest/weather/email/', send_weather_email, name='send_weather_email'),
]
