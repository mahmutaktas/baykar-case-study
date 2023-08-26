from rest_framework import serializers

from baykarcasestudy.apps.renting.models import RentedIHA


class RentedIHACreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentedIHA
        exclude = ['id']

    def validate(self, attrs):
        """
        Intercept default validate method to customize it
        """

        validated_data = super().validate(attrs)

        start_date = attrs.get('renting_start_date')
        end_date = attrs.get('renting_end_date')
        renter_user = attrs.get('renter_user').id
        iha_id = attrs.get('iha').id

        # Check if renting start date is less than renting end date
        if start_date and end_date and start_date >= end_date:
            raise serializers.ValidationError("Start date must be less than end date")

        # Check if the current user already rented this iha for the same start and end dates
        rented_iha = RentedIHA.objects.filter(renter_user=renter_user, iha_id=iha_id, renting_start_date=start_date,
                                              renting_end_date=end_date).first()

        if rented_iha:
            raise serializers.ValidationError("You can't rent the same iha for the same dates")

        return validated_data
