from rest_framework import generics, viewsets
from django_filters import rest_framework as filters
from rest_framework.filters import OrderingFilter
from baykarcasestudy.apps.iha.rest.filters.iha import IHAFilter
from baykarcasestudy.apps.iha.rest.serializers.iha import IHASerializer
from baykarcasestudy.apps.iha.models import IHA


class IHAView(viewsets.ModelViewSet):
    serializer_class = IHASerializer
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = IHAFilter

    def get_queryset(self):
        """
        Get IHA List
        """
        qs = (
            IHA
            .objects
            .all()
        )
        return qs
