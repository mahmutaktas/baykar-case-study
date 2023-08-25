from rest_framework import serializers

from baykarcasestudy.apps.iha.rest.serializers.iha import IHASerializer
from baykarcasestudy.apps.renting.models import RentedIHA
from baykarcasestudy.apps.user.rest.serializers.user import UserSerializer


class RentedIHASerializer(serializers.ModelSerializer):
    iha = IHASerializer()
    user = UserSerializer()

    class Meta:
        model = RentedIHA
