from django.contrib.auth.models import UserManager
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser


class User(AbstractBaseUser):
    first_name = models.CharField("First Name", max_length=240)
    last_name = models.CharField("Last Name", max_length=240)
    email = models.EmailField("Email", unique=True, db_index=True, null=True, blank=True)
    created = models.DateField(auto_now_add=True)

    USERNAME_FIELD = "email"

    objects = UserManager()

    def get_full_name(self):
        full_name = f'{self.first_name} {self.last_name}'
        return full_name.strip()

    def __str__(self):
        return self.email
