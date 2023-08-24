from rest_framework import generics

from baykarcasestudy.iha.rest.serializers.iha import IHASerializer
from baykarcasestudy.iha.models import IHA


class IHACreate(generics.CreateAPIView):
    queryset = IHA.objects.all(),
    serializer_class = IHASerializer


class IHAList(generics.ListAPIView):
    queryset = IHA.objects.all()
    serializer_class = IHASerializer


class IHADetail(generics.RetrieveAPIView):
    queryset = IHA.objects.all()
    serializer_class = IHASerializer


class IHAUpdate(generics.RetrieveUpdateAPIView):
    queryset = IHA.objects.all()
    serializer_class = IHASerializer


class IHADelete(generics.RetrieveDestroyAPIView):
    queryset = IHA.objects.all()
    serializer_class = IHASerializer
