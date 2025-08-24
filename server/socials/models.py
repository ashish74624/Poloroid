from django.db import models
from users.models import User


class Social(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="socials")
    instagram = models.URLField(blank=True, default='')
    linkedin = models.URLField(blank=True, default='')
    github = models.URLField(blank=True, default='')

    def __str__(self):
        return f"Socials of {self.user.email}"