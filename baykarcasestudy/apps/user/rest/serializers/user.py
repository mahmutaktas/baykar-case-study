from rest_framework import serializers

from baykarcasestudy.apps.user.models import User


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = User
        exclude = ['id', 'password']
