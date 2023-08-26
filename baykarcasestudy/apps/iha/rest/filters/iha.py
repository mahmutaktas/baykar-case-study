from django_filters import rest_framework as filters

from baykarcasestudy.apps.iha.models import IHA


class IHAFilter(filters.FilterSet):
    class Meta:
        model = IHA
        fields = {
            'brand': ['exact', 'iexact', 'contains', 'icontains'],
            'model': ['exact', 'iexact', 'contains', 'icontains'],
            'category': ['exact'],
            'weight_unit': ['exact'],
        }
