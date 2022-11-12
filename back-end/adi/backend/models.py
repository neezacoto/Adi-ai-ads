from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credits_remaining = models.IntegerField()

class Avertisement(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    original_image_path = models.CharField(max_length=200)
    final_image_path = models.CharField(max_length=200)
    
    # style = models.CharField(max_length=200)
    # image_description = models.CharField(max_length=500)
    
    # product_description = models.CharField(max_length=500)
    # target_audience = models.CharField(max_length=500)
    
    # slogan_text = models.CharField(max_length=500)