from rest_framework import serializers

from baykarcasestudy.apps.iha.models import IHA


class IHASerializer(serializers.ModelSerializer):
    weight_unit_str = serializers.CharField(source='get_weight_unit_display', read_only=True)
    category_str = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = IHA
        fields = ['pk', 'brand', 'model', 'weight', 'weight_unit', 'weight_unit_str', 'category', 'category_str']
