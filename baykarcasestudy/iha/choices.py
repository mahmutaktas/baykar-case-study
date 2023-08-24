from django.db import models
from django.utils.translation import gettext_lazy as _


class IHACategory(models.IntegerChoices):
    IHA0 = 0, _('IHA0')
    IHA1 = 1, _('IHA1')
    IHA2 = 2, _('IHA2')
    IHA3 = 3, _('IHA3')


class WeightUnit(models.IntegerChoices):
    KG = 1, _('KG')
    T = 2, _('TON')
