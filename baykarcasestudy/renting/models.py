from django.db import models

from baykarcasestudy.base.models import TimestampMixin
from baykarcasestudy.iha.choices import IHACategory, WeightUnit


class RentedIHA(TimestampMixin):
    brand = models.CharField("Brand", max_length=240)
    model = models.CharField("Model", max_length=240)
    weight = models.FloatField("Weight", null=True, blank=True)
    weight_unit = models.PositiveSmallIntegerField(choices=WeightUnit.choices, null=True, blank=True)
    category = models.PositiveSmallIntegerField(choices=IHACategory.choices, null=True, blank=True)
