from django.db import models


class Symbol(models.Model):
    name = models.CharField(max_length=20)
    price = models.CharField(max_length=20)

    def __str__(self):
        return self.name
