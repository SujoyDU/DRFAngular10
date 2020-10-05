from django.db import models

# Create your models here.



class Content(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    published = models.BooleanField(default=False)

class Teacher(models.Model):
    name = models.CharField(max_length=200,blank=False, default='')
    address = models.CharField(max_length=200,blank=False, default='')