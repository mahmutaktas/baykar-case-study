from rest_framework import generics, viewsets
from rest_framework.response import Response

from baykarcasestudy.apps.renting.models import RentedIHA
from baykarcasestudy.apps.renting.rest.serializers.create import RentedIHACreateSerializer
from baykarcasestudy.apps.renting.rest.serializers.renting import RentedIHASerializer


class RentedIHAView(viewsets.ModelViewSet):
    serializer_class = RentedIHASerializer

    def get_queryset(self):
        qs = (
            RentedIHA
            .objects
            .all()
        )
        return qs

    def create(self, request, *args, **kwargs):
        data = request.data
        data["renter_user"] = request.user.id
        serializer = RentedIHACreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
