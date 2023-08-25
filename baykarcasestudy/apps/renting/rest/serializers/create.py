from rest_framework import serializers

from baykarcasestudy.apps.renting.models import RentedIHA


class RentedIHACreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentedIHA
