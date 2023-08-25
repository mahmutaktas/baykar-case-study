from rest_framework import generics

from baykarcasestudy.apps.renting.models import RentedIHA
from baykarcasestudy.apps.renting.rest.serializers.create import RentedIHACreateSerializer


class RentedIHACreate(generics.CreateAPIView):
    queryset = RentedIHA.objects.all(),
    serializer_class = RentedIHACreateSerializer
