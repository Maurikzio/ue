from django.db import models
from my_users.models import User


class Preference(models.Model):
    CATEGORIES = [
        ("GENRE", "Genre"),
        ("ARTIST", "Artist"),
        ("TRACK", "Track")
    ]
    preference_type = models.CharField(max_length=10, choices=CATEGORIES)
    preference_value = models.CharField(max_length=100)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='preferences')

    def __str__(self):
        return self.preference_type
