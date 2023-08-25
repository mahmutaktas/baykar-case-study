from rest_framework import generics

from baykarcasestudy.apps.renting.models import RentedIHA
from baykarcasestudy.apps.renting.rest.serializers.create import RentedIHACreateSerializer
from baykarcasestudy.apps.renting.rest.serializers.renting import RentedIHASerializer


class RentedIHACreate(generics.CreateAPIView):
    queryset = RentedIHA.objects.all(),
    serializer_class = RentedIHACreateSerializer


class RentedIHAList(generics.ListAPIView):
    queryset = RentedIHA.objects.all()
    serializer_class = RentedIHASerializer


class RentedIHAUpdate(generics.RetrieveUpdateAPIView):
    queryset = RentedIHA.objects.all()
    serializer_class = RentedIHASerializer


class RentedIHADelete(generics.RetrieveDestroyAPIView):
    queryset = RentedIHA.objects.all()
    serializer_class = RentedIHASerializer
