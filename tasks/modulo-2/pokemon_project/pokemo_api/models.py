from django.db import models

# Create your models here.


class Pokemon(models.Model):
    pokemon_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=50)
    height = models.IntegerField()
    weight = models.IntegerField()
    types = models.JSONField(default=list)
    sprite_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name
