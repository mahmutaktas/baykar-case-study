from rest_framework import generics, viewsets
from rest_framework.response import Response

from baykarcasestudy.apps.iha.rest.serializers.iha import IHASerializer
from baykarcasestudy.apps.iha.models import IHA


class IHAView(viewsets.ModelViewSet):
    serializer_class = IHASerializer

    def get_queryset(self):
        qs = (
            IHA
            .objects
            .all()
        )
        return qs
