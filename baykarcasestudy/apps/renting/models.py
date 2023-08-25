from django.db import models

from baykarcasestudy.base.models import TimestampMixin


class RentedIHA(TimestampMixin):
    iha = models.ForeignKey('iha.IHA', on_delete=models.DO_NOTHING, null=False)
    renter_user = models.ForeignKey('user.User', on_delete=models.DO_NOTHING, null=False)
    renting_start_date = models.DateTimeField(null=False)
    renting_end_date = models.DateTimeField(null=False)
