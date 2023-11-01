from django.db import models


# Create your models here.
class Table(models.Model):
    number = models.IntegerField(unique=True)

    def __str__(self) -> str:
        return str(self.number)
