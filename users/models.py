from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
# from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    # email = models.EmailField(_('email address'), max_length=255, unique=True)
    avatar = models.ImageField(blank=True, null=True, default='defaultAvatar.png', upload_to='profile_images')
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.first_name +' '+ self.last_name
# Create your models here.
