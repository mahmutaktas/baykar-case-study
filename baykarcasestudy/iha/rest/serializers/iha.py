from rest_framework import serializers

from baykarcasestudy.iha.models import IHA


class IHASerializer(serializers.ModelSerializer):
    weight_unit = serializers.CharField(source='get_weight_unit_display')
    category = serializers.CharField(source='get_category_display')

    class Meta:
        model = IHA
        fields = ['pk', 'brand', 'model', 'weight', 'weight_unit', 'category']
