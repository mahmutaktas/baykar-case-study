from django.db import models
from django.utils.translation import gettext_lazy as _


class TimestampMixin(models.Model):
    """
        Timestamp mixin class for tables to have identical created_at and updated_at fields
    """
    created_at = models.DateTimeField(verbose_name=_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_('updated at'), auto_now=True)

    class Meta:
        abstract = True
