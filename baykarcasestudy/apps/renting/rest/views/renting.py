from django_filters import rest_framework as filters
from rest_framework import generics, viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response

from baykarcasestudy.apps.renting.models import RentedIHA
from baykarcasestudy.apps.renting.rest.filters.renting import RentedIHAFilter
from baykarcasestudy.apps.renting.rest.serializers.create import RentedIHACreateSerializer
from baykarcasestudy.apps.renting.rest.serializers.renting import RentedIHASerializer


class RentedIHAView(viewsets.ModelViewSet):
    serializer_class = RentedIHASerializer
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = RentedIHAFilter

    def get_queryset(self):
        """
        Get Rented IHA List
        """
        qs = (
            RentedIHA
            .objects
            .filter(renter_user=self.request.user.id)
            .all()
        )
        return qs

    def create(self, request, *args, **kwargs):
        """
        Intercept default create method to customize it
        """
        data = request.data
        data["renter_user"] = request.user.id  # Add current user id to the rented iha
        serializer = RentedIHACreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """
        Intercept default update method to customize it
        """
        rented_iha = self.get_object()

        data = request.data
        data["renter_user"] = request.user.id  # Add current user id to the rented iha

        serializer = RentedIHACreateSerializer(rented_iha, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """
        Intercept default delete method to customize it
        """

        # Check if rented iha exists
        try:
            instance = RentedIHA.objects.get(pk=self.kwargs.get('pk'), renter_user=request.user.id)
        except RentedIHA.DoesNotExist:
            return Response({"detail": "Rented IHA not found."}, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response({"detail": "Rented IHA successfully deleted."})
