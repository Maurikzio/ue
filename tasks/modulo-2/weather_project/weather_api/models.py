from django.db import models
from django.utils import timezone
# Create your models here.
# clear sky
# few clouds
# scattered clouds
# broken clouds
# shower rain
# rain
# thunderstorm
# mist
# smoke


class Weather(models.Model):
    city = models.CharField(max_length=100)
    temperature = models.FloatField()
    condition = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - {self.temperature}°C - {self.condition}"
