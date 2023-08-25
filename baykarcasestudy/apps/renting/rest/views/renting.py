from rest_framework import generics, viewsets, status
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
            .filter(renter_user=self.request.user.id)
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

    def update(self, request, *args, **kwargs):
        rented_iha = self.get_object()

        data = request.data
        data["renter_user"] = request.user.id

        serializer = RentedIHACreateSerializer(rented_iha, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = RentedIHA.objects.get(pk=self.kwargs.get('pk'), renter_user=request.user.id)
        except RentedIHA.DoesNotExist:
            return Response({"detail": "Rented IHA not found."}, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response({"detail": "Rented IHA successfully deleted."})
